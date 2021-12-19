import { remark } from 'remark';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';

main();

async function main() {
  const file = await remark()
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
1. Get the initial timestamp
2. Get the current timestamp
3. Get the difference of years
4. Get the difference of months
5. Get the difference of days
6. Get the effective difference of years
7. Get the effective difference of months
8. Get the effective difference of days
9. _Render_ the dates accordingly (with Monospace fonts and padded with 0s)
    `.trim()
    );

  console.error(String(file));
}
