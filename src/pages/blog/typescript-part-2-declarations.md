---
title: 'TypeScript: Part 2, Declarations'
description: This post contains a bit about TypeScript declaration files.
publishDate: 2025-01-19T01:07:00.000Z
image: /assets/blog/typescript-part-2-declarations/typescript-part-2-declarations.png
imageAlt: 'An image containing the text, "TypeScript: Part 2, Declarations".'
imageCaption: 'An image containing the text, "TypeScript: Part 2, Declarations".'
tags: software engineering, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

## Ways to define declaration

### In the same package

Using the `types` field

### Via @types/* npm package

Via DefinitelyTyped repository, if package is organization-scoped, it will be @types/org__packagename

### Reference types

Via `.d.ts` file that is manually created, then with comment such as // reference:

## Ways to "patch" declaration

### Update the file directly

### Patch the package

### Patch the export with declare module

## Closing words