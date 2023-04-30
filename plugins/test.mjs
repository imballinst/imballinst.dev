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
- [Indonesian Dota 2 Tournaments List](https://github.com/imballinst/d2l): This was a website that "scrapes" from Ligagame forums, where people usually posted tournaments and events. I built it with jQuery, Bootstrap, and Angular.
- [RTD Dota 2 Team Profile](https://github.com/imballinst/rtdota2): This was a website that I built for fun, so on top of the Facebook fan page (back then), my team could have a somewhat poor man's landing page.
`.trim()
    );

  console.error(String(file));
}
