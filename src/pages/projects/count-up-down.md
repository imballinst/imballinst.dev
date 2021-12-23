---
title: count-up-down
description: count-up-down is a npm package to calculate the data required for a countdown or count-up timer.
publishDate: 2021-12-05T12:57:00.000Z
githubLink: https://github.com/imballinst/count-up-down
setup: import Layout from '../../layouts/Project.astro'
---

`count-up-down` is a npm package that we can use to get the units required to construct a countdown or count-up timer, such as years, months, days, hours, minutes, and seconds. A demo can be seen here: https://imballinst.github.io/count-up-down. At the time of writing, it is a count down to 2022. After 2022 kicks in, then it will become a count-up.

This package is published in jsDelivr, so we can use it directly in a page, along with our stylings.

```html
<div class="root">
  <div class="row">
    <div class="wrapper">
      <div class="value" id="years"></div>
      <div class="unit">years</div>
    </div>
    <div class="wrapper">
      <div class="value" id="months"></div>
      <div class="unit">months</div>
    </div>
    <div class="wrapper">
      <div class="value" id="days"></div>
      <div class="unit">days</div>
    </div>
  </div>
  <div class="row">
    <div class="wrapper">
      <div class="value" id="hours"></div>
      <div class="unit">hours</div>
    </div>
    <div class="wrapper">
      <div class="value" id="minutes"></div>
      <div class="unit">minutes</div>
    </div>
    <div class="wrapper">
      <div class="value" id="seconds"></div>
      <div class="unit">seconds</div>
    </div>
  </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/count-up-down@0.2.3/dist/count-up-down.min.js"></script>
<script>
  const ONE_HOUR_AGO = new Date(new Date().getTime() - 3600 * 1000);

  window.addEventListener('load', () => {
    // This will render to the divs with the ID "years", "months", and so on.
    renderToDivs(calculate(ONE_HOUR_AGO, new Date()).result);

    setInterval(() => {
      renderToDivs(calculate(ONE_HOUR_AGO, new Date()).result);
    }, 1000);
  });
</script>
```

It can also be installed as a dependency in our `package.json`, which we can use like the following:

```js
import { calculate } from 'count-up-down';

const ONE_HOUR_AGO = new Date(new Date().getTime() - 3600 * 1000);

// {
//   result: { days: 0, hours: 1, minutes: 0, months: 0, seconds: 0, years: 0 },
//   type: 'countdown'
// }
console.log(calculate(new Date(), ONE_HOUR_AGO));
```
