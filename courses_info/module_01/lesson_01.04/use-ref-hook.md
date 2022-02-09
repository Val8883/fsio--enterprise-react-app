---
title: useRef Hook
description: While less often discussed, the useRef Hook deserves covering because a time will come when it's the right solution to reach for; here, we'll talk about how useRef's "mutable" value property can be useful.
role: 'LESSON'
privateVideoUrl: https://fullstack.wistia.com/medias/cec08biuyo
isPublicLesson: false
useMdx: true
---

# useRef Hook

If you've written React code before, you may already be familiar with React's [refs](https://reactjs.org/docs/refs-and-the-dom.html).

In the React of yesteryear, refs provided a way to access DOM nodes or React elements where you needed to _imperatively_ modify a child outside of the typical data flow.

Reasons for using refs include situations like:

- Managing focus, text selection, or media playback
- Triggering imperative animations
- Integrating with third-party DOM libraries

Generally, refs have been thought of as an escape hatch, and the consensus was that reaching for refs often might indicate that state should be owned somewhere else in the component hierarchy.

T> **Imperative vs declarative programming**
T>
T> Whenever possible, let React handle the state of the app and the "how" of each component (aka declarative handling).
T>
T> But when the situation calls for us to handle the "how" (like focusing on a particular DOM element once it's rendered), refs are the way to do so (aka imperative handling).

With the release of hooks, `useRef` got an update that made it easier to use, and I find it a lot more useful today than ever before.

Not only can we use `useRef` to access DOM elements directly, but we can also use it to hold mutable values that won't trigger a component re-render but will persist the values while the component's mounted.

**Here, we'll explore the usefulness of `useRef` for those instances when we need to direct a React component on how to handle a DOM element.**

### Sample useRef code

Here's an example that shows two common use case scenarios for the `useRef` Hook: using it to focus on a particular input and using it to evaluate the input's new value compared to its old value.

<CodeSandboxEmbed
src="//codesandbox.io/s/newline-modernize-react-app-use-ref-xkh7q?fontsize=14&hidenavigation=1&theme=dark&autoresize=1"
style={{width: '100%', height: '35em'}}
/>

### useRef to focus on an input

The first thing you'll see when the example code loads is a button titled **Focus the input**. Click it, and you'll notice a cursor appear in the input box, and you can start typing numbers or use the arrow keys to adjust the number up and down.

Before we look at the code causing this focus on the input box, let's talk about `useRef` in general; the code will make more sense afterward.

#### How does useRef work?

`useRef` returns a mutable ref object whose `.current` property is initialized to the passed argument. You might think of it sort of like a box holding that value in its `.current` property.

T> A mutable value is any value that can change.

It’s handy for keeping any mutable value around, similar to how you’d use instance fields in classes.

The `useRef` Hook operates similarly to how you can pass a `ref` object to React like this:

```javascript
<div ref={myRef} />
```

React will set its `.current` property to the corresponding DOM node whenever that node changes.

The returned object will then persist for the full lifetime of the component.

This works because `useRef()` creates a plain JavaScript object. The only difference between `useRef()` and creating a `{current: ... }` object yourself is that `useRef` will give you the same ref object on every render.

T> **Keep in mind that `useRef` doesn’t notify you when its content changes. Mutating the `.current` property doesn’t cause a re-render.**

Okay, now that we've talked a bit about the mechanics of `useRef`, let's take a look at the first example.

#### useRef to focus on an input

When you look at the code, the very first variable declaration you'll see inside of the `App` component is for a ref, and its initial value is set to `null`.

T> If you needed to point the ref to a state variable or set it equal to a string or number, that's totally valid too (and you'll see it when we discuss the second example).

**useRef to put focus on a functional component's input element**

{lang=javascript,crop-start-line=1,crop-end-line=10}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-ref/src/App.js)

{lang=javascript,crop-start-line=35,crop-end-line=45}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-ref/src/App.js)

