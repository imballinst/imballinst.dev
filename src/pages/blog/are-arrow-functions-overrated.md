---
title: Are Arrow Functions Overrated?
description: I think they are really useful, but sometimes they are just overused in the defense of "it's shorter".
publishDate: 2021-04-25T04:52:53.642Z
image: /assets/blog/are-arrow-functions-overrated/nick-fewings-zF_pTLx_Dkg-unsplash.jpg
imageAlt: Photo by Nick Fewings on Unsplash.
imageCaption: Photo by <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/images/things/arrow?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>.
tags: software engineering, javascript
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello, it's the tech side of me again! It has been awhile, my latest tech-related post here was ["JSDoc, a Stairway to TypeScript"](https://imballinst.dev/blog/jsdoc-stairway-to-typescript), which was almost 10 months ago? Anyway... in this post, I'm going to write something about [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

## What is an arrow function expression?

According to the MDN Docs, arrow functions are _"a compact alternative to a traditional function expression, but is limited and can't be used in all situations"_. So, it **can** replace normal function expression in _some_ conditions. Let’s see some examples of it.

```ts
// Normal function expression.
function sum(a: number, b: number) {
  return a + b;
}

doSomething(function (result) {
  console.log(result);
});

// Arrow function expression equivalent.
const sum = (a: number, b: number) => a + b;

doSomething((result) => {
  console.log(result);
});
```

Cool, right? It's compressing 3 lines of a simple function into one line, who doesn't love that? Also, when it comes to unnamed functions (usually callback functions), we can replace the `function` syntax and use an arrow instead. Alright, what do we have next? Let's see—have you ever gotten stuck in a `this` situation?

```ts
// Let's say that we have an object that stores 2 variables and has a function
// that prints them.
const obj = {
  a: 0,
  b: 0,
  print() {
    console.log(this.a, this.b);
  }
};

// We have another distinct variable, but since the `print` function is the same,
// let's just try re-using the `print` object from `obj`.
const obj2 = {
  a: 0,
  b: 0,
  print: obj.print
};

// Assign values to all variables from both objects.
obj.a = 1;
obj.b = 2;

obj2.a = 5;
obj2.b = 6;

// Let's try to print them!
// But wait, why are the print results different?
obj.print(); // 1, 2
obj2.print(); // 5, 6
```

What happened here? We assigned the function `obj.print` to `obj2.print`. By logic, the function should print "1, 2" because it's the same function that we have within `obj`, right? Turns out it doesn't, because the function is called within another context. To try out this behavior, visit this [TypeScript playground](https://www.typescriptlang.org/play?#code/MYewdgzgLgBCBGArGBeGBvAUDHMCGAXDAAwA02u8RZFOADgE4CWYUAFAJQa246iQgANgFMAdIJABzNlAAWTCKLykYchaPgcA3DwC+mXTsz9ocJACZU3XoRLleVOz0YsoRBIlEvWBzJg9KVgCMOgHwVuZGHuaBaACsoRYaVgBsUUhezKyciYgx3uzaQA).

In the above's case, when we called `obj.print()`, the context was `obj`. However, when we called `obj2.print()`, the context was `obj2`, regardless of the fact that it was the same function which we can check with `obj.print === obj2.print`. Let's take another example. If you once used React class components, you probably encountered this a lot when handling events.

```tsx
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { counter: 0 };
  }

  handleClick() {
    // Increment the counter by 1.
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

To view the demo of the example code above, visit this [Codesandbox](https://codesandbox.io/s/blog-arrow-function-1-z847z) link. What will happen when we click the "Increment" button?

```
TypeError: can't access property "counter", this.state is undefined
```

What does this mean? One thing for sure, `this.state` is `undefined`. How come is it `undefined`? We can render it just fine in the `render` function using `this.state.counter`. Well, the truth is, `this` inside the `handleClick` is not within the `App` component scope. We can investigate this by doing `console.log(this)` inside the function and immediately we know that the `Window` object is printed instead of the `App` component. As far as I can understand, most (if not all) DOM events happen within the `Window` scope. With that out of the way, how do we fix it?

```tsx
// Use explicit `bind`.
class App extends React.Component {
  constructor() {
    this.state = { counter: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
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

// Use arrow function expression.
class App extends React.Component {
  constructor() {
    this.state = { counter: 0 };
  }

  handleClick = () => {
    this.setState({
      counter: this.state.counter + 1
    });
  };

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

Now they work, yay! The arrow expression in my opinion is better in this case because it's shorter. We don't need to write the whole function name and call`.bind`, we just need to add 8 characters (with the spaces).

## Caveats

There are some caveats, however, such as this case when we [call a function above of its declaration](https://www.typescriptlang.org/play?#code/BYUwNmD2AUCUDcAoUFICY5MQY0gOwGcAXAAhShIF4S4qA+Egb0RNZN0MjBADooBzaAHIA7pABOYACZDYiAL6JEAMwCuebEQCW+MuCgZYTFmw4EuvAcLGSZc+UA):

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

This is particularly useful if we want to organize local helper functions in a file. When some helper functions are only used in one file, perhaps separating them to a different file is not always the best solution, because they litter the "auto-import" suggestions (if you are using modern IDEs) and it increases the number of files that we must navigate.

Ultimately, it depends on each project and its maintainers. As for myself, when the helper functions and/or composing React components are not that big, I tend to put them all in one file for reasons above. However, when they are getting bigger, then separating them into two or more files is surely a better option.

## Myth debunking

In previous sections, we have covered some of the advantages and disadvantages of using arrow function expression. In this section, let's debunk some myths that lots of people seem to believe.

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

The normal function expression uses 4 less characters (108) than the arrow function expression one (112). So, it's not _always_ shorter. You might argue with, _"but, I'm not using TypeScript!"_ Even if we are not using TypeScript, the normal function expression character length still triumphs over the arrow expression one (91 to 93).

```js
function handleSubmit(e) {
  try {
    // Update...
  } catch {
    // Catch error...
  }
}

const handleSubmit = (e) => {
  try {
    // Update...
  } catch {
    // Catch error...
  }
};
```

The funny thing is, there are people who spread propaganda about the lesser line of codes the better, yet they use arrow function expressions without knowing the context (which adds more to the code than it should). Isn't that ironic?

### Arrow functions are better

I agree for the reasons that I have written above, such as for function binding purposes, one-liner functions, and callback functions. They are great. However, for other cases... I don't think so. They use more characters, they must be declared before the line that calls it... so, yeah.

## Closing words

There are more about arrow function expressions that I don't cover in this post. Please visit the MDN Docs for more information—it's worth the read. Lastly, if you frequently say that "arrow functions are shorter" and you are using it 24/7, hopefully this post can make you turn to the right path 😛. If you have comments or feedback about this post, feel free to mention or send me a DM on Twitter. Thanks for reading!
