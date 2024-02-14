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

So, what's wrong with JavaScript anyway, so that there is TypeScript? The answer is... nothing wrong with JavaScript. The language was perfect for websites that are used by browsers since it is a dynamically typed language and hence, it doesn't need to be compiled.

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

Alright, let's start the basics. In TypeScript, we can "assign" a type to a variable, like the following.

```ts
let a: number = 0;
a = 'hello';
// ^ Type 'string' is not assignable to type 'number'.
```

But, often times they are not needed. TypeScript is smart enough to derive the type if the type is a primitive type, such as string, number, or boolean. So the following is already enough.

```ts
let a = 0;
a = 'hello';
// ^ Type 'string' is not assignable to type 'number'.
```

It's all well and good for primitive types, but how about structs?

```ts
let a = {
  hello: 'world'
};
a = 'hello';
// ^ Type 'string' is not assignable to type '{ hello: string; }'
```

The above works, but it's a bit tricky if there is an optional variable. Say, on top of `hello` field, there should be an optional `test` field.

```ts
let a = {
  hello: 'world'
};
a.test = 'sample text';
// ^ Property 'test' does not exist on type '{ hello: string; }'
```

To play around it, you must first define the type.

```ts
interface SampleObject {
  hello: string;
  // This means this field is optional and if it exists it has to be a string.
  test?: string;
}

let a = {
  hello: 'world'
};
a.test = 'sample text'; // ✨ no error!
```

### Interface vs type

In the above example, notice that we are using `interface`. You might also have known that a type can be defined by either `interface` and `type`. So, what's the difference between them?

There is no real difference on normal usages. _However_, `type` is typically used when we are using utility types (which is going to be explained on the next section). Consider this example:

```ts
type SampleType = Pick<{ hello: string, test?: string }, 'hello'>; // this will pick the "hello" field only.

// If we want to "force" use interface, it's going to be longer.
interface SampleInterface extends Pick<{ hello: string, test?: string }, 'hello'> {}
```

Another difference is that, if we hover on `SampleType`, it will show the list of fields that we can use for `SampleType`, whereas for `SampleInterface`, it will only show `interface SampleInterface`. This means, if we are using `interface`, we can get a rather "cleaner" hover view compared to `type`.

So, by default, my rule of thumb is: use `interface` unless we need to use utility types.

## Union and intersection

## Utility types

## Generic types
