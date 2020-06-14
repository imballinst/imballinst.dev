---
templateKey: blog-post
title: JSDoc, a Stairway to TypeScript
date: 2020-07-14T14:39:06.797Z
featuredpost: false
featuredimage: images/platinum-route-217.png
description: If you hate writing JSDoc syntax, you might really love TypeScript.
tags:
  - software engineering
  - javascript
---

---

_In this post, I will be using the contents of this repository: https://github.com/Imballinst/jsdoc-sample._

---

I have been using TypeScript for almost 1 year and I've got to say, I really enjoy working with it every day. I feel someone -- or rather, something -- is watching me writing my code. If I have an error, it will scream next to my ear and it won't stop until I fix it. This is a blessing, well, most of the time anyways. There are times when I wanted to bang my head to the wall because there were cryptic errors that I couldn't quite solve easily.

While that's happening, I also have been reading other developers' thoughts on using TypeScript. Some are afraid to try it because it is intimidating, while some other really love it. Alright, so, what are the reasons I love TypeScript? It **guides** me.

![Route 217, Pokémon Platinum.](images/platinum-route-217.png)

Imagine walking through a blizzard. Normally, you will be able to see the road track, which keeps you on the road and prevents you from getting lost. However, during that blizzard, the road track is buried deep beneath the snow. You can't see where are you going. You can brute force your way to your destination by going in all possible directions, but how long will it take?

When you can see the road track, **you don't have to think**. You just follow that road track and eventually it will get you somewhere. If you are lost, then you can go back, using the same road track to your previous checkpoint.

This is similar with a codebase. A simple function is easy to consume, its track is clear. However, in a more complex function, the code flow _can_ be harder to follow, let alone if the variable names do not quite represent what they actually contain. For example, there is a variable named `books`. What is it? An array of string, or an array of `Book` objects? We don't know that in plain JavaScript -- unless the writer puts a comment on it.

Okay, nice -- so we can put a comment to "explain" a variable. However, how many lines of comments that you need to write if there are a lot of complex variables? The benefit that your team gets is really small compared to the effort that you have done. TypeScript _can_ be the answer here, but let's assume that TypeScript is intimidating and we want to start slowly. Where do we start?

## Introducing JSDoc

You might have heard about [JSDoc](https://github.com/jsdoc/jsdoc), or perhaps you just don't realize you have been using it all this time. In JavaScript, there are 2 ways to write a comment.

```js
// This is an inline comment.
const x = 1;

/** This is a multi-line comment. When the variable is hovered, it will display this comment. */
const y = 2;

/**
 * This is a multi-line comment.
 * When the variable is hovered, it will display this comment.
 */
const z = 3;

// Note that the output comment for `y` and `z` are the same, despite we use line break in the comment.
```

For comments that are using the `/** {content} */` syntax, in modern IDEs, such as Visual Studio Code, they will automatically infer it as JSDoc documentation comments. This enables developers to quickly look up about the definition of a variable without changing context (e.g. open another file, scroll up/down, etc.). Without further ado, let's explore the key features of JSDoc.

### Comment

### Function Parameter

### Type Definitions

### Function Parameter with Object/Array

### Comparison to TypeScript

### Conclusion
