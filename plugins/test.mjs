import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';

process.env.ASTRO_ENV = 'production';

main();

async function main() {
  const file = await remark()
    .use(remarkGfm)
    .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
      ![The finished countup timer. It ticks from "1 year, 1 month, 10 days, 1 hour, 23 minutes, 1 second" to "1 year, 1 month, 10 days, 1 hour, 23 minutes, 10 seconds".](/assets/blog/creating-count-up-timer/timer-wedding.jpg)
`.trim()
    );

  console.error(String(file));
}
