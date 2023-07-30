---
title: Benefits of Contributing to Open Source Projects
description: In this post, I will share what I gained from my small steps in contributing to open source projects.
publishDate: 2023-04-30T07:57:54.295Z
image: /assets/blog/leveling-up-as-frontend-engineer/background-leveling-up-as-frontend-engineer.png
imageAlt: An image with the text "Leveling Up as a Frontend Engineer" at the center.
imageCaption: An image with the text "Leveling Up as a Frontend Engineer" at the center.
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, it's me again! It's been a while since my last post about [Leveling Up as a Frontend Engineer](https://imballinst.dev/blog/leveling-up-as-frontend-engineer), that was around 3 months ago. This time, I am going to share a bit on what I have gained from my small steps of contributing to open source projects.

For the record, my contributions so far were small ones. But, these small ones were good enough for me. Anyway, here are the things that I learned from my journey contributing in open source.

## Asynchronous communication

This one is pretty clear. As a library maintainer, we get issues/questions/feedback from the library users and we need to make sure that we understand their issue and what are they suggesting. The key here is _listen_. And of course, just because we published a library, it doesn't mean we have an obligation to maintain it. We can ask our users to open a PR and contribute if they want to.

By learning asynchronous communication, you get to tick 2 aspects of a usual English test: **reading** and **writing**. Similar like speaking, you don't always have to use a perfect grammar and all that. The important thing is to get your point across to people you're talking to.

## Documentation

Documentation can be in a lot of forms. It can be in the form of Markdown, it can be in the form of examples, or it can be in the form of code comments. Considering our library will be used by users, they will also want to know how to use our library and see what kind of use cases are covered.

Consider this case, have you ever wanted to use a library but somewhat the documentation is outdated or it's very hard to find examples so that we could apply it in our project? We can use that experience to push ourselves to improve our library's documentation, so that our users can have better experience.

## Engineering practices

In my current workplace, there are QAs who will verify our tasks that we have worked on. In some cases, they may also do regression testing. The same doesn't exist in open source projects. Maintainers won't have the time to check each feature one-by-one every time there is a pull request for new feature or bug fix.

Hence, unit tests are very valuable. I for one also benefited from this. Take [my test suites from the react-bs-datatable](https://github.com/imballinst/react-bs-datatable/blob/main/src/__stories__/00-Uncontrolled.test.tsx) as an example. I created various tests and used React Testing Library to test the UI. It helped me to develop faster and also verify faster, in case there are contributors submitting their pull request to the repository.

Instead of having to checkout and test it locally, I can just rely on the test suites and see if there are things that regressed or not. If not, then the PR is most likely good to go.

## Focus on value

This perhaps doesn't only apply to open source projects, but also for pet projects (or personal proejcts). When we are working on open source projects (especially ones not owned by us), we want to _focus_ on the objective. Just because there are some parts of the code that don't match our "style" or we think they are messy, it doesn't mean we should change it in that instant.

Consider this case, our library has a bug. But when fixing the bug, we noticed some things that could be refactored. Our first instinct would be to refactor it while fixing the bug. It may end well if the refactor doesn't take a lot of effort. But, what if the refactor itself takes longer time than the bug fix?

Our first priority should be to deliver values to users. Hence, say, if the library's version is `1.0.0`, then we need to fix that bug first and bump the version to `1.0.1` ([read more about Semantic Versioning here](https://semver.org/)).

After we have published `1.0.1`, we have all the time in the world to refactor.

## Technology knowledge

I learned this when I tried to contribute to [openapi-zod-client](https://github.com/astahmer/openapi-zod-client/pulls?q=is%3Apr+author%3Aimballinst+is%3Aclosed). So far, I have mostly been using `npm` and `yarn`. But, that repository happens to use `pnpm`, so I could see how `pnpm` behaves and its differences compared to `npm` and `yarn`.

I also learned about things such as:

1. [Changesets](https://github.com/changesets/changesets). It's a very cool tool for libraries so that releases are more manageable (as in, no need to update `package.json` version manually anymore),
2. JavaScript's module system (CJS/ESM/UMD),
3. npm registry mechanisms (publishing, unpublishing, deprecating),
4. Semantic versioning, and
5. GitHub Actions.

## Closing words

I think working on open source _can_ be fun. It can also be included as an added value in our portfolio. If you are interested, you can start small from your favorite library, then maybe try to notice parts that can be improved (or is incorrect) -- easiest one is perhaps documentation.

With that being said, always remember to _provide value_. If your contribution doesn't provide value, then the project maintainer won't think twice to decline it.

That's all from me. Hopefully this post is useful and see you on the next post!