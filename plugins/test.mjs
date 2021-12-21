import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import htmlClassnamesPlugin from './html-classnames/index.mjs';
import imageCaptionPlugin from './image/index.mjs';

main();

async function main() {
  const file = await remark()
    .use(remarkGfm)
    // .use(imageCaptionPlugin)
    .use(htmlClassnamesPlugin)
    .process(
      `
> henlo \`test\`
> test

> henlo \`test\`
>
> test

| Day | Breakfast | Lunch                                   | Dinner                                  |
| --- | --------- | --------------------------------------- | --------------------------------------- |
| Sun | Cereal    | Bread variations (sandwich/spread)      | Bread variations                        |
| Mon | Cereal    | Potato salad                            | Bread variations                        |
| Tue | Cereal    | Potato salad/bread variations           | Potato salad/bread variations           |
| Wed | Cereal    | Rice, egg, veggies                      | Rice, egg, veggies                      |
| Thu | Cereal    | Rice, egg, veggies/eat in a restaurant  | Rice, egg, veggies                      |
| Fri | Cereal    | Salmon sushi (or rice+salmon when lazy) | Salmon sushi (or rice+salmon when lazy) |
| Sat | Cereal    | Salmon sushi (or rice+salmon when lazy) | Bread variations                        |
`.trim()
    );

  console.error(String(file));
}
