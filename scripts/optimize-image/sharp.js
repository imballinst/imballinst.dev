const sharp = require('sharp');
const fs = require('fs/promises');
const path = require('path');

const { getAllFileSizes } = require('./file-size');

const PATH_TO_PUBLIC_ASSETS = path.join(__dirname, '../../', 'public/assets');

main();

async function main() {
  const files = await getAllFileSizes(PATH_TO_PUBLIC_ASSETS);

  for (const file of files) {
    const uncompressed = await fs.readFile(file.path);
    const fileExtension = path.extname(file.path);

    let buffer;

    if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
      buffer = await jpeg(uncompressed, file.size);
    } else if (fileExtension === '.png') {
      buffer = await png(uncompressed, file.size);
    }

    if (buffer) {
      await fs.writeFile(file.distPath, buffer, 'utf-8');
    }
  }
}

function getQualityOptimization(fileSize) {
  if (fileSize < 400) {
    return 80;
  } else if (fileSize >= 400 && fileSize < 600) {
    return 70;
  } else if (fileSize >= 600 && fileSize < 800) {
    return 65;
  }

  return 60;
}

async function jpeg(uncompressed, fileSize) {
  return sharp(uncompressed)
    .jpeg({ mozjpeg: true, quality: getQualityOptimization(fileSize) })
    .toBuffer();
}

async function png(uncompressed, fileSize) {
  return sharp(uncompressed)
    .png({ quality: getQualityOptimization(fileSize) })
    .toBuffer();
}

async function doesPathExist(path) {
  try {
    await fs.stat(path);

    return true;
  } catch (err) {
    return false;
  }
}
