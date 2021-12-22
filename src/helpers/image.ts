import path from 'path';

const IMAGE_WIDTHS = [512, 1024, 2048];
const COMPRESSED_EXTS = ['.jpeg', '.jpg', '.png'];

export function getImageProps({ alt, src }: { alt: string; src: string }) {
  const imgProps: {
    alt: string;
    src: string;
    srcset?: string;
  } = {
    alt,
    src
  };

  if ((import.meta as any).env.MODE === 'production') {
    const ext = path.extname(src);

    if (COMPRESSED_EXTS.includes(ext)) {
      const withoutExt = src.slice(0, -ext.length);

      imgProps.srcset = IMAGE_WIDTHS.map(
        (width) => `${withoutExt}--${width}w${ext} ${width}w`
      ).join(', ');
      // Set the effective URL to the biggest image.
      imgProps.src = `${withoutExt}--${IMAGE_WIDTHS[2]}w${ext}`;
    }
  }

  return imgProps;
}
