---
title: useEffect Hook
description: "useEffect is a game-changing hook: originally compared to lifecycle methods in React components, it's close but not truly a direct comparison."
role: 'LESSON'
privateVideoUrl: https://fullstack.wistia.com/medias/09o8ugobkm
isPublicLesson: false
useMdx: true
---

# useEffect Hook

Introducing the `useEffect` Hook, the second most useful of all the React Hooks, in my opinion. **This lesson will explore how `useEffect` works as well as how it stacks up against traditional React lifecycle methods.**

This hook is the hook that performs "side effects" in functional components. In the introductory lesson of this module, I defined side effects as functions modifying variables outside of their scope, and up to now, only class-based stateful components could cause these sorts of side effects with methods like `componentDidMount` and `componentWillUpdate`.

`useEffect` allows for these same sorts of actions: making API calls to fetch data, updating the DOM, subscribing to event listeners. _But_ it allows for them with more modularized, fine-grained control than was previously possible.

### Sample useEffect code

In this example, I've got two ways in which the `useEffect` Hook is commonly used, which also lets me compare it to how a class-based component might perform the same tasks.

<CodeSandboxEmbed
src="//codesandbox.io/embed/newline-modernize-react-app-use-effect-7bhve?fontsize=14&hidenavigation=1&theme=dark&autoresize=1"
style={{width: '100%', height: '35em'}}
/>

### useEffect only on page load (like componentDidMount)

The first thing you'll notice about this example is that an adorable dog photo loads on component render from a free, public API named [Dog API](https://dog.ceo/dog-api/).

T> If you'd like to see all the info this API returns, just paste this line into a new browser tab: https://dog.ceo/api/breeds/image/random.

Now refresh the component in the example. You should see a new dog photo now. How does this happen? The first `useEffect` Hook in the code.

#### How does useEffect work?

So what does `useEffect` do? It tells your React component that it needs to do something after render. React will remember the function you passed and call it later after performing DOM updates. In this effect, we're fetching and setting data, but it could be doing any number of other things.

#### Place useEffect inside components

By placing useEffect inside the component, it lets you access the `image` state variable (or any props) right from the effect. There's no need for a special API to read it — it’s already in the function scope. Hooks heavily embrace [JavaScript closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures) and avoid introducing React-specific APIs where JavaScript already provides a solution.

Let's talk about the makeup of the `useEffect` Hook, and then we'll examine how it applies to our examples.

#### useEffect's arguments

The `useEffect` Hook doesn't return any values of its own but instead takes two arguments. The first argument is required, and the second is optional (but is highly recommended at all times to prevent the component re-rendering on every state change).

#### useEffect argument #1: The callback (required)

The first argument is the effect callback function we want the hook to run (i.e., the effect itself).

That looks like this:

**useEffect basic syntax**

```javascript
import { useEffect } from 'react';

useEffect(() => {
  console.log('Hello world!');
});
```

By default, the effect stated in a `useEffect` Hook runs when the component first renders and after every update (but this is easily customized to only render when you want it to, which we'll cover next).

#### useEffect argument #2: The dependency list (optional)

The second argument of the `useEffect` Hook is optional and is a dependency list that allows us to tell React to skip applying the effect only until certain conditions are met.

In other words, the second argument of the `useEffect` Hook allows us to limit when the effect runs. It gives us that more fine-grained control I talked about earlier.

**By simply placing an empty array as the second argument in a useEffect, this is how we tell React to only run the effect on initial render.** This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.

Let's look closely at the first `useEffect` in the example; it uses its `useEffect` Hook just like this.

**useEffect only on component mount in a functional component**

{lang=javascript,crop-start-line=9,crop-end-line=16}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-effect/src/App.js)

Here's what's going on in the code.

First, we declare the `imageUrl` state variable above the `useEffect` Hook, and then we tell React we need to use an effect. We pass a function to the `useEffect` Hook. This `fetchDogImage` function we pass is our effect.

Inside our effect, we fetch the dog image URL using the browser's [fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) _only when the component first mounts_, and then we set that returned data to the `imageUrl`. We can read the latest `imageUrl` inside the effect because it's in the scope of our function.

When React renders our component, it will remember the effect we used, run our effect after updating the DOM, and display a cute dog photo for us after the function returns and updates the `imageUrl` state.

If I were to do the same thing in a class-based component, it would look something like this code.

**componentDidMount in a class component**

```javascript
// declare the imageUrl up here using this.state

  async componentDidMount() {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const { message } = await response.json();
    this.setState({ imageUrl: message });
  };
```

I> **Async/await is a little different within useEffect than with lifecycle methods**
I>
I> You'll notice in the examples (which are both asynchronous, API data-fetching actions) that the `useEffect` itself does not contain the `async` keyword.
I>
I> If you try it this way, you'll see a `console error`. The long and short answer for avoiding this, straight from the React Core team, is: making `useEffect` async encourages race conditions and bugs. Just don't do it.
I>
I> The easy solution to doing async functions directly within `useEffect` is to create an async function _inside_ of the `useEffect` Hook, then call that function right after creating it. This should solve your error.

If the example above were only setting state or doing something else not asynchronous and promise-based, we wouldn't need the extra action of declaring and then calling `fetchDogImage`. **The async function internal to the `useEffect` Hook is only needed for asynchronous operations.**

