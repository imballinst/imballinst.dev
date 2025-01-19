---
title: 'TypeScript: Part 1, Discriminated Unions'
description: This post contains examples of how we can utilize the concept of discriminated unions in TypeScript.
publishDate: 2025-01-19T01:07:00.000Z
image: /assets/blog/typescript-part-1-discriminated-unions/typescript-part-1-discriminated-unions.png
imageAlt: 'An image containing the text, "TypeScript: Part 1, Discriminated Unions".'
imageCaption: 'An image containing the text, "TypeScript: Part 1, Discriminated Unions".'
tags: software engineering, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hi! Hope you are doing well. This post is a continuation of the previous [Speedrunning TypeScript](./speedrunning-typescript) post. If you haven't read that yet, I recommend checking that out, especially the part about TypeScript generics. Let's start it out by revisiting discriminated unions.

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

With the above setup, we can determine the type inside a function during build time. An example of a discriminated union that we might often use is [`Promise.allSettled`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled), where if the promise result is `fulfilled`, then there is `value` field, otherwise there is `reason` field.

## What we can do with functions returning unions

With us refreshed on discriminated unions, let's revisit the function that returns unions, example as follows, which you can also see in [TypeScript Playground](https://www.typescriptlang.org/play/?#code/KYOwrgtgBAKgngB2DA9gJWAFzAJxFAbwFgAoKcqAZRjQEkA5AcQBpSKp6BVAWQCEBRNKzIUA8rwBS-AMIxSAX1KkAZmBABjTAEsU+TMADOmAGJrNOkAApMiYAC5Yt1Bmx4AlITYUDAdy2Z1AAsoa1sPYhF2cnUAQwNgRyRnLFwQADouPkEHHBS8KABGLyioWPjE5HQ89Oo6JhzqqAByAqbiqEUSdtzXfAIoQOAAGyGUBwKAJgBmDoUlEnVdIygANxihsASAXih9I1MNbV1LeCSq3oyeATQ3UgB6O6gAPSfCqAAfKAAiAq+PwgGw1GDnAEAARsAcABuDpAA).

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

The above is just not good, right? Because despite that we pass `TypeToReturn.NUMBER` as the function argument and we **know** that it _should_ return a `number`, but TypeScript thinks that all the values are of equal union. So, how do we make sure TypeScript returns the expected type? The first clue is to force TypeScript to derive type as-is.

## Making TypeScript derive type as-is

