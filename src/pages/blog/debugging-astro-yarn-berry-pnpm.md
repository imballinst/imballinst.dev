---
title: Debugging Astro and Yarn Berry + nodeLinker pnpm
description: I met some issues when building a site with Astro, Yarn Berry, and nodeLinker pnpm and I'm going to share them in this post.
publishDate: 2023-07-30T14:11:48.089Z
image: /assets/blog/debugging-astro-yarn-berry-pnpm/debugging-astro-yarn-berry-pnpm.png
imageAlt: An image containing the text, "Debugging Astro and Yarn Berry with nodeLinker pnpm".
imageCaption: An image containing the text, "Debugging Astro and Yarn Berry with nodeLinker pnpm".
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hey, everyone! Hope you are all doing well, in this post, I'm going to do a quick share about my experiences in debugging stuff when I was building something with Astro and Yarn Berry (with `nodeLinker: pnpm`).

## What, I thought `pnpm` is a similar tool like npm and Yarn?

Yes, that is true, from a perspective. However, Yarn happens to have this thing called [nodeLinker](https://yarnpkg.com/configuration/yarnrc#nodeLinker). There are 3 values available for this config:

1. `node-modules`, which is the default one (used in Yarn Classic and npm).
2. `pnp`, which is a mode where we don't use `node_modules`. Instead, two files called `.pnp.cjs` and `.pnp.loader.mjs`. An example can be seen in [this astro-yarn-berry-pnp repository](https://github.com/imballinst/astro-yarn-berry-pnp/tree/main). In order to have the best development experience, we are required to set up [Editor SDKs](https://yarnpkg.com/getting-started/editor-sdks).
3. `pnpm`, which is a somewhat middle ground between `node-modules` and `pnp`. While `pnp` completely "flattens" the dependency structure and `node-modules` has a chance for hoisting issues, `pnpm` can be seen as the best of both worlds. It still creates `node_modules` folder, but it uses symlinks so that the packages and dependencies can found each other.

## The issue: using Astro with React Integration

I have prepared [this sandbox here](https://codesandbox.io/p/sandbox/astro-yarn-pnpm-77y7pf?file=%2Fpackage.json%3A1%2C1), containing a setup of a broken Astro with React integration. The error is as follows:

```
error   Cannot find package 'vite' imported from /workspaces/workspace/node_modules/.store/@vitejs-plugin-react-virtual-8d8f5dfd7e/node_modules/@vitejs/plugin-react/dist/index.mjs
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'vite' imported from /workspaces/workspace/node_modules/.store/@vitejs-plugin-react-virtual-8d8f5dfd7e/node_modules/@vitejs/plugin-react/dist/index.mjs
  at new NodeError (node:internal/errors:405:5)
  at packageResolve (node:internal/modules/esm/resolve:782:9)
  at moduleResolve (node:internal/modules/esm/resolve:831:20)
  at defaultResolve (node:internal/modules/esm/resolve:1036:11)
  at DefaultModuleLoader.resolve (node:internal/modules/esm/loader:251:12)
  at DefaultModuleLoader.getModuleJob (node:internal/modules/esm/loader:140:32)
```

Now, that's curious, right? This happens right after I did `yarn astro add react`, which is exactly the command from the guide in the [@astrojs/react documentation](https://docs.astro.build/en/guides/integrations-guide/react/).

## So, what exactly happens here?

From the error, we could see that somewhat the package `@vitejs/plugin-react` can't find `vite`. Curious, right? Now let's inspect the `package.json` of `@vitejs/plugin-react` deeper. Is the `vite` dependency not included in the `package.json`?

```json
{
  // ...
  "dependencies": {
    "@babel/core": "^7.22.20",
    "@babel/plugin-transform-react-jsx-self": "^7.22.5",
    "@babel/plugin-transform-react-jsx-source": "^7.22.5",
    "@types/babel__core": "^7.20.2",
    "react-refresh": "^0.14.0"
  },
  "peerDependencies": {
    "vite": "^4.2.0"
  }
}
```

OK, it seems like `vite` is defined in the `package.json`, but as `peerDependencies`. Now, what is `peerDependencies`? According to the [npm documentation of peerDependencies](https://docs.npmjs.com/cli/v9/configuring-npm/package-json#peerdependencies), it is a field in `package.json` that specifies list of dependencies that the "host project" that installs the library should include.

Alright, with that in mind, we will ask, "Who installs this `@vitejs/plugin-react`?" Since this error only started happening after we install `@astrojs/react`, we can be sure that it's the culprit. So, let's inspect the `package.json` of `@astrojs/react`.

```json
{
  // ...
  "dependencies": {
    "@vitejs/plugin-react": "^4.0.4",
    "ultrahtml": "^1.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.21",
    "@types/react-dom": "^18.2.7",
    "chai": "^4.3.7",
    "cheerio": "1.0.0-rc.12",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "vite": "^4.4.9",
    "astro": "3.2.3",
    "astro-scripts": "0.0.14"
  },
}
```

Okay, so it defines `@vitejs/plugin-react` as `dependencies` and `vite` as `devDependencies`. What does this mean? This means that, when we're installing from the package registry (e.g. npm registry), it will install `@vitejs/plugin-react` and `ultrahtml`, but not the rest deifned in `devDependencies`. This is because `dependencies` are "transitive" dependencies, which is installed at all times, whereas `devDependencies` will only be installed when we're developing the package in our local machine.

So, that's the answer to why `vite` is not defined, because we don't actually install it.

## So, is the solution simply just to install `vite` in our host project?

Yes, installing `vite` on the host project seems to do the trick, as could be seen [in this sandbox](https://codesandbox.io/p/sandbox/astro-yarn-pnpm-with-vite-installed-zr86mz?file=%2Fpackage.json%3A7%2C26), the Vite-related error doesn't show up anymore. However, this seems to fix only if we're working on a single-repo setup. What if we are using monorepo?

For monorepo, it's more tricky. ...

https://codesandbox.io/p/sandbox/astro-yarn-pnpm-fixed-wdlc28?file=%2Fastro.config.mjs
https://codesandbox.io/p/sandbox/astro-yarn-pnpm-77y7pf?file=%2Fpackage.json%3A1%2C1