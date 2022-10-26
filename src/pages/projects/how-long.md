---
title: how-long
description: how-long is a project to store collection of events.
publishDate: 2021-12-13T04:35:00.000Z
githubLink: https://github.com/imballinst/how-long
---

I built `how-long` with the initial motivation to track some of the issues in Indonesia, such as rape cases from police officers or nonsense from some politicians. However, I thought it would be good as well if it is used to track other stuff, such as ["How long until it is 2022?"](https://how-long.imballinst.dev/until/it-is/2022-in-indonesia/). I even tracked ["How long since Arsenal last won a match?"](https://how-long.imballinst.dev/since/arsenal/last-won-a-match/).

This project is powered by [Astro](https://astro.build/), one of the latest static site builders. The contents are built from Markdown files. These will be used to generate a JSON file, which will be fed to the Astro to render in the build phase.

Although this project seems to be an "application", but I am considering to publish it as a npm package. That way, people can use it as a "framework" to create their own collection of events.
