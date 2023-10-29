---
title: Creating a Context-less Data Store in React
description: A small tutorial on creating a subscribe-based data store in React.
publishDate: 2023-01-28T16:05:39.185Z
image: /assets/blog/creating-data-store-react/blogpost-background-contextless.png
imageAlt: An image with the text "Creating a Context-less Data Store in React" at the center.
imageCaption: An image with the text "Creating a Context-less Data Store in React" at the center.
tags: software engineering
visibility: public
layout: '../../layouts/BlogPost.astro'
---

Hello! It's me again. This time I'm going to share a bit about my experimentation in creating a subscribe-based data store in React.

Now, you might have heard of [redux](https://github.com/reduxjs/redux) before. Yes, it's a framework-agnostic state management, although I think it was originally popular because of its usage with [react](https://github.com/facebook/react), namely the [react-redux](https://github.com/reduxjs/react-redux) package. You probably have also heard about [nanostores](https://github.com/nanostores/nanostores), which can be integrated with other UI frameworks/libraries, e.g. with [nanostores/react](https://github.com/nanostores/react) or [nanostores/solid](https://github.com/nanostores/solid).

I happened to be curious about these store-based libraries, particularly for nanostores, because when we're using React with Redux, we still need to have the store passed to the `Provider` context component, whereas in nanostores, we just define the store and without requiring to define a Provider component, we can use the stores immediately.

According to the [documentation of nanostores/react](https://github.com/nanostores/react#nano-stores-react), this is the only thing that we need to do after defining the stores:

```jsx
import { useStore } from '@nanostores/react';

import { profile } from '../stores/profile.js';
import { User } from '../stores/user.js';

export const Header = () => {
  const { userId } = useStore(profile);
  const currentUser = useStore(User(userId));
  return <header>{currentUser.name}</header>;
};
```

How cool is that? I think a lot of us (if not all) have seen this kind of code before if we're using React.Context a bit out of control:

```jsx
<ProviderA>
  <ProviderB>
    <ProviderC>{/* and so on... */}</ProviderC>
  </ProviderB>
</ProviderA>
```

Now, borrowing the example code from nanostores with React above, we could do this instead with our DIY-store:

```jsx
function ComponentA() {
  const [state, setState] = useStore(storeA);
  // ...do stuff
}

function ComponentB() {
  const [state, setState] = useStore(storeB);
  // ...do stuff
}

function ComponentC() {
  const [state, setState] = useStore(storeC);
  // ...do stuff
}
```

All that without React.Context! So, what's the magic behind the `useStore`? For this part, I have prepared a [sandbox](https://codesandbox.io/s/festive-kate-gqcbks) containing the demonstration. Now we'll go through the code piece by piece.

```ts
// This defines the store "subscribers" The subscribe function has the same typing as `setState`.
interface StoreListener<State = any> {
  id: string;
  setState: React.Dispatch<React.SetStateAction<State>>;
}

// This defines the store's content, which contains the state and the subscribers.
interface StoreContent<State = any> {
  state: State;
  subscribers: StoreListener<State>[];
}

// A dictionary of stores.
const stores: {
  [index: string]: StoreContent;
} = {};

// Create the store with a unique ID and have its subscribers
// initially set to an empty array. We'll use it later.
function createStore<State>(initialState: State): StoreContent<State> {
  const id = nanoid();
  stores[id] = {
    state: initialState,
    subscribers: []
  };

  return stores[id];
}
```

First and foremost, nothing much. Just create a store with an ID, as well as the state and subscribers. The store content needs to be an object because if it's not, then primitive types (such as string and number) would have been stored by value instead of reference. On top of that, we need to store the "subscribers" that we will "broadcast" whenever there is a new state coming in.

Next, we will define the `useStore` hook.

```ts
// useStore accepts a store parameter, then in the effect,
// it will add a listener to the store's subscribers list.
// Upon cleanup, then the subscribe function will be removed.
function useStore<State>(store: StoreContent<State>) {
  const [state, setState] = useState(store.state);

  useEffect(() => {
    const listener = {
      id: nanoid(),
      setState
    };

    store.subscribers.push(listener);

    return () => {
      const idx = store.subscribers.findIndex((i) => i === listener);
      if (idx > -1) {
        const newSubscribers = store.subscribers.splice(idx)
        store.subscribers = newSubscribers;
      }
    };
  }, [store]);

  // Since we want to "update" all the `useStore` calls,
  // we need to call the subscriber functions.
  const set = useCallback(
    (newState: State) => {
      store.state = newState;
      for (let i = 0; i < store.subscribers.length; i++) {
        store.subscribers[i].setState(newState);
      }
    },
    [store]
  );

  return [state, set] as const;
}
```

We begin by creating a state with good-old `useState`. After that, we set this `useEffect` which would only be triggered once (in production). Here, we store the subscribers as well as remove the subscribers when the effect re-fires (in this case, probably only from the [strict mode](https://beta.reactjs.org/reference/react/StrictMode#fixing-bugs-found-by-re-running-effects-in-development)).

Of course, since this is a hook that can be reused in a lot of places, it's best if we also memoize the `set` function, so that we keep the referential equality intact. Finally, let's use the store!

```tsx
const countStore = createStore({ count: 0 });

function ComponentA() {
  const [state, setState] = useStore(countStore);

  return (
    <div>
      <h2>Component A</h2>

      <p>Value: {state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}

function ComponentB() {
  const [state, setState] = useStore(countStore);

  return (
    <div>
      <h2>Component B</h2>

      <p>Value: {state.count}</p>
      <button onClick={() => setState({ count: state.count + 1 })}>
        Increment
      </button>
    </div>
  );
}
```

We first create the store by passing an object. After that, the returned store will be used as an argument to the `useStore` function. There you have it, now when we increment in ComponentA, the count in ComponentB will also be increased, and vice versa. All without React.Context!

I hope you find this post useful. Take care and until next time!
