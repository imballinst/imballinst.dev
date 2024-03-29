import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

import { getAllFileSizes } from './file-size.mjs';

const PATH_TO_PUBLIC_ASSETS = path.join(process.cwd(), 'public/assets');

main();

const IMAGE_WIDTHS = [512, 1024, 2048];

async function main() {
  const files = await getAllFileSizes(PATH_TO_PUBLIC_ASSETS);
  const promises = [];

  for (const file of files) {
    const uncompressed = await fs.readFile(file.path);
    let buffers;

    if (file.ext === '.jpg' || file.ext === '.jpeg') {
      buffers = await Promise.all(
        IMAGE_WIDTHS.map((width) => jpeg(uncompressed, width))
      );
    } else if (file.ext === '.png') {
      buffers = await Promise.all(
        IMAGE_WIDTHS.map((width) => png(uncompressed, width))
      );
    }

    if (buffers) {
      promises.push(
        ...[
          fs.rm(`${file.distPath}${file.ext}`),
          ...buffers.map((buffer, idx) =>
            fs.writeFile(
              `${file.distPath}--${IMAGE_WIDTHS[idx]}w${file.ext}`,
              buffer,
              'utf-8'
            )
          )
        ]
      );
    }
  }

  await Promise.all(promises);
}

async function jpeg(uncompressed, imageWidth) {
  return sharp(uncompressed)
    .resize(imageWidth)
    .jpeg({ mozjpeg: true, quality: 70 })
    .toBuffer();
}

async function png(uncompressed, imageWidth) {
  return sharp(uncompressed).resize(imageWidth).png({ quality: 70 }).toBuffer();
}
