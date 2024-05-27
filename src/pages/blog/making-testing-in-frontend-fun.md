---
title: Making Testing in Frontend Fun
description: The nature of frontend works that can be tested in the browser makes writing automated tests to be rather an afterthought. How to make it fun?
publishDate: 2024-05-26T15:43:16.123Z
image: /assets/blog/making-testing-in-frontend-fun/making-testing-in-frontend-fun.png
imageAlt: An image containing the text, "Making Testing in Frontend Fun".
imageCaption: An image containing the text, "Making Testing in Frontend Fun".
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Heya! Hope you are doing well. This will be rather a short post. Well, hopefully, anyway. Recently I have been trying to be more diligent in writing tests in my daily work, be it for frontend (unit, component, or page) and backend (functions that are called by controllers, I guess they fall to "unit" as well?).

Building this habit is not easy, not sure why, maybe because I have this habit of testing locally during the development time? So, if it works, then it's all good. There are a lot of reasons not to write tests, such as, _"There will be Quality Assurance (QA) engineers who test them"_, _"There is no time to write tests"_, and _"There is no one to maintain the tests"_.

Well, I'm here to debunk those questions. Here goes!

## The questions

### "There will be QA engineers who test them"

Okay, let's say that we have QA folks who will help us test the stuff after we have finished developing them. This feature is called "Feature A". They will write test cases around the thing that we have developed, both positive and negative test cases. Afterward, they do manual QA, confirm the functionality and the feature gets shipped. All is well and good.

...until the feature breaks. For some reasons. Turns out, the feature breaks because we updated certain helper functions that are used in Feature A during the development of, say, Feature B.

It is very, very uncomfortable for QAs to do regression testing every time something gets added, updated, or deleted. Put our place in theirs. Do we want, as software engineers, to test all functionalities when we implement a new one? That gives the impression that the software is flaky.

At the end of the day, QAs are still human. We software engineers are still human. We both are capable of making mistakes. So, it is not fair if we rely on the whole "system stability" to them. If there is a way to help them ease their burden, we should do it.

### "There is no time to write tests"

This is very understandable. We don't always have the luxury of time when developing something. However, let's count the number of times when you were "activated" at night to fix a bug in production. Would you trade those "awkward hours" for the burden of writing tests? I would definitely do it. There is no better feeling than knowing that you can sleep peacefully at night. You get a better quality sleep and you can be productive the next day.

Think of testing as an investment. There is no time to write tests, why? Is writing tests too hard? Then, get used to it. For sure it will be tough when we're not used to it. However, as we get familiar with the inside and out, all will be worth it. We will be faster in writing tests when the muscle memory has been built. On top of that, who doesn't love seeing checklists in the terminal log? We can also taste that sweet green Continuous Integration (CI) status in our branches and Pull Requests (PRs). Nothing is cooler than confidently shipping new stuff without breaking anything.

### "There is no one to maintain the tests"

With all of the explanations in the previous answers, I think we don't have a reason to discuss this anymore, so I'll just recap the benefits that we get from writing and maintaining tests:

1. We can confidently ship new features, bug fixes, and improvements without having to do regression tests _that_ often.
2. We can sleep peacefully at night knowing bugs and/or incidents happen less often.
3. We help our QAs (or those with similar responsibilities) by reducing their load, allowing them to be more focused and explorative.

One thing is for sure, we _do not_ want to disable tests when they fail unless absolutely necessary. When tests fail, ask ourselves this: _"What is the worst that could happen if I turn it off?"_

Imagine if we update a random part in our codebase and then the tests related to the Login feature fail. Do we still want to bring our changes to production? Speaking for myself, absolutely not.

## How to make it fun

As I wrote above, testing isn't fun at first, because making that habit is not easy and hence, not fun. Here are things that I suggest to make testing fun.

### Track the effort

Firstly, metrics! There is no better way to prove that all tests that you have written are worth it. Check out how many bugs (maybe focus on regression) that happened during past development cycles and see if the numbers are reduced as we add more tests.

For example, maybe previously every time we implemented something, we introduced an unrelated bug. However, with the tests guarding our development cycle, we can catch the regression in PRs, ensuring we have more robust software and faster development cycle.

This could be great proof that we are not only building quality software but also a good culture. Get your name shining with those sparkling numbers.

### Know how to test

