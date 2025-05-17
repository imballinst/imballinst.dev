---
title: 'TypeScript: Part 2, Declarations'
description: This post contains a bit about TypeScript declarations.
publishDate: 2025-05-17T08:05:38.951Z
image: /assets/blog/typescript-part-2-declarations/typescript-part-2-declarations.png
imageAlt: 'An image containing the text, "TypeScript: Part 2, Declarations".'
imageCaption: 'An image containing the text, "TypeScript: Part 2, Declarations".'
tags: software engineering, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Yo! How is it going? I hope you are doing well. In this post, I am going to share a bit about TypeScript declarations. In case you missed Part 1 about discriminated unions, [have a look here](./typescript-part-1-discriminated-unions.md).

## What are TypeScript declarations?

As we know, TypeScript allows us to define types where otherwise we would need to rely on [JSDoc](https://jsdoc.app). We can define `type`, `interface`, and assign those types to variables. But, all that happens in _our_ source code is within our control. How about the dependencies that reside in `node_modules`?

At the moment, source code that contains logic inside `node_modules` is expected to only contain JavaScript files: `.js` or sometimes, `.cjs`. By "logic", it means the files have exported variables, functions, or classes. We can't import `.ts` files inside `node_modules`, because that would mean the module needs transpilation. If you were around when `babel-jest` was a thing, it was [something like this](https://github.com/jestjs/jest/issues/11753#issuecomment-900595695), where `import` and `export` were still the "next gen" and needed to be transpiled first to `require`. The same thing with TypeScript here--even more so because Node.js can't run TypeScript... [until recently... in Node 22](https://nodejs.org/en/learn/typescript/run-natively). Then again, it's still experimental.

This is where the TypeScript declarations come in: to provide the types when we import the dependency. Consider this [example in TypeScript playground](https://www.typescriptlang.org/play/?#code/KYDwDg9gTgLgBAMwK4DsDGMCWEVwBbAA2hEAFAJQBccKSAtgEbBRwDeAsAFBw9xTAwkUXAEYATAGYA3FwC+XLsnRYccGMADOMCtVqNmbLrz4ChoyTM6ygA):

```ts
export function hello() {
  return 123;
}

function test() {
  return 123;
}
```

The JS output is as follows:

```js
export function hello() {
  return 123;
}
function test() {
  return 123;
}
```

Whereas the declaration--the `.d.ts` output--is as follows:

```ts
export declare function hello(): number;
```

Notice that the JS output is without the function return type, whereas the declaration contains it. This `.d.ts` file is the thing that we will explore more. Let's dive into it!

## Ways to define a declaration

So, I have prepared a repository here for the examples: https://github.com/imballinst/typescript-declaration-playground.

### In the same package

If you are publishing a package to the npm registry, it is most recommended to publish the declaration files together with the package. Why? Because it makes it more reliable for the package users, they know the maintainer will update the types together along with the source, especially if the source code is in TypeScript already.

It's very easy these days to output bundles from TypeScript files; [tsup](https://github.com/egoist/tsup) is usually my go-to. Just run the thing, and it will emit the JavaScript files and the declaration files. In the example repository, we do not do this to keep it simple. From the output of `tsup`, we specify these 2 fields (at least):

```json
{
  "name": "sub-module-1",
  "packageManager": "yarn@4.9.1",
  "main": "index.js",
  "types": "index.d.ts"
}
```

So, what's the deal with the declaration files sharing the same `index` file? This is so that the engine can "derive" the types used for the said file. Imagine the process is like this:

1. Import `index.js`
2. Does it have `index.d.ts`?
  1. Yes: import it and "map" all types inside it to variables in `index.js`
  2. No: do nothing

This is consistent with the default behavior of `tsc` (which is built-in if you install `typescript` as a dependency in the project). Let's say you have this folder structure:

```
<root>
└──src
 ├── index.ts 
 ├── hello.ts
 ├── world.ts
 └── other.ts
```

If `index.ts` re-exports all exported stuff from all other `.ts` files, when we do `tsc index.ts --outDir dist --declaration` (and assuming it outputs it to `dist`), this will be the result:

```
<root>
├──dist
│  ├── index.js 
│  ├── index.d.ts 
│  ├── hello.js
│  ├── hello.d.ts
│  ├── world.js
│  ├── world.d.ts
│  └── other.js
│  └── other.d.ts
└──src
 ├── index.ts 
 ├── hello.ts
 ├── world.ts
 └── other.ts
```

It will also behave the same. When `index.js` [that re-exports all other files] is imported, it will also be able to find the declarations from other files.

### Via @types/* npm package

The second approach is using the `@types/*` dependency. This is usually when the original package maintainer(s) do not maintain the source with TypeScript, so folks contribute to a repository called https://github.com/DefinitelyTyped/DefinitelyTyped, which contains the typing for that dependency.

Every folder under the top-level `types` folder will be published to the npm registry as `@types/*`. For example, `types/node` will be published as `@types/node`. If the package name is published under an organization, such as `@hello/world`, then the published package name will be `@types/hello__world`. The `package.json` will only contain the `types` field (no `main` field). For example:

```json
{
  "name": "@types/sub-module-1-without-dts",
  "packageManager": "yarn@4.9.1",
  "types": "index.d.ts"
}
```

### Reference types

Lastly, types can also be imported with a `.d.ts` file. An example is the file that vite uses, usually residing in `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

This will import the file `node_modules/vite/client.d.ts`, which contains things like the following, which allows importing file extensions without needing to set up loaders or linters (because otherwise IDE/TypeScript will complain TypeError as we are importing something from a non-JS file).

```ts
declare module '*.module.css' {
  const classes: CSSModuleClasses
  export default classes
}
declare module '*.module.scss' {
  const classes: CSSModuleClasses
  export default classes
}
// and so on...
```

## Comparison of the ways above

You can see the example in this file: https://github.com/imballinst/typescript-declaration-playground/blob/main/packages/main-module/index.js.

```ts
import { withdts } from "sub-module-1";
import { withoutdts } from "sub-module-1-without-dts";
import { hellotsc, worldtsc, othertsc } from "sub-module-2-tsc";
```

The first import contains both `main` and `types` in the `package.json`, which means the IDE can infer the types.

```ts
(alias) function withdts(condition: boolean): {
  type: "string";
  value: string;
} | {
  type: "number";
  value: number;
}
import withdts
```

The second import contains only `main` in the `package.json`. However, it does have `@types/sub-module-1-without-dts`, so the IDE can infer the types all the same. You can try removing the `@types/sub-module-1-without-dts` and notice that the IDE can't infer the types as good as compared to if we have the types package.

```ts
(alias) function withoutdts(condition: boolean): {
  type: "string";
  value: string;
} | {
  type: "number";
  value: number;
}
import withoutdts
```

Lastly, the third import contains both `main` and `types`, but it re-exports all other functions.

```ts
(alias) function hellotsc(): 123
import hellotsc
```

```ts
(alias) function worldtsc(): "123"
import worldtsc
```

```ts
(alias) function othertsc(): {
  readonly type: "string";
}
import othertsc
```

As we can see, all 3 methods above have the same result: the exported functions are properly typed.

## Ways to "patch" declarations

Now, what if we use a package with typings that are incorrect, or if we want to add some arbitrary field, but we want it to be strongly typed in our codebase? There are 3 approaches:

### Update the file directly

This is probably only fitting if the type is incorrect. Go to the source code repository or go to the DefinitelyTyped repository and fix the types directly, so that all other package users can take advantage of it.

### Locally patch the package

If it is either a bit long process for you or if the maintainers are not as active, you can use the shortcut by patching the package: https://www.npmjs.com/package/patch-package. If you are using these modern package managers, you won't need it because they have the same functionality to patch a package:

- https://pnpm.io/cli/patch
- https://yarnpkg.com/cli/patch

### Patch the export with declare module

Let's say that we want to add a field to the `Request` object from Node.js. We can do so by using `declare module`, or officially called as [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation). [Example is as follows](https://github.com/imballinst/typescript-declaration-playground/tree/main/packages/server).

```ts
import Koa from "koa";

const app = new Koa();

declare module "http" {
  interface IncomingMessage {
    // Add a new field called `hello`.
    hello: {
      world: string;
    };
  }
}

// The `hello` references below will be strongly typed.
app.use(async (ctx, next) => {
  ctx.req.hello = {
    world: "123",
  };
  return next();
});
app.use(async (ctx) => {
  console.info(ctx.req.hello);
  ctx.body = "Hello World";
});

app.listen(3000);
```

```
$ curl localhost:3000
Hello World
```

```
$ yarn dev
{ world: '123' } <-- logged after the curl above
```

## Closing words

So, yeah, there's that, all about TypeScript declarations and ways to patch them. Hopefully this post is useful, and I'll see you on the next one. Take care!