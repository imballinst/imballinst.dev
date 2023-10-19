---
title: cliff
description: A somewhat test project to see if it's possible to extend a CLI's functionality without rebuilding it.
publishDate: 2023-10-12T00:00:00.000Z
githubLink: https://github.com/imballinst/cliff
layout: '../../layouts/Project.astro'
---

When I was working on CLI stuff, I always thought that every CLI use case is meant to have its own binary.

However, I thought, what if, there is a CLI that we can use as a "host script" and then the child scripts we can gather from every other places? That way, we don't have to install too many CLI applications.

It seems to work well, so the idea is that we're going to have a folder in our `$HOME` folder, in which, we will use it as a "dictionary of custom commands". It's pretty interesting!
