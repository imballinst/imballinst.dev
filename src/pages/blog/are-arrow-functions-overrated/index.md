---
templateKey: blog-post
title: Are arrow functions overrated?
date: 2021-04-25T04:52:53.642Z
featuredpost: false
featuredimage: images/nick-fewings-zF_pTLx_Dkg-unsplash.jpg
visibility: public
description: I think they are really useful, but sometimes they are just overused in the defense of "it's shorter".
tags:
  - software engineering
  - javascript
---

![<span>Photo by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/images/things/arrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a></span>.](images/nick-fewings-zF_pTLx_Dkg-unsplash.jpg)

Hello, it's the tech side of me again! It has been awhile, my latest tech-related post here was ["JSDoc, a Stairway to TypeScript"](https://peepohappy.id/blog/jsdoc-stairway-to-typescript), which was almost 10 months ago? Anyway... in this post, I'm going to write something about [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

## What is arrow function expression?

According to the MDN Docs, arrow functions are _"a compact alternative to a traditional function expression, but is limited and can't be used in all situations"_. So, it **can** replace normal function expression in _some_ conditions. What are the examples?

```ts
// Normal function expression.
function sum(a: number, b: number) {
  return a + b;
}

doSomething(function(result) {
  console.log(result);
});

// Arrow function expression equivalent.
const sum = (a: number, b: number) => a + b;

doSomething(result => {
  console.log(result);
});
```

Cool, right? Sure! Why not? It's compressing 3 lines of a simple function into one line, who doesn't love that? Also, when it comes to unnamed functions (usually callback functions), we can cut the `function` syntax. Alright, what's next? Let's see—have you ever gotten stuck in a `this` situation?

```ts
const obj = {
  a: 0,
  b: 0,
  print() {
    console.log(this.a, this.b);
  }
};

const obj2 = {
  a: 0,
  b: 0,
  print: obj.print
};

obj.a = 1;
obj.b = 2;

obj2.a = 5;
obj2.b = 6;

obj.print(); // 1, 2
obj2.print(); // 5, 6
```

Now, what happens here? We assign the function `obj.print` to `obj2.print`. By logic, the function should print "1, 2" because the function is contained within `obj`, right? Turns out it doesn't, because the function is called within another context. To try out this behavior, visit this [TypeScript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBCBGArGBeGBvAUDHMCGAXDAAwA02u8RZFOADgE4CWYUAFAJQa246iQgANgFMAdIJABzNlAAWTCKLykYchaPgcA3DwC+mXTsz9ocJACZU3XoRLleVOz0YsoRBIlEvWBzJg9KVgCMOgHwVuZGHuaBaACsoRYaVgBsUUhezKyciYgx3uzaQA).

In the above's case, when we called `obj.print()`, the context was `obj`. However, when we call `obj2.print()`, the context was `obj2` (although it was the same function—we can check with `obj.print === obj2.print`). If you once used React class components, you probably encountered this a lot when handling events.

```tsx
class App extends React.Component {
  constructor() {
    this.state = { counter: 0 };
  }

  handleClick(e) {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        <span>{this.state.counter}</span>
      </div>
    );
  }
}
```

The code above won't work with the same reason. When `handleClick` is called by the event from the button, it does NOT have `this` variable. Hence, there will be an error because we can't call `setState` from something that's `undefined`. How to fix these 2 cases?

```diff-ts
// Use explicit `bind`.
const obj2 = {
  a: 0,
  b: 0,
  print: obj.print
};

+ obj2.print = obj.print.bind(obj2.print);

// Use arrow expression.
const obj2 = {
  a: 0,
  b: 0,
-  print: obj.print
+  print: () => obj.print()
};
```

The same goes for the React example:

```diff-tsx
// Use explicit `bind`.
class App extends React.Component {
  constructor() {
    this.state = { counter: 0 };
+    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        <span>{this.state.counter}</span>
      </div>
    );
  }
}

// Use arrow expression.
class App extends React.Component {
  constructor() {
    this.state = { counter: 0 };
  }

-  handleClick(e) {
+  handleClick = (e) => {
    this.setState({
      counter: this.state.counter + 1
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>Increment</button>
        <span>{this.state.counter}</span>
      </div>
    );
  }
}
```

Now they work, yay! The arrow expression in my opinion is better in this case because it's shorter, as instead of needing to write the whole function name and `.bind`, we just need to add 6 characters (with the spaces).

## Caveats

There are some caveats, however, such as this case when we [call a function above of its declaration](https://www.typescriptlang.org/play?#code/BYUwNmD2AUCUDcAoUFICY5MQY0gOwGcAXAAhShIF4S4qA+Egb0RNZN0MjBADooBzaAHIA7pABOYACZDYiAL6JEAMwCuebEQCW+MuCgZYTFmw4EuvAcLGSZc+UA) (in the code):

```ts
hello();
hello2();

const hello = () => {
  console.log('world');
};

function hello2() {
  console.log('world');
}
```

Guess which one contains error in strict mode? That's right, the first `hello` call will! The error is `Block-scoped variable 'hello' used before its declaration`. This is because variable declarations such as `var`, `let`, and `const` only work after they are declared, whereas `function` declaration can be called anywhere in the file as long as they have been declared.

This is particularly useful if we want to organize local helper functions in a file. When some helper functions are only used in one file, perhaps separating them to a different file is not always the best solution, because (1) they litter the "auto-import" suggestions and (2) the number of files that we must navigate increases. Although, sure, it depends on each project and its maintainers. As for myself, when the helper functions and/or composing React components are not that big, I tend to put them all in one file for the reasons above. However, when they are getting bigger, then separating them into two or more files is surely an option.

## Myth debunking

Now that we have covered some of the advantages and disadvantages of using arrow function expression, let's debunk some myths that lots of people seem to believe.

### Arrow functions are shorter

Well, yes, as I have written above, arrow functions can surely be shorter if the function is a one-liner or is used for a callback function. But, consider this case:

```ts
function handleSubmit(e: React.FormEvent) {
  try {
    // Update...
  } catch {
    // Catch error...
  }
}

const handleSubmit = (e: React.FormEvent) => {
  try {
    // Update...
  } catch {
    // Catch error...
  }
};
```

The normal function expression uses 4 less characters (108) than the arrow function expression one (112). So, it's not _always_ shorter. The funny thing is, there are people who spread propaganda about lesser line of codes, yet they use arrow function expressions without knowing the context. Isn't that ironic?

### Arrow functions are better

I agree for the reasons that I have written above, such as for function binding purposes and one-liner functions. They are great for these 2 cases, at least. However, for other cases... I don't think so. They use more characters, they must be declared before the line that calls it... so, yeah.

## Closing words

There are more about arrow function expressions that I don't cover in this post. Please visit the MDN Docs for more information—it's worth the read. Lastly, if you frequently say that "arrow functions are shorter" and you are using it 24/7, hopefully this post can make you turn to the right path 😛. If you have comments or feedback about this post, feel free to mention or send me a DM on Twitter. Thanks for reading!
