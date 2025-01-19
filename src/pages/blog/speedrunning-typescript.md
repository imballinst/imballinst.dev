---
title: Speedrunning TypeScript
description: Let's do a quick review of TypeScript basics and some bits beyond that you might use often.
publishDate: 2024-02-18T01:07:00.000Z
image: /assets/blog/speedrunning-typescript/speedrunning-typescript.png
imageAlt: An image containing the text, "Speedrunning TypeScript".
imageCaption: An image containing the text, "Speedrunning TypeScript".
tags: software engineering, javascript, typescript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hi! Hope you are doing well. In this post, I am going to do a quick review on TypeScript. Things that were written in this post came from my sharing session with my team on Friday, February 2nd where I talked about the same thing. I did the thing in the form of a real-time demo though (directly in IDE), so there were no presentations and all that.

With all that said and done, let's start!

## What's wrong with JavaScript?

So, what's wrong with JavaScript anyway, so that there is TypeScript? The answer is... nothing wrong with JavaScript. The language was perfect for websites that are used by browsers since it is a dynamically typed language and hence, it doesn't need to be compiled.

However, as technologies evolved, applications and websites became more complex. For a larger codebase, it _might_ be tough to maintain codes where you are not sure what is the "actual" value contained in a variable. On top of that, the behavior of JavaScript allows the assignation of a different type to the original defined, such as this:

```js
let a = 0;
a = 'hello';
```

This is, of course, allowed and valid in JavaScript. As long as the result suits your needs, it should be fine. What _might_ not be fine is, if someone else (that is not us) is confused about the variable's content. If we want to keep using JavaScript but want its features in our IDE (e.g. `TypeError` indicators), we can use the syntax `@ts-check` at the top of the file, so we give "order" to our IDE to type-check the file.

```js
// @ts-check
let a = 0;
a = 'hello';
// ^ Type 'string' is not assignable to type 'number'.
```

Nice and easy. We still use plain JavaScript, we don't need compilation, but we get TypeScript features to at least warn us in our IDE. If you need JavaScript to support a rather complex type, check out my other post: [JSDoc, a Stairway to TypeScript](./jsdoc-stairway-to-typescript).

## TypeScript basics

Alright, let's start with the basics. In TypeScript, we can "assign" a type to a variable, like the following.

```ts
let a: number = 0;
a = 'hello';
// ^ Type 'string' is not assignable to type 'number'.
```

But, often they are not needed. TypeScript is smart enough to derive the type if the type is a primitive type, such as string, number, or boolean. So the following is already enough.

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

The above works, but it's a bit tricky if there is an optional variable. Say, on top of the `hello` field, there should be an optional `test` field.

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

In the above example, notice that we are using `interface`. You might also know that a type can be defined by either `interface` or `type`. So, what's the difference between them?

There is no real difference in normal usage. _However_, `type` is typically used when we are using utility types (which is going to be explained in the next section). Consider this example:

```ts
type SampleType = Pick<{ hello: string; test?: string }, 'hello'>; // this will pick the "hello" field only.

// If we want to "force" use the interface, it's going to be longer.
interface SampleInterface
  extends Pick<{ hello: string; test?: string }, 'hello'> {}
```

Another difference is that, if we hover over `SampleType`, it will show the list of fields that we can use for `SampleType`, whereas for `SampleInterface`, it will only show `interface SampleInterface`. This means, if we are using `interface`, we can get a rather "cleaner" hover view compared to `type`.

So, by default, my rule of thumb is to use `interface` unless we need to use utility types.

## Union and intersection