By default, TypeScript will try to "generalize" the type of the variables we defined. Take this example, which you can access in this [Playground link](https://www.typescriptlang.org/play/?target=7#code/MYewdgzgLgBAhgJwXAnjAvDA2gRgDQwDkOhBA3jABYCmANrSAFww4BMAzDAL4C6AsACgA9EJgA9GAApoCAJZgA5jAA+MMAFcAtgCNqCFTACCSVAB4KNekzVbdCANzcAfAEogA):

```ts
const array = [1, '1', { hello: 123 }];
// ^ (string | number | Array<{ hello: number; }>)
```

Notice that TypeScript derives the values to be the most common type possible. What if we want TypeScript to derive the types as-is and not generalize them? We can use `as const` when defining the variable. Here's the [Playground link](https://www.typescriptlang.org/play/?target=7#code/MYewdgzgLgBAhgJwXAnjAvDA2gRgDQwDkOhBA3jABYCmANrSAFww4BMAzDAL4C68EMUJCgBYAFAB6CTAB6MABTQEASzABzGAB8YYAK4BbAEbUEWmAEEkqADwUa9JjoPGEAbm4A+AJTjxQ6NgAbnC0utQAcs4mBMGh1ADKUCrqMSFhAPKGAFbUwFB8mIjIKEA).

```ts
const array = [1, '1', { hello: 123 }] as const;
// ^ const array: readonly [1, "1", {
//     readonly hello: 123;
//   }]

const [valueNumber, valueString, valueObject] = array;
// ^ The type is 1, '1', and { hello: 123 }, respectively.
```

So, based on what we learned above, our objective is to make TypeScript "not generalize" the types returned from `testFunction`, so that each `testFunction` will return the the type that we want it to be, depending on the passed function arguments.

That's the first clue, but that's not enough. There is a second one, which you can explore in this very good post by Kent C. Dodds: [Inversion of Control](https://kentcdodds.com/blog/inversion-of-control).

## What does this inversion thing do, anyway?

Let's take an example of the function in the snippet above. It receives a `type` parameter, which it expects to return a value of the same type. It's like we are "hiding" the function behind a magic box: _"Here, I give you a `number` argument. Now, do what you want with it and make sure it returns a `number`"_. Something like that.

Based on the "Inversion of Control" article above, we should "lift" the logic to the function parameter. Let's try it! Here's the [playground link](https://www.typescriptlang.org/play/?#code/GYVwdgxgLglg9mABFApgZygMXNeYAUEARgFyL4CUiAvAHyIYBOMYA5ogD6JggC2RKRp0RwiAKxTQqAbwCwAKESJGKKCEZJilBQF8FCiAgyIAbgEMANiBQ1k6LDlgJ8lGvQDkARgBMAZncUANwKAPQhiAB6DFDMbMI8-ILCohLQQA).

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

As we see above, using TypeScript generics, we can have TypeScript detect the correct return type according to what we "feed" to the function. I know, I know, the example above is a very contrived one. I have an example of what we might use pretty often. Check this out! Also, again, here's the [playground link](https://www.typescriptlang.org/play/?target=7#code/GYUwLgxgFgSiDOB7ArgJwggFASgNwFgAoIgQ3gE8A7CAAmGWrAEtFK7xo4k0N4caA3kRo0IreGBoBtAG4kANshABlMKiaUA5gBoacxSAByyALYAjEKl36lAeTMArEBDABdGgF4aJAO4kmkgAKqIgmTPAgAHQK8srgYPIgACaYUsIi7JBQAILy8lwo6Ai2wAAq5AAOIJigWQU8Kmoamtja6SK10Ln5CIW8JeVVNRywvQ3G5pat7ZldefVF8AOV1Z2j3EX2Ti7Y6a54ROlilEiJkfKImpg2jepa1gpKExZWeo8gW85gB4QAvoeEDRgSzAEgYGgAMRGXAq4hAgxAAB4ACIkMAkBEAPkE6SSaJIAC4aKj0QipK4CIQRBUSJpmkSBDRKCAAB5gErACJgImUUwvXA0KBkQys7k0MyIRCJEhsX6U-7EQhkKi0eiMFhsNbdBb9MorRHpEkYlZtKk0OBgNCUBE0UUgShJeCQ6EIWEneH6o1YoiYzAQMxEzCIYCc8A8vlTTzY4KhcJIi1WrHYHFm44Sbx5I1EhOoa0rKQAcjx6IL7i85MpIkSkiF8BFbM8NDUSkrNGrTNFHK5jYADJT0j4oExEjRMLX698UxlROJJIziyRdDS6VoaL9G75-JJ-ZhmWyu+AfjMYkbIhVkPAoJhIjeFz9p+PRY3l81Io+2a2RHv2SHu14X1okTfgeYCtgq6SoOAVoZvIRrygCaouBqszrH0tzNJg6TBqGYq8pMqBENgRIxmEESIlCdSunCCKIhIdyaJi2JCGakGWrmHY+DQJFxpgmCQfAyYeExMxcqUTAmCAKBgLxgnCWa05pjWwpPl42HdoiNAAMz9vJGT8ZgzHTtOC5EoWACMABMmmlqaRkZABmgMh2+6-mGgrKQ2AD8NBqeANAANQ0GZNBEr5YC6O+kgKnZvz3hkvy6AArD2PZxbF8GKohzCsChOpGBGqCYWaYXhvhhHESEpFIhRnBUe6NF4S8jFTjQrHQcynHcREvH8bJLUiKJ4mScg0n8EJ-UZIp7l1ipPmuZIGnaQCdn6YZdk0CZ0iWZpri2etDlOcB81EpFNDeWFAVBSFc04RFHlRTMIjpTMCU0MlqVgT84GEFlyFrHlnwuEVIglUyBXlVxlVxuRLrwG6EQ0YyUAgHkiClS8a7NWtbXsR1kOxt1fEIH1a0DeAYkSVJMlRhNIhTadqnzTQi06StWCk0Zm1SEjKMXES21rrtj32bS9KCM5P44Sd91nTd3aBcFoXzXdM0NtFRnPbpr3vWlX1AA).

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
  const allData: ReturnType['data'] = [];
  let hasNext = true;
  let nextOffset = 0;

  while (hasNext) {
    const { data, paging } = await cb(nextOffset);

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

The long snippet above simulates the case where we want to fetch all entries from 3 different resources. Without inversion of control, the result will be like this:

```ts
const [valueString, valueNumber, valueObject] = await Promise.allSettled([
  // ^ PromiseSettledResult<string[] | number[] | { hello: number }[]>
  fetchAllResourcesOfType(fetchResourceString),
  fetchAllResourcesOfType(fetchResourceNumber),
  fetchAllResourcesOfType(fetchResourceObject)
]);
```

Whereas, with inversion of control, it is now a tuple:

```ts
const [valueString, valueNumber, valueObject] = await Promise.allSettled([
  // ^ [PromiseSettledResult<string[]>, PromiseSettledResult<number[]>, PromiseSettledResult<{
  //     hello: number;
  //   }[]>]
  fetchAllResourcesOfType(fetchResourceString),
  fetchAllResourcesOfType(fetchResourceNumber),
  fetchAllResourcesOfType(fetchResourceObject)
]);
```

The tuple here is important, because we know the first array element's promise settled value contains `string[]`, the second contains `number[]` and the third one contains `Array<{ hello: number }>`.

By doing this, you do not need weird dances such as `as unknown as SomeType` or `as any`. The best part of not using `any`? You don't have to redeclare the type somewhere else and you know it's surely type-safe (during build time, anyway).

## Summary

Alright, let's recap what we learn:

1. Discriminated union is used to "force" TypeScript to create a distinction between 2 or more types by creating a "common literal field".
2. TypeScript will generalize a variable's type unless the variable definition is suffixed with `as const` which then its type will be inferred as-is.
3. Inversion of control is used to "lift" the logic inside a function to the function argument, where the caller has more control.
4. By combining the concepts of as-is type inferring and inversion of control, we can achieve safer typing in our codebase.

Hopefully, that's useful, thank you for reading this far and I'll see you on the next post!
