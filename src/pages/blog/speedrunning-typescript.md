---
title: Speedrunning TypeScript
description: Let's do a quick review on TypeScript basics and some bits beyond that you might use often.
publishDate: 2024-01-16T01:01:35.585Z
image: /assets/blog/speedrunning-typescript/speedrunning-typescript.png
imageAlt: An image containing the text, "Speedrunning TypeScript".
imageCaption: An image containing the text, "Speedrunning TypeScript".
tags: software engineering, javascript, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hi! Hope you are doing well. In this post, I am going to do a quick review on TypeScript. Things that were written in this post actually came from my sharing session to my team on Friday, February 2nd where I talked about the same thing. I did the thing in the form of real-time demo though (directly in IDE), so there were no presentations and all that.

With all that said and done, let's start!

## What's wrong with JavaScript?

So, what's wrong with JavaScript, anyway, so that there is TypeScript? The answer is... nothing wrong with JavaScript. The language was perfect for websites that are used by browsers since it is a dynamically typed language and hence, it doesn't need to be compiled.

However, as technologies evolved, applications and websites become more complex. For a larger codebase, it _might_ be tough to maintain codes where you are not sure what is the "actual" value contained in a variable. On top of that, the behavior of JavaScript allows assignation of a different type to the original defined, such as this:

```js
let a = 0;
a = 'hello';
```

This is, of course, allowed and valid in JavaScript. As long as the result suits your need, it should be fine. What _might_ not be fine is, if someone else (that is not us) is confused on the variable's content. If we want to keep using JavaScript but want its features in our IDE (e.g. `TypeError` indicators), we can use the syntax `@ts-check` at the top of the file, so we give "order" to our IDE to typecheck the file.

```js
// @ts-check
let a = 0;
a = 'hello';
// ^ Type 'string' is not assignable to type 'number'.
```

Nice and easy. We still use plain JavaScript, we don't need compilation, but we get TypeScript features to at least warn us in our IDE. If you need JavaScript to support a rather complex type, check out my other post: [JSDoc, a Stairway to TypeScript](./jsdoc-stairway-to-typescript.md).

## TypeScript basics

## Union and intersection

## Utility types

## Generic types
