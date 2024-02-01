---
title: "TIL: Remix v2 Migration"
description: Today I learned about some of the stuff that I struggled with Remix v1 to v2 migration.
publishDate: 2024-02-01T15:35:02.427Z
image: /assets/common-images/today-i-learned.png
imageAlt: An image containing the text, "Today I Learned", with some rectangles forming the text "TIL".
imageCaption: An image containing the text, "Today I Learned", with some rectangles forming the text "TIL".
tags: til, software engineering, javascript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Happy February! This is a new form of blog post, I guess. A less formal one, at that. This kind of post will mostly cover what I learned, something like a journal, that I would like to revisit another day. I hope this could be useful for anyone who finds this in the future.

So, yeah, today I wanted to try out this function from Remix called [createRemixStub](https://remix.run/docs/en/main/utils/create-remix-stub). A little bit about it, from my understanding, Remix consists of a lot of things, starting from route and this route can contain either UI, action, or loader, or all of them together. Normal testing frameworks, such as [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) couldn't test components that are using Remix internals (such as actions and loaders), because, well, they were not reachable by the testing framework.

This `createRemixStub` changes everything. We will be able to test not only components but also mock out actions and loaders! That's really cool because then we can now test out components that are importing utilities from `@remix-run/react` and then in the test, we can just mock them out. So, yes, I installed `@remix-run/testing`... then I wondered, why it didn't work?

## We cannot use `useRouteLoaderData` at the top-level

I got this error the first time:

```
React Router caught the following error during render Error: useRouteLoaderData must be used within a data router.
```

I spent some time looking around... and I also almost embarrassed myself (or maybe I already did) by opening [a discussion in the Remix repository](https://github.com/remix-run/remix/discussions/8658) about it. It's a super silly mistake.

Apparently, we can't use `useRouteLoaderData` at the top-level. We need to use it at least on a nested path... which means should be at least under the `children` of the top-level route.

## Always, always use the same versions of Remix packages

The struggle didn't stop there! I met another issue where the rendered thing always rendered this:

```tsx
<body>
  <div />
</body>
```

I fixed it by bumping all other `@remix-run/*` packages and then I was able to move forward.

## Move server-side utilities to `*.server.ts`

Alright, this one I was not aware of. So, I got errors like [this one](https://github.com/remix-run/remix/issues/7350), right:

```
The package "util" wasn't found on the file system but is built into node. Are you trying to bundle for node? You can use "platform: 'node'" to do that, which will remove this error.
```

Initially, I thought this was about `esbuild`, but then I couldn't find any documentation about overriding `esbuild` config or something.

After a bit of tracing, this happened when I imported [winston](https://github.com/winstonjs/winston), a JavaScript library for logging with certain levels (with customizable formatting). In v1, all these imports in the `.tsx` file worked fine. However, after I bumped the `@remix-run/*` packages to v2, all hell broke loose.

I looked up GitHub Discussions and saw [this answer from sergiodxa](https://github.com/remix-run/remix/discussions/3515#discussioncomment-2996283). He's a very cool person, he creates a lot of Remix-related guides and is actively helping the community. From that answer, I initially tried out passing the `winston` logger via `AppLoadContext`. But then, I saw the discussion had something-something around `*.server.ts`, so I guessed it was worth a try.

And worth it, it was. After verifying it through this [*.server.ts section in the documentation](https://remix.run/docs/en/main/file-conventions/-server), I imported the thing from `logger.server.ts` and it worked!

## Manually enable polyfills

There were these last errors, but these are mostly pretty straightforward. It was mostly about polyfills. In Remix v1, from what I could understand everything is polyfilled automatically. However, in Remix v2, we need to select things that we want to polyfill manually (I suppose for reducing bundle size, especially in the browser).

After I enabled the polyfills that I needed, finally, finally there were no errors! I got sidetracked a lot just because I wanted to try out this `createRemixStub`, but it was good learning overall.