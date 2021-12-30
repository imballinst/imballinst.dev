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
:::
DISCLAIMER: [@matahatigraphy](https://www.instagram.com/matahatigraphy/?hl=en) was our wedding photographer. They gave us the raw and the edited pictures, but for this post, I can't find images that I wanted from the latter. Therefore, I took out a few pictures from the former and tweaked them myself. If you have a keen eye for photography stuff, I'm sorry if the following pictures hurt your eyes!
:::
`.trim()
    );

  console.error(String(file));
}
