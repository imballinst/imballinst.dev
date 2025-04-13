---
title: Revisiting Koa Middlewares
description: In this post, we will explore a bit about Koa.js middlewares, in particular about logging requests and responses.
publishDate: 2025-04-13T01:20:13.554Z
image: /assets/blog/revisiting-koa-middlewares/revisiting-koa-middlewares.png
imageAlt: An image containing the text, "Revisiting Koa Middlewares".
imageCaption: An image containing the text, "Revisiting Koa Middlewares".
tags: life
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, it's me again! I have been diving into [Koa.js](https://koajs.com/) middlewares and I found some interesting stuff, so I think it would be nice to document them in this post. The stuff that I looked into was primarily about logging. Here is the repository if you want to skip to the source instead: https://github.com/imballinst/koa-morgan-logs.

## What is Koa?

Koa.js is a Node.js framework, similar to https://expressjs.com. With it, we can easily create a server running without having to create the boilerplate from scratch. There are at least two big things that separates Koa and Express, which are:

### Sending responses

In Express, we send responses by using `res.send("Hello world")`, in which the `res` is Express' `Response` object. In Koa, we use `ctx.body = "Hello world"`, in which the `ctx` is Koa's context. [Find more information about Koa's context in this API document](https://github.com/koajs/koa/blob/master/docs/api/context.md).

### Middlewares

In Express, the middleware is synchronous, whereas in Koa, the middleware is asynchronous (returns a `Promise`). Take this example:

```ts
// Express
app.use((req, res, next) => {
  console.log('LOGGED');
  next();
});

// Koa
app.use((ctx, next) => {
  console.log('LOGGED'); // `next` returns a `Promise`
  return next();
});
```

## Logging and middlewares

Logging is an important part when we are running a service. Without logging, we can't really monitor how a service is doing, how many requests are going in, how many errors happened, and so on. In this section onwards, we will only do examples in Koa.

The goal that I wanted to achieve was to log the request and response body with [morgan](https://github.com/expressjs/morgan). So, before I got to using it, I broke it down into several steps while trying to understand how middlewares work. The incoming request will be made with this script:

```ts
const axios = require('axios');

async function run() {
  const response = await axios('http://localhost:3000', {
    method: 'post',
    data: {
      userId: '123'
    }
  });

  console.info(response.data);
}

run();
```

### Good old `console.log`

Before using `morgan`, I wanted to know first how middlewares behave. In the example below, I tried logging the response body before and after the `await next()` is called. Recall that the Koa middleware returns a `Promise`, so it makes sense to make it an `async` function because a function that is prefixed by `async` automatically returns a `Promise`.

```ts
const Koa = require('koa');
const { bodyParser } = require('@koa/bodyparser');

const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log('hello', ctx.request.body, ctx.body);
  await next();
  console.log('hello', ctx.request.body, ctx.body);
});

app.use((ctx) => {
  ctx.status = 200;
  ctx.body = { message: ctx.request.body };
});

app.listen(3000);
```

In the example above, the result will be as follows:

```
hello { userId: '123' } undefined
hello { userId: '123' } { message: { userId: '123' } }
```

As we can see from the result above, the first `console.log` will not be able to log the response body, because when it is called, `ctx.body` hasn't been set yet. Conversely, this means the second `console.log` is executed only after all middlewares are done.

Now that normal logging works, let's try integrating `morgan` into it.

### With `morgan`

There are two ways to do it. First things first, we have to import the `morgan` package first and set up the tokens.

```ts
const morgan = require('morgan');

morgan.token('requestBody', (req) => {
  return JSON.stringify(req.body);
});

morgan.token('responseBody', (_, res) => {
  return JSON.stringify(res.body);
});
```

Now, we can either put it before the `next()` call or after it. Let's explore both ways.

#### Before `next()`

We want to jump a bit to how `morgan` works. Take a look at [this snippet of morgan's source code](https://github.com/expressjs/morgan/blob/master/index.js#L133-L144).

```ts
if (immediate) {
  // immediate log
  logRequest();
} else {
  // record response start
  onHeaders(res, recordStartTime); // log when response finished

  onFinished(res, logRequest);
}

next();
```

What the above means is that we have an `immediate` option that we can pass when we initialize `morgan` middleware. When that is passed, the request is logged immediately, but if not, then the request will be logged only after the response is finished. The `onFinished` function is based on the [on-finished package](https://www.npmjs.com/package/on-finished).

By using the above understanding, we can do the following:

```ts
const logger = morgan(':date :requestBody :responseBody');

app.use((ctx, next) => {
  logger(ctx.request, ctx.response, () => {});

  return next();
});
```

When the request is made, it will log the following.

```
Sun, 13 Apr 2025 00:57:29 GMT {"userId":"123"} {"message":{"userId":"123"}}
```

#### After `next()`

Similarly, we can also do this:

```ts
const logger = morgan(':date :requestBody :responseBody', {
  immediate: true
});

app.use(async (ctx, next) => {
  await next();

  logger(ctx.request, ctx.response, () => {});
});
```

When we make the request, it will provide the same result:

```
Sun, 13 Apr 2025 00:57:29 GMT {"userId":"123"} {"message":{"userId":"123"}}
```

### Cleaning things up

Based on the attempts before, we can clean things up a little bit to this:

```ts
const logger = morgan(':date :requestBody :responseBody');

app.use((ctx, next) => {
  return new Promise((resolve) => {
    logger(ctx.request, ctx.response, resolve);
  }).then(next);
});
```

This allows the middleware to still return a `Promise` while allowing the `morgan` logger to chain with the `next` call naturally. The request will still be correctly logged.

```
Sun, 13 Apr 2025 01:16:50 GMT {"userId":"123"} {"message":{"userId":"123"}}
```

I happened to also find a flaw in the `@types/morgan` package.

```ts
type Handler<
  Request extends http.IncomingMessage,
  Response extends http.ServerResponse
> = (req: Request, res: Response, callback: (err?: Error) => void) => void;
```

If we check the `morgan` implementation, the third parameter `next` is always called without an argument, so the `callback` here will always be called with an `undefined` parameter. Also, the name should be `next` instead of `callback`, I suppose.

## Recap

Okay, let's recap what we have discussed so far:

1. `morgan` internally uses the `on-finished` package, allowing it to listen to when a response's write buffer has been closed or not.
2. Koa middlewares return `Promise`.
3. `await next()` can be used to "defer" the remaining line of code in the middleware to later stages.
4. The package `@types/morgan` returns an invalid type for the `Handler` function.

That's all for now. Hopefully, this post is useful. Thank you for reading and take care!
