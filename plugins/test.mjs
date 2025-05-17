import { remark } from 'remark';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';
import tocInjectorPlugin from './toc-injector/index.mjs';
import remarkToc from 'remark-toc';

process.env.NODE_ENV = 'production';

main();

async function main() {
  const file = await remark()
    .use(tocInjectorPlugin)
    .use(remarkToc)
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
1. Import index.js
2. Does it have index.d.ts?
   1. Yes: import it and "map" all types inside it to variables in index.js
   2. No: do nothing
`.trim()
    );

  console.info(String(file));
}
