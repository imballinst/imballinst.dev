import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';

process.env.PUBLIC_ASTRO_ENV = 'production';

main();

async function main() {
  const file = await remark()
    .use(remarkGfm)
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
> test
> test2

> test3
>
> test4
`.trim()
    );

  console.error(String(file));
}
