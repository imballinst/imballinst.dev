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
- [Indonesian Dota 2 Tournaments List](https://github.com/imballinst/d2l): This was a website that "scrapes" from Ligagame forums, where people usually posted tournaments and events. I built it with jQuery, Bootstrap, and Angular.
- [RTD Dota 2 Team Profile](https://github.com/imballinst/rtdota2): This was a website that I built for fun, so on top of the Facebook fan page (back then), my team could have a somewhat poor man's landing page.

- If a component is referred by other components (more than once), then most likely we want to split it.
- If a component is referred to by other components only once, then it may depend on how logic-heavy is the component.
  - If the logic is heavy, then it may be better to split it into a separate file.
  - If not, then perhaps it's better to split the component, but still localize it in the same file.
`.trim()
    );

  console.error(String(file));
}
