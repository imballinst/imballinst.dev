---
title: solar-beam
description: solar-beam is a project to get the sunrise and sunset time given latitude and longitude.
publishDate: 2020-05-10T08:46:00.000Z
githubLink: https://github.com/imballinst/solar-beam
layout: '../../layouts/Project.astro'
---

I built `solar-beam` back then in order to create an animation of sunrise and sunset. However, at the end I didn't manage to do it. I only managed to do the "calculator"... as the animation part was very tricky, considering screen sizes and all that. This package was built by following the calculations from [Solar Calculation Details from Global Monitoring Laboratory](https://gml.noaa.gov/grad/solcalc/calcdetails.html).

This package is ESM only, so it can't be imported using `require` in Node.

```ts
import { getSunsetDate } from 'solar-beam';

// Sat May 09 2020 17:44:56 GMT+0700 (Western Indonesia Time)
console.log(
  getSunsetDate({
    date: new Date(2020, 4, 9),
    latitude: -6.2,
    longitude: 106.816666,
    tzOffset: -420
  })
);
```

We can confirm this result in https://www.timeanddate.com/sun/indonesia/jakarta?month=5&year=2020. Although the website doesn't show the second unit, but the minute is the same (the 44th).
