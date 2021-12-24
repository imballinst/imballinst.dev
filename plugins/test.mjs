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
> **User:** "Hey, I found this bug where the X function is not working properly when given the input Y."
> **Maintainer:** "Thanks for reporting! Could you tell me which version is this?"
> **User:** "I am using the version that was released last year: 2.11.0."
> **Maintainer:** "Sure! I'll look into it."

> Thrombocytopenia might occur as a result of a bone marrow disorder such as leukemia or an immune system problem. Or it can be a side effect of taking certain medications. It affects both children and adults.
>
> Thrombocytopenia can be mild and cause few signs or symptoms. In rare cases, the number of platelets can be so low that dangerous internal bleeding occurs. Treatment options are available.
`.trim()
    );

  console.error(String(file));
}
