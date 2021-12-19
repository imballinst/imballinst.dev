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
![Photo by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/images/things/arrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.](/assets/blog/are-arrow-functions-overrated/nick-fewings-zF_pTLx_Dkg-unsplash.jpg)

Hello, it's the tech side of me again! It has been awhile, my latest tech-related post here was ["JSDoc, a Stairway to TypeScript"](https://peepohappy.id/blog/jsdoc-stairway-to-typescript), which was almost 10 months ago? Anyway... in this post, I'm going to write something about [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

## What is an arrow function expression?

According to the MDN Docs, arrow functions are _"a compact alternative to a traditional function expression, but is limited and can't be used in all situations"_. So, it **can** replace normal function expression in _some_ conditions. Let’s see some examples of it.

![Photo by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/images/things/arrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.](/assets/blog/are-arrow-functions-overrated/nick-fewings-zF_pTLx_Dkg-unsplash.jpg)
    `.trim()
    );

  console.error(String(file));
}
