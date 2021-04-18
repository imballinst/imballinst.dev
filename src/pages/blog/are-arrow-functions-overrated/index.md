---
templateKey: blog-post
title: Are arrow functions overrated?
date: 2021-02-23T07:14:56.835Z
featuredpost: false
featuredimage: images/dan-meyers-hluOJZjLVXc-unsplash.jpg
visibility: public
description: I think they are really useful, but sometimes they are just overused in the defense of "it's shorter".
tags:
  - software engineering
  - javascript
---

Hello, it's the tech side of me again! It has been awhile, my latest tech-related post here was ["JSDoc, a Stairway to TypeScript"](https://peepohappy.id/blog/jsdoc-stairway-to-typescript), which was almost 10 months ago? Anyway... in this post, I'm going to write something about [arrow function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

According to the MDN Docs, arrow functions are _"a compact alternative to a traditional function expression, but is limited and can't be used in all situations"_. So, it **can** replace normal function expression in _some_ conditions. What are the examples?

```ts
// Normal function expression.
function sum(a: number, b: number) {
  return a + b;
}

// `sum` in arrow function expression.
const sum = (a: number, b: number) => a + b;
```

Cool, right? Sure! Why not? It's compressing 3 lines of a simple function into one line, who doesn't love that? Alright, what's next? Have you ever gotten stuck in a `this` situation?

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

The code above won't work with the same reason. When `handleClick` is called by the event from the button, it does NOT have `this` variable. Hence, the application will crash because we can't call `setState` from something that's `undefined`. How to fix these 2 cases?

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

Now they work, yay! The arrow expression is better in this case because it's shorter, as instead of needing to write the whole function name and `.bind`, we just need to add 6 characters (with the spaces).
