---
title: Test as Documentation
description: In this post, we will look at how can testing become the source of documentation.
publishDate: 2024-05-26T15:43:16.123Z
image: /assets/blog/test-as-documentation/test-as-documentation.png
imageAlt: An image containing the text, "Test as Documentation".
imageCaption: An image containing the text, "Test as Documentation".
tags: software engineering, test
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! This one will be a rather short post and a _somewhat_ continuation of the previous post about [Making Testing in Frontend Fun](./making-testing-in-frontend-fun.md). In this post, I am going to cover about using testing as documentation.

## Why am I so adamant about testing?

I easily forget about what I worked about few days ago, because I switch contexts a lot. I do A, B, C, then when I get back to A, chances are I forget what are the requirements and constraints of A. My implementation ended up breaking the previous behavior, which resulted in longer development time (because of bug fixes).

Sure, you can use comments, a document in Google Docs or any medium, but it's very likely that we might be forgetting to update these documents time to time. These documents also are not CI-friendly, meaning, if the documentation is not consistent with the implementation, it's not likely the CI will fail the build. So... what can be run inside the CI to make sure the behavior is consistent? That's right, testing!

Let's say we have a library that exposes this function:

```ts
export function sum(a: number, b: number) {
  return a + b
}

// The test file:
test('sum', () => {
  expect(sum(1, 2)).toBe(3)
})
```

Then, there is a feature that requires us to be able to input 3 or more numbers. Let's say our first instinct is to make it like this:

```ts
export function sum(values: number[]) {
  return values.reduce((total, cur) => total + cur, 0)
}

// The test file:
test('sum', () => {
  expect(sum(1, 2)).toBe(3)
  // ^ This will break!
})
```

The test will break with our new implementation. What does that mean? At least, if the consumer of your library use this function, then they will need to update `sum(1, 2)` to be `sum([1, 2])`. This is bad news for the library consumers, especially if we are not planning to release a major version. If we do not have tests, we wouldn't know that we accidentally caused a breaking change.

Now, again, I know it's a very simplified example. However, when the use case is more complex, it is very useful to know that your changes do not accidentally break existing behavior. Think of it like TypeScript. With TypeScript, we can refactor functions easily, because if we update the function parameters (or return types), we know which parts are breaking because the build will fail, assuming we enable type checking with `tsc`. Test suites are the same.

If we want to learn the behavior of the function (or the use case), we just need to look at the test. What is the input and what is the output? From there, we will be able to know what is the function all about. If I am a new person inside the project, I will not be afraid of breaking existing functionality, because if I screw up, the tests will fail, which prevents my work from being shipped to production.

## Do I always need to write tests?

Unless the software that you are building are not complex, like, your usual CRUD application, I'd say you don't need tests. However, if your software covers a lot of use cases and those use cases become bigger after each iteration, you might want to have testing in place.

If you are not convinced yet, try finding an Open Source Software (OSS) that has at least 10k stars in GitHub and check if it doesn't have tests. When you find it, try to contribute without adding tests, and see what will the maintainer say.

## Conclusion

As closing words, it's case by case. You don't always need tests. However, when the use cases start to become more complex, you might want to consider incorporating tests to your workflow because of 2 reasons: documentation and productivity.