That variable `inputRef` is attached to the `<input>` component defined in the JSX, and when `<button>` is clicked, its `onClick` function, `focusInput`, focuses that `inputRef`'s `current` property.

We're _imperatively_ telling the React component to focus on the input we've attached the `inputRef` to in the component.

A more common use case might be this same functionality of focusing on an input in the DOM on component load with the help of a `useEffect`. But for illustrative purposes, the `onClick` function triggers the focus on this element instead.

Even though this example might seem a little trite, it's actually pretty common for forms or other inputs you might have in your app that you'd like to automatically target to make it easier for users to get things done.

Okay, so that example is not too far from how you might use a ref in a traditional class component now. Let's look at another way the `useRef` Hook can be utilized now in functional components.

### Using useRef to store values that shouldn't trigger re-renders of the component

A unique way to implement a `useRef` Hook is to use it to store values instead of DOM references.

I> Personally, I have done this quite a bit in the large applications I work on. These values can either be a state that does not need to change too often or a state that should change as frequently as possible but should not trigger full re-rendering of the component for one reason or another.

In the same example above, the first ref defined is used to put the focus on the input, but a second ref is defined to compare the input's current value to its previous value and display a message if that value is higher or lower than it was previously in the DOM.

Here's the code to pay attention to.

**useRef to compare a functional component's current and previous values**

{lang=javascript,crop-start-line=4,crop-end-line=8}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-ref/src/App.js)

{lang=javascript,crop-start-line=12,crop-end-line=54}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-ref/src/App.js)

For this code, first, we define a `number` state variable and create a `numberRef` to keep track of `number`'s value.

I> If you were to check right now, `numberRef.current = 0`, in the DOM.
I>
I> Just type `console.log(numberRef.current)` inside of the `useEffect` function to see for yourself.

Once the user starts entering numbers in the input, using either the keypad arrows or manually typing them in, the `calcNewDiff` function will run each time an action is taken. The `calcNewDiff` function will update the state of `number`.

Then, because `number`'s value has been updated (and the `useEffect` function is watching for `number`'s value to change in its dependency array `[number]`), the `useEffect` runs. Depending on what the `numberDiff` state gets set to, it displays the appropriate message in the DOM.

This `useEffect` is where the `numberRef` comes into play. Inside of `useEffect`, the local variable `oldNumber` is set equal to `numberRef.current` because it still retains the previous value for `number` even though the state variable `number` itself has been updated via the input.

T> Once again, feel free to add some `console.log`s of `oldNumber` and `number` to see how the state gets updated, but the ref does not (at least, not yet).

In this way, the `useEffect` can compare the current value of `number` and the previous value assigned to `number` and preserved in the `numberRef.current`. Based on which value is greater, display a message in the DOM indicating if the new value is higher or lower than the last value.

Finally, before the `useEffect` is complete, the `numberRef.current`'s value is updated to reflect the current value of `number` so that when the effect is triggered in the future, it can accurately compare values.

**Although `useRef.current`'s value is mutable, unless we update it ourselves, it won't change over the life of the component, re-render or no.**

`useRef` is one of the less-discussed hooks, on average, but there are many situations where it fits the bill perfectly.

### A real-world example of useRef

Once again, you might be thinking, "Why would I ever need this in a real app?" But actually, there are a lot of scenarios where this makes real sense.

Here's one: In the app I work on, users can change which department they're currently viewing products for.

Each time they open a modal, they can switch departments. When that happens, the app needs to go out and refetch new data to display the products that are part of that selected department.

We use `useRef` variables to keep track of the previous department so that if it's changed and the new department value differs from the previous value, the API call to fetch data will be triggered.

I> Of course, there's more than one way to accomplish this same thing using React, but that's one example of `useRef` at work.

Nice! We're more than halfway through the lessons for this module introducing you to the most common React Hooks you'll encounter throughout this course and when using hooks in general.

Next up: the `useContext` Hook. This one was a true game-changer for me — once I understood how to use it. I'm really excited to introduce it to you, too.

---
