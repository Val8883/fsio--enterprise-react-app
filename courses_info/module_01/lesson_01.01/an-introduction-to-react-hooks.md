---
title: 'Introducing React Hooks'
role: 'LESSON'
description: Learn about the motivation behind React Hooks, the benefits it can bring, and the rules that apply to all Hooks in a React application.
privateVideoUrl: https://fullstack.wistia.com/medias/uuqkxdgps2
isPublicLesson: false
---

# An Introduction to React Hooks

Conceptually, React components have always been closer to functions. The React team freely admits this. But before hooks arrived, these functional components (while more in line with the spirit of React) had limitations, most notably an inability to have their own `state`.

Before React v16.8.0 was released, in order to handle `state` or features like lifecycle methods (`componentDidMount`, `componentWillUpdate`, etc.) within React, the component utilizing these things had to be class-based.

And so, we had the stateful, class-based components responsible for fetching data and keeping track of state (often referred to as "container components") and the stateless functional components responsible for receiving data from the class components and displaying it ("presentational components").

I> Dan Abramov, one of the core React team members, famously wrote about them [here](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0) back in 2015. He has since revised his stance with the release of hooks, but it's still an interesting explanation for the time.

But [React Hooks](https://reactjs.org/docs/hooks-intro.html) turned that idea on its head, and with good reason.

**This lesson will dive into why hooks were introduced to React to help us better understand the problems hooks are designed to solve while building applications.**

### Why hooks? What do I gain with them?

The motivation behind hooks was to solve, as the [React docs themselves](https://reactjs.org/docs/hooks-intro.html#motivation) put it, "a wide variety of seemingly unconnected problems in React that we’ve encountered over five years of writing and maintaining tens of thousands of components."

Although there are no plans to remove classes from React (backwards compatibility is important!), hooks provide a more direct API to React concepts you're probably already familiar with: props, state, context, refs and lifecycles.

And if you re-read the quote above, you might think to yourself: "Problems? What sorts of unconnected problems is the React team referring to?"

Well, problems you've most likely encountered if you've worked with React for any length of time.

Problems like:

#### Complex components become hard to understand

As stateful components grow more complex, lifecycle methods that started out simple become unmanageable messes of stateful logic and side effects.

I> **"Side effects" in React refer to any function that modifies variables/state/data outside of the scope of the current function that’s being executed (this can also known as an "impure function").**
I>
I> For example, if a function modifies a global variable, then it is considered a side effect. Similarly, if it makes a network call, it is also a side effect. This explains why we see references to side effects in React most often with lifecycle methods (and now `useEffect` Hooks).

It is not uncommon for a component fetching data inside a `componentDidMount` method to also contain unrelated logic setting up event listeners or references to DOM nodes. Likewise, `componentWillUnmount`, a completely separate method, would be responsible for cleanup of those same event listeners when the component unmounts.

Mutually related code that changes together gets split apart, but unrelated code ends up jammed together. This is a recipe for bugs and inconsistencies within code.

**Hooks let you split one large, stateful component into smaller functions based on what pieces are related, rather than forcing a split based on lifecycle methods.**

#### Classes confuse people and machines

[Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) can be a barrier to learning React. Even though they've been around since ES6 (introduced back in 2015), I haven't seen them widely used in the JavaScript community outside of React.

With classes, things like how the [`this` ](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this) keyword works in JavaScript is important. You have to remember to bind event handlers. And while you might well understand props, state, and the top-down, uni-directional data flow of React, you can still struggle with wrapping your head around classes. (I know I certainly have!)

Even the distinction between when to use function-based components or class-based components could lead to disagreements between experienced React developers.

On top of it all, React is committed to staying relevant with the other options available today like Vue, Angular, and Svelte. And the team found that class-based components can encourage unintentional patterns, the code doesn't minify well, and they make hot reloading (one of my favorite benefits of React) flaky and unreliable.

**Hooks lets you use more of React's features without classes.** Hooks embrace functions while still providing a good development experience that doesn't require you be a functional programming or reactive programming master.

#### It's hard to reuse stateful logic between components

Before hooks, React didn't offer a straightforward way to have reusable behavior in a component. Even though a `componentDidMount` and `componentShouldUpdate` method might both call the same API endpoint at different times, there was no good way to prevent duplicating the same code for each lifecycle method.

Patterns like [`render props`](https://reactjs.org/docs/render-props.html) and [`higher-order components`](https://reactjs.org/docs/higher-order-components.html) attempted to solve this, but they require restructuring components and tend to make code harder to follow.

To the React core team, this indicated an underlying problem: React needed a better primitive for sharing stateful logic.

**Hooks introduce the ability to extract stateful logic from a component so that you can test and reuse it independently without changing your component hierarchy.** This makes it easier to share hooks among many components within a project or even within the larger development community.

### The rules of hooks

Now that we've talked about why hooks were introduced and the problems they aim to solve, let's talk about the [rules of hooks](https://reactjs.org/docs/hooks-rules.html) that we must obey within a React application. If these rules are violated, don't worry, you'll know immediately: the console and browser will light up with errors, and the app will probably break in development mode.

Just try to keep these rules in mind as we look at various hook examples in the next few lessons. All the rules might not immediately make sense, but once we start upgrading the sample app, you'll get a better feel for these rules and how to work with Hooks to avoid breaking them.

- Only call hooks at the top level (don't call them inside loops, conditions or nested functions).

T> Following [this rule](https://reactjs.org/docs/hooks-rules.html#explanation) ensures hooks are always called in the same order each time a component renders. React relies on the order in which hooks are called, but if a hook call was suddenly inside an `if` statement, it might not run on every render, which could lead to hard-to-locate bugs. One solution would be to put the `if` statement inside of the hook, but it can't be the other way around.

- Only call hooks from React functions / functional components (you can't call hooks from regular JavaScript functions, or class-based components).

T> Following this rule ensures that all stateful logic in a component is clearly visible from its source code.

- Custom hooks are functions that call _other_ hooks. As a best practice, custom hooks should always be denoted with the term `use` before the hook name. (e.g., `useProducts` or `useInterval`.)

In the next lesson, we'll deep dive into the `useState` Hook, the hook most frequently used and closest to the `state` you know already from class-based components. Let's go.

---
