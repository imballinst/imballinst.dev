import { remark } from 'remark';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';
import {
  tocInjectorPlugin,
  tocLeadingContentCleanupPlugin
} from './toc-injector/index.mjs';
import remarkToc from 'remark-toc';

process.env.NODE_ENV = 'production';

main();

async function main() {
  const file = await remark()
    .use(tocInjectorPlugin)
    .use(remarkToc)
    .use(tocLeadingContentCleanupPlugin)
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
Test

## hehe

haha
`.trim()
    );

  console.info(String(file));
}
