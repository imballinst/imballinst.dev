import { remark } from 'remark';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';
import { tocInjectorPlugin, tocLeadingContentCleanupPlugin } from './toc-injector/index.mjs';
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

![The FF7 Safer Sephiroth Supernova animation. Source: https://www.youtube.com/watch?v=hTc9sLmOR0A](/assets/blog/space-created/ff7-supernova.png)
`.trim()
    );

  console.info(String(file));
}