Time to move on to the second `useEffect` example: this one's got different dependencies triggering it to run.

### useEffect when a particular variable changes (like componentDidUpdate)

The second `useEffect` Hook in the example is triggered when you press the button underneath the dog photo loaded on component mount with the text `Flip the switch!`.

Each time the button is pressed, depending on whether the state variable `showCatFacts` is true or false, either a dog photo or a cat fact will be shown. This second `useEffect` differs from the first, though, because every time `showCatFacts` is true, the cat fact displayed in the DOM is different. If you press `Flip the switch!` twice more, you'll see the same dog photo when `showCatFacts` is false, but a new cat fact when `showCatFacts` becomes true again.

This is because the `useEffect` responsible for fetching cat facts from the [Cat Fact API](https://catfact.ninja/), has a different dependency array than the first example, which had the empty dependency array of `[]`.

**useEffect that runs based on dependencies within in a functional component**

{lang=javascript,crop-start-line=18,crop-end-line=29}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-effect/src/App.js)

This example is using a common `useEffect` performance optimization where you tell React to skip applying an effect if certain values haven’t changed between re-renders. Otherwise, as I mentioned earlier, if there's no dependency array specified, every single time a re-render of the component happens, this `useEffect` Hook will re-run.

Since the `showCatFacts` value is in the dependency array for this `useEffect` Hook, every time `showCatFacts`' value is changed to `true` via a click of the `Flip the switch!` button, the `useEffect` Hook runs and calls `getRandomCatFact` to fetch a new cat fact to display in the DOM.

Here's the inline function attached to the button that updates the state of `showCatFacts` in the JSX of the example.

{lang=javascript,crop-start-line=49,crop-end-line=51}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-effect/src/App.js)

If other state values, like `imageUrl`, change, that would not cause this function to re-run because it knows it only needs to update when the value of `showCatFacts` changes.

Here is what that same action would look like in a React class component.

**componentDidUpdate in a class component that updates when showCatFacts state changes**

```javascript
// the catFacts state value is declared up here using this.state
// as well as the showCatFacts boolean

  getRandomCatFact = async () => {
    const response = await fetch("https://cat-fact.herokuapp.com/facts/random");
    const { text } = await response.json();
    this.setState({ catFacts: text });
  };

  async componentDidUpdate(prevProps, prevState) {
    if (this.state.showCatFacts !== prevState.showCatFacts && this.state.showCatFacts === true) {
      await this.getRandomCatFact();
    }
  }

// the jsx render function goes down here
<button onClick={() => this.setState({showCatFacts: !this.state.showCatFacts})>
  Flip the switch!
</button>
```

Just like with the `useEffect` function above that relies on the `showCatFacts` boolean to be true before it goes and fetches a new cat fact to display, this `componentDidUpdate` function checks if the state of `showCatFacts`'s value differs from its previous value, which it should because it's a boolean flipping from true to false with the touch of a button. And if the value is both different from its previous state value and equal to true, `componentDidUpdate` will call the function declared above `getRandomCatFact`.

Now, imagine that `getRandomCatFact` isn't the only thing that needs to be triggered when some state or props variable within the component changes. Imagine the increasing complexity as well as various unrelated logic that will quickly make this lifecycle balloon in size as it attempts to keep track of the values of multiple pieces of state within the component.

With functional components, instead, you could have multiple, separate `useEffect` Hooks, each with different, independent dependency arrays, keeping track of values unique to them and only running when the values they care about change. It might sound like more code at first (more `useEffect` Hooks instead of a single `componentDidUpdate`), but believe me, being able to separate these pieces of logic out really makes code easier to write and more understandable to read. It just takes a little practice.

T> **useEffect gives the feeling of increased performance**
T>
T> Unlike `componentDidMount` or `componentDidUpdate`, effects scheduled with `useEffect` don’t block the browser from updating the screen. This makes your app feel more responsive. And the majority of effects don’t need to happen synchronously. If they do, there are some more obscure React Hooks [like useLayoutEffect](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) to help handle those scenarios.

### Final useEffect Hook tips

- **Use multiple effects to separate concerns.** One of the best things about `useEffect` is that now, actions that have nothing to do with each other don't have to be grouped together into the same lifecycle method. And actions that are connected but need to run under different conditions can be grouped together instead.

T> It's totally fine to have several `useEffect` Hooks in a row in the code.

- **Optimize performance by skipping effects.** You can tell React to _skip_ applying an effect if certain values haven’t changed between re-renders. To do so, pass an array as an optional second argument to useEffect, like we discussed above. If your effect doesn’t depend on any values from props or state, an empty array will indicate to only run the effect on component mount.

T> You can even pass more than one argument in that array if multiple things should trigger that `useEffect` Hook to run.

Excellent! Well done making it through this lesson. `useEffect` is not the most intuitive hook to grasp, but once you get the hang of it, you won't want to go back to using lifecycle methods. This, too, is a very, very common hook that we will use in many ways throughout this course as we update the sample app.

Now, there are a few other hooks worth taking the time to talk through in these lessons before we take advantage of them in our app. The next hook we'll discuss in the following lesson is the `useRef` Hook.

---