Imagine if we are implementing a feature, but we don't know how to manually test it. It's as frustrating as not knowing how to write an automated test. _Usually_, what makes something hard to test is because it is too complex. For example, module B depends on module A, which is a very big module in itself, so when we want to test module B, we also have to set up module A, which can't be done because of one or other reasons (e.g. maybe module A is using framework-specific variables, so that is another dependency that we have to set up).

In that case, what we can do is that, we "extract the core" functionality of module B that doesn't require module A. Let's imagine that the flow is like this:

1. Module A instantiates module B
2. Module B does the initialization and all that
3. Module B fetches a list of repositories from GitHub
4. Module A uses the fetched list and stores it in a variable

If we want to test module B, we can test from step 1, or we can start smaller, for example at step 2 or step 3. _If_ at step 2 we require framework-specific stuff that is not available in the test environment, then we may have to refactor how module B is instantiated. For example:

```ts
class ModuleA {
  moduleB: ModuleB;

  constructor(context: SomeFrameworkContext) {
    // Let's say that `context.username` will be used to fetch the list of repositories.
    this.moduleB = new ModuleB(context);
  }
}
```

In the case above, we want to use `context.username` to be passed to `ModuleB`'s constructor. The value `context.username` will be part of the URL that we will be using to fetch the list of repositories. This is unnecessary, why? Because we only need `context.username`, we don't need the whole `context`. If we refactor it to the following:

```diff
  class ModuleA {
    moduleB: ModuleB

    constructor(context: SomeFrameworkContext) {
-     this.moduleB = new ModuleB(context)
+     this.moduleB = new ModuleB(context.username)
    }
  }
```

By changing the `ModuleB`'s API that way, we don't have to construct the whole `context` variable in our tests, making it easier to set up.

### Know what to test

After knowing how to test, we want to know as well what to test. We don't want to do "pointless testing", the simplest example being like this:

```ts
test('working', () => {
  // This doesn't bring value :(
  expect(true).toBe(true);
});
```

Let's use the our example case above, where `ModuleB` will be used to fetch a list of repositories. One way to test it is by making sure that the module sends a HTTP request to the correct URL. There are a lot of tools that can help with this, and one of them is [MSW (Mock Service Worker)](https://mswjs.io). It can be used in a browser environment and Node.js environment, so we can easily mock endpoints that will be hit by `ModuleB`. The test flow can be something like this:

```ts
afterEach(() => {
  server.resetHandlers();
});

test('fetch list of repositories', () => {
  server.use(
    http.get('https://api.github.com/users/:userId/repos', (ctx) => {
      if (userId !== 'helloworld') {
        return ctx.json(undefined, 404);
      }

      return ctx.json([{ name: 'example-repository' }]);
    })
  );

  let moduleB = new ModuleB('helloworld');
  let response = await moduleB.listRepositories();
  expect(response.length).toBe(1);
  expect(response[0].name).toBe('example-repository');

  moduleB = new ModuleB('test');
  expect(() => moduleB.listRepositories()).toThrow();
});
```

The above may look simple, but we are testing both happy and non-happy cases. The first one is we test with the username `helloworld`, which we define in the request mock. It will return a single repository. However, when the username is not `helloworld`, then it will return `404`. Here, we expect if it returns `404`, it will throw an error, so in the test, we also expect it to throw.

### Treat tests as a way to verify a bug

I read somewhere that once, there was this person who was actively contributing to Open-Source Software (OSS). They noticed a bug in a certain repository and on top of opening an issue, what did they do? They opened a PR with an added test reflecting the bug. Needless to say, the PR's build failed. However, the value brought by that PR was immense. Maintainers usually expect some kind of bug reproduction, usually in the form of an online sandbox or a repository with very minimal content. With that "failing PR", they do not have to look far: just fix the test and they will fix the issue as well.

The same can be applied when we want to fix a bug. Start with a test, confirm that the bug can be reproduced programmatically, then work on the fix. Then, feel how good that is to see the previously failing test, now successful.

## Recap

Alright, let's wrap it up with the list of benefits that we get from writing tests.

1. We can confidently ship new features, bug fixes, and improvements without having to do regression tests _that_ often.
2. We can sleep peacefully at night knowing bugs and/or incidents happen less often.
3. We help our QAs (or those with similar responsibilities) reduce their load, allowing them to be more focused and explorative.

_"W-wait, those are the same bullet points written in one of the sections above!"_ Well, yeah, that's the point. Let's deeply root those 3 points above in our mind, so that hopefully, we all can create awesome stuff without having to wake up at night to fix some bugs 😄
