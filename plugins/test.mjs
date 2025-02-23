import { remark } from 'remark';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';

process.env.NODE_ENV = 'production';

main();

async function main() {
  const file = await remark()
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
[hello \`Test link with code outside list\` world](https://example1.com) and [Test markdown link](./hello.md)

- [Test link](https://example2.com)
- [Test markdown link](./hello.md)
- [\`Test link with code\`](https://example3.com)
`.trim()
    );

  console.info(String(file));
}
