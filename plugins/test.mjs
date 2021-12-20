import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';

main();

async function main() {
  const file = await remark()
    .use(remarkGfm)
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
# test

https://en.wikipedia.org/wiki/Solar_eclipse

> henlo

\`test\`

1. \`test\`
2. \`test\`
    `.trim()
    );

  console.error(String(file));
}
