---
title: 'TypeScript: Part 1, Discriminated Union'
description: Let's do a quick review of TypeScript basics and some bits beyond that you might use often.
publishDate: 2025-01-19T01:07:00.000Z
image: /assets/blog/speedrunning-typescript/speedrunning-typescript.png
imageAlt: An image containing the text, "Speedrunning TypeScript".
imageCaption: An image containing the text, "Speedrunning TypeScript".
tags: software engineering, javascript, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hi! Hope you are doing well. This post is a continuation of the previous [Speedrunning TypeScript](./speedrunning-typescript.md) post. If you haven't read that yet, I recommend checking that out, especially the part about TypeScript generics. Let's start it out by revisiting discriminated union.

## Discriminated union

```ts
interface StructOne {
  hello: string;
}

interface StructTwo {
  world: string;
}

function isValidStruct(value: StructOne | StructTwo) {
  // The `value` here will not have an autocomplete
}
```

In the code snippet above, we know that `value` will not have an autocomplete, because TypeScript does not have a way to know whether the value is of type `StructOne` or `StructTwo` (unless you use something like [zod](https://github.com/colinhacks/zod)). A way to have autocomplete here is by using discriminated union, which is a "common ground" between the two types.

```ts
interface StructOne {
  kind: 'struct-one';
  hello: string;
}

interface StructTwo {
  kind: 'struct-two';
  world: string;
}

function isValidStruct(value: StructOne | StructTwo) {
  if (value.kind === 'struct-one') {
    return value.hello;
  }

  return value.world;
}
```

With the above set up, we can determine the type inside a function during build time. An example on discriminated union that we might often use is [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled).

## What we can do with functions returning unions

With us refreshed on discriminated unions, let's revisit on function that returns unions, example as follows, which you can also see in [TypeScript Playground](https://www.typescriptlang.org/play/?#code/KYOwrgtgBAKgngB2DA9gJWAFzAJxFAbwFgAoKcqAZRjQEkA5AcQBpSKp6BVAWQCEBRNKzIUA8rwBS-AMIxSAX1KkAZmBABjTAEsU+TMADOmAGJrNOkAApMiYAC5Yt1Bmx4AlITYUDAdy2Z1AAsoa1sPYhF2cnUAQwNgRyRnLFwQADouPkEHHBS8KABGLyioWPjE5HQ89Oo6JhzqqAByAqbiqEUSdtzXfAIoQOAAGyGUBwKAJgBmDoUlEnVdIygANxihsASAXih9I1MNbV1LeCSq3oyeATQ3UgB6O6gAPSfCqAAfKAAiAq+PwgGw1GDnAEAARsAcABuDpAA).

```ts
enum TypeToReturn {
  STRING,
  NUMBER,
  OBJECT
}

function testFunction(type: TypeToReturn) {
  switch (type) {
    case TypeToReturn.NUMBER:
      return Math.random();
    case TypeToReturn.STRING:
      return Math.random().toString();
  }

  return { hello: 123 };
}

const value = testFunction(TypeToReturn.NUMBER);
// ^ string | number | { hello: number; }
```

The above is just not good, right? Because despite we pass `TypeToReturn.NUMBER` as the function argument and we **know** that it _should_ return a `number`, but TypeScript thinks that all the values are of equal union. So, how do we make sure TypeScript returns the expected type? The clue is inside a very good post by Kent C. Dodds: [Inversion of Control](https://kentcdodds.com/blog/inversion-of-control).

## What does this inversion thing do, anyway?

Let's take an example of the function in the snippet above. It receives a `type` parameter, which it expects to return a value of the same type. It's like we are "hiding" the function behind a magic box: _"Here, I give you a `number` argument. Now, do what you want with it and make sure it returns a `number`"_. Something like that.

Based on the "Inversion of Control" article above, we should "lift up" the logic to the function parameter. Let's try it! Here's the [playground link](https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABFApgZygMXNeYAUEARgFyL4CUiAvAHyIYBOMYA5ogD6JggC2RKRp0RwiAKxTQqAbwCwAKESJGKKCEZJilBQF8FCiAgyIAbgEMANiBQ1k6LDlgJ8lGvQDkARgBMAZncUANwKAPQhiAB6DFDMbMI8-ILCohLQQA).

```tsx
function testFunction(cb: () => string | number | object) {
  return cb();
}

const value = testFunction(() => '123');
// ^ string | number | object
```

So, what we did above is to change the logic inside the function to be in the function argument instead. However, the result is not as we want it to be yet. Well, when we want a function to be "dynamically typed", what do we use? That's right, generics!

```ts
function testFunction<ReturnType>(cb: () => ReturnType) {
  return cb();
}

const value = testFunction(() => '123');
// ^ string
const value2 = testFunction(() => 123);
// ^ number
const value3 = testFunction(() => ({ hello: 123 }));
// ^ { hello: number; }
```

As we see above, using TypeScript generics, we can have TypeScript to detect the correct return type according to what we "feed" to the function. I know, I know, the example above is a very contrived one. I have an example of what we might use pretty often. Check this out! Also, again, here's the [playground link](https://www.typescriptlang.org/play/?target=7#code/GYUwLgxgFgSiDOB7ArgJwggFASgLACgCBDeATwDsIACYZSsAS0XJvGjiTQ3hyoG8CVKhGbwwVANoA3IgBtkIAMphUDcgHMANFRnyQAOWQBbAEYhU23QoDyJgFYgIYALpUAvFSIB3Ig3EAFVEQjBngQADo5WUVwMFkQABNMCUEhVkgoAEFZWQ4UdARrYAAVUgAHEExQDLyuJRU1dWxNVKFq6GzchHzuItKKqrZYbrrDU3Nm1vSOnNqC+D7yyvbhzgLbBydJ-CFnbABuAlSRciR48NlEdUwretUNSzkFMbMLHSeQDccwPHwAXyO+DUYHMwCIGCoADEhhwyqIQP0QAAeAAiRDARERAD5+KkEuiiAAuKhojGIiTOQ47KhlIjqRrEvhUcggAAeYCKwDCYGJ5GMr32VCgJH0bJ5VBMiEQ8SILD+VIBhHwJAo1Fo9CYLBWnTmvRKSyRqVJmKWLWpcDAaHIiKoYpA5AS8ChMIQcNOCINxuxBCxmAgJmJmEQwC54F5-Im7hxgWCoWRFqt2OwuOpJzEnhyxuJXqWFPckkpqXi4mF8FF7PzKgUVKExeZYs53PzAAYqakvFAGPEqJhS+Wfim0sJROImfiMdpafSNFQ-vnvL5xP7MCz2Y3wAcpmnpRE1MBEJhx0RJ3TGr8h1MosbwmVkPAoJhwk+j5vqUI+2L81PGuEP+ya2kq4ciGTYeN+GjhEB65gABiqpKg4BWhmsjGgqgLqk4mrTKsPR3I0QYgWGzIRqg2DEjGIRhEi0I1K68KIkiYj3OoWI4gI1IIZaqAsCyXhUBRcaYJgCHwMmbhsVM3LFAwRggCgYBCWJElvmkaYliKn4eMGobiEiVAAMyAkOQgiZgfBHsSEgAOQAIwAEz6VZzgntO6iMvWa6EeKf7iAA-FQ2lNgA1FQNlUMSgXgNoPmzn8r5Dn82gAKzNs28Wzq+cH4BhjDMNhuoGCRBE6eG4ykeRQSUciNHsHR7oMXyZWsYOVCcUhvH8ZVgnCQgSktUIUkyXJyAKbw4n9apI5ChpFZaV5VB6YZSrGa1WDmQSln2fpzk0qeGjuVBXnEjF-mReIIVhRFXnRTN4h-HFAFCIlVApWlsGZehdCYXlKwFV8TjFdypWvGRnWxlRNWrG6YQMUyUAgDkiDA+Ys7NexJmIdx9Z8QJYRCSJfXo2kg2yfJilRhNQhqdNZaaQF82LUZxmmetGKWXDCOXMSW2zjt4FufwHnASVNP9lQp3zRd4X0zpN20xW93pU9yWpelD0EH8QA).

```ts
fetchResources();

async function fetchResources() {
  const [valueString, valueNumber, valueObject] = await Promise.allSettled([
    fetchAllResourcesOfType(fetchResourceString),
    fetchAllResourcesOfType(fetchResourceNumber),
    fetchAllResourcesOfType(fetchResourceObject)
  ]);

  console.log(valueString, valueNumber, valueObject);
}

interface FetchResponseType<DataType> {
  data: DataType[];
  paging: { nextOffset: number; hasNext: boolean };
}

async function fetchAllResourcesOfType<
  DataType,
  ReturnType extends FetchResponseType<DataType>
>(cb: (offset: number) => Promise<ReturnType>) {
  const allData: DataType[] = [];
  let hasNext = true;
  let nextOffset = 0;

  while (hasNext) {
    const { data, paging } = await cb(nextOffset);
    console.info(data, paging);

    allData.push(...data);
    hasNext = paging.hasNext;
    nextOffset = paging.nextOffset;
  }

  return allData;
}

function fetchResourceString(
  offset: number
): Promise<FetchResponseType<string>> {
  return new Promise((res) => {
    setTimeout(() => {
      const hasNext = offset < 3;

      res({
        data: ['123'],
        paging: { nextOffset: hasNext ? offset + 1 : offset, hasNext }
      });
    }, 500);
  });
}

function fetchResourceNumber(
  offset: number
): Promise<FetchResponseType<number>> {
  return new Promise((res) => {
    setTimeout(() => {
      const hasNext = offset < 3;

      res({
        data: [123],
        paging: { nextOffset: hasNext ? offset + 1 : offset, hasNext }
      });
    }, 500);
  });
}

function fetchResourceObject(
  offset: number
): Promise<FetchResponseType<{ hello: number }>> {
  return new Promise((res) => {
    setTimeout(() => {
      const hasNext = offset < 3;

      res({
        data: [{ hello: 123 }],
        paging: { nextOffset: hasNext ? offset + 1 : offset, hasNext }
      });
    }, 500);
  });
}
```