Okay, so let's say that we want to "combine" two or more types together. How can we do it? There are 2 ways to do it in TypeScript: we can use union _or_ intersection. Before we go further, it's a good idea to learn [how union and intersection work in a Venn diagram](https://www.mathsisfun.com/sets/venn-diagrams.html).

The syntax of union is `|`. It might be easier to express the usage with examples.

```ts
type TestUnion = string | number | boolean;
// ^ type TestUnion = string | number | boolean

const isValidTestUnionType = (value: TestUnion) => true;

isValidTestUnionType(''); // no error
isValidTestUnionType(123); // no error
isValidTestUnionType(true); // no error
isValidTestUnionType({});
// ^ Argument of type '{}' is not assignable to parameter of type 'TestUnion'.
```

In the above example, we could see that in our IDE there is a TypeError when we do `isValidTestUnionType({})`. This is the power of union so that we can have multiple types as input. There is a catch, though. Union can be used as an "OR" operation for structs, too. For example:

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

In the `isValidStruct` function, if we type `value.`, then it will not provide field access suggestions. No `hello` and no `world`. This is because TypeScript does not detect "common fields" between them. So, to make `value` to be able to derive the actual fields, we need to add common fields to these 2 structs.

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

From the snippet above, notice that we added a common field called `kind`. Ensure that `StructOne` and `StructTwo` have different `kind`. With this approach, inside the `isValidStruct` function, we could check the value from `kind`. From there, TypeScript would be able to infer whether `value` is of type `StructOne` or `StructTwo`.

Now, let's get to type intersection. Type intersection can be done by using `&`. The example is as follows.

```ts
interface StructOne {
  hello: string;
}

interface StructTwo {
  world: string;
}

function isValidStruct(value: StructOne & StructTwo) {
  return value.hello;
  // or return value.world
}
```

Now, compared to type union, we don't need common fields to get the fields intersected by these two types, `StructOne` and `StructTwo`. All fields from those 2 types are "merged" and accessible without a `kind` field check. Much simpler than union, right?

With that in mind, here's the rule of thumb on when to choose union and intersection.

1. Use union when the semantic is "OR". For example, if we have a class such as "Fish" or "Cat", then we should use union.
2. Use intersection when the semantic is "AND". For example, when we want to merge all fields from the given types, then we should use intersection.

Well, that concludes the bits about union and intersection.

## Utility types

TypeScript has built-in utility types that can be useful. Let's explore them! For the full list, you can visit the [TypeScript docs](https://www.typescriptlang.org/docs/handbook/utility-types.html).

### Exclude

`Exclude` is used to remove a union value. This is useful if you want to narrow down a union type from a union.

```ts
type SampleUnion = 'hello' | 'world';
type OmittedWorld = Exclude<SampleUnion, 'world'>;
// ^ type OmittedWorld = "hello"
```

### Omit

`Exclude` is used to remove a field from a struct. This is useful if you want to create a new type with fewer fields compared to the original one.

```ts
interface SampleObject {
  hello: string;
  world: string;
}
type SampleObjectWithoutWorld = Omit<SampleObject, 'world'>;
// ^ type SampleObjectWithoutWorld = {
//     hello: string;
//   }
```

### Pick

`Pick` is the reverse of `Omit`. It takes a union of fields from the original object type.

```ts
interface SampleObject {
  hello: string;
  world: string;
}
type SampleObjectWithoutWorld = Pick<SampleObject, 'hello'>;
// ^ type SampleObjectWithoutWorld = {
//     hello: string;
//   }
```

### ReturnType

`ReturnType` is used to get the return type of a function. This is useful when you don't want to create an explicit return type for the function and you want to derive it from the function instead.

```ts
function sum(x: number, y: number) {
  return x + y;
}

type SumFunctionReturnType = ReturnType<typeof sum>;
// ^ type SumFunctionReturnType = number
```

### Record

`Record` is used to create key-value pairs.

```ts
const record: Record<string, string> = {};
record.a = 'b';
record.c = 1;
// ^ Type 'number' is not assignable to type 'string'.
```

Similarly, `Map` is also used to create a key-value map.

```ts
let map: Map<string, string>;
map = new Map<string, string>();
map.set('test', 'hello');
map.set('world', 1);
// ^ Argument of type 'number' is not assignable to parameter of type 'string'
```

### Partial

`Partial` is used to create all fields in an object type to be optional.

```ts
interface SampleObject {
  hello: string;
  world: string;
}
type SampleObjectWithoutWorld = Partial<SampleObject>;
// ^ type SampleObjectWithoutWorld = {
//     hello?: string | undefined;
//     world?: string | undefined;
//   }
```

### Required

`Required` is the opposite of `Partial`. It makes all fields required.

```ts
interface SampleObject {
  hello?: string | undefined;
  world?: string | undefined;
}
type SampleObjectWithoutWorld = Required<SampleObject>;
// ^ type SampleObjectWithoutWorld = {
//     hello: string;
//     world: string;
//   }
```

## Generic types

A way to understand generic types is to take examples from utility types in the previous section. A type is generic when it has the `<>` syntax. Inside the `<>` syntax, you can put a TypeScript type and it should match the type argument requirement, if any. Consider this example.

```ts
type IsString<TypeArg> = TypeArg extends string ? true : false;

type TestValue = IsString<string>;
// ^ true
type TestValue2 = IsString<number>;
// ^ false
```

In the snippet above, we create a generic type `IsString`, which accepts a type argument `TypeArg`. The type derives from `TypeArg`. If `TypeArg` extends the type string, then it will return `true`, otherwise `false`.

The `extends` keyword can also be used to detect parts of an object type. Take this example.

```ts
type IsFish<TypeArg> = TypeArg extends { swim(): void } ? true : false;

interface Fish {
  swim(): void;
}
interface Cat {
  walk(): void;
}

type TestValue = IsFish<Fish>;
// ^ true
type TestValue2 = IsFish<Cat>;
// ^ false
```

In the above example, we want to check if `TypeArg` is of type `Fish` or not. We do that by checking if the given object type has the method `swim`. As we can see above, `Cat` does not have the method `swim`, so the return type is `false`.

### Inferring type

With the `extends` keyword, we can also take advantage of the `infer` keyword. What is `infer`, exactly? The `infer` syntax is used to "extract" a value from another extended generic type. Take the following example.

```ts
type ExtractTypeFromPromise<TypeArg> = TypeArg extends Promise<
  infer PromiseType
>
  ? PromiseType
  : never;

async function test() {
  return 123;
}

type FunctionReturnType = ReturnType<typeof test>;
// ^ Promise<number>
type FunctionReturnTypeWithoutPromise =
  ExtractTypeFromPromise<FunctionReturnType>;
// ^ number
```

As we can see above, the `infer PromiseType` in `TypeArg extends Promise<infer PromiseType>` means it is extracting the `number` value from `Promise<number>`. This is the same result as the [utility type Awaited](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype).
