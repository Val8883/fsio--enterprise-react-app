---
title: useState Hook
description: The useState Hook is the most similar to traditional state in React class-based components, and we'll look at examples of how it works to keep track of state in functional components.
role: 'LESSON'
privateVideoUrl: https://fullstack.wistia.com/medias/pn2u0cea5g
isPublicLesson: false
useMdx: true
---

# useState Hook

Here is the `useState` Hook, a hook we'll become intimately familiar with over this course.

It's the one you will reach for the most in our new, state-powered functional components, and it's the one most similar to the `this.state` you already know and love in React.

**We'll learn how `useState` stacks up to traditional class state in this lesson and how to replace it effectively with hooks.**

### Sample useState code

Below are two interactive examples of how the `useState` Hook can be used. I have two examples because this hook can be used with slight modifications depending on if you need to access previous state to update the current state or not.

<CodeSandboxEmbed
src="//codesandbox.io/s/newline-modernize-react-app-use-state-3qcnn?fontsize=14&hidenavigation=1&theme=dark&autoresize=1"
style={{width: '100%', height: '35em'}}
/>

### Show message (An example where previous state doesn't matter)

In the top example (which doesn't depend on previous state), when you click the **Hide Message** button, the state of `showMessage` is updated from `true` to `false`, and the message displayed in the JSX goes from `When 'showMessage' is true, you see me` to `When it's false, you don't`.

Let's break down each part of this first example, and compare it to its class-based equivalent. We'll look at declaring state, then reading state, and finally updating state with `useState`.

#### Declaring showMessage state with useState

`useState` returns a pair: the current state value and a function that lets you update it.

T> It's a best practice to name the function as `setXYZ` to match whatever you name your state value. So if your state variable was `isOnline`, your matching function to update that variable would be `setIsOnline`.

You can call this function from an event handler or somewhere else. This hook is like `this.state.showMessage` and `this.setState` in a class, except you get them as an [array destructured pair](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#array_destructuring) and **`useState` doesn’t merge the old and new state together like `this.setState` does**.

In a class-based component, initializing state looks like this:

**Class component**

```javascript
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMessage: true,
    };
  }
  // other JS code goes here
}
```

The equivalent code in a functional React component using `useState` looks like this:

**Functional component**

{lang=javascript,crop-start-line=1,crop-end-line=5}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-state/src/App.js)

Since there is no `this` in functional components, nothing can be assigned or read from `this.state`, so instead, the `useState` Hook is called directly inside the component.

Calling `useState` declares a “state variable”. Our variable is called `showMessage`, but it could be named whatever you want, like `waffle` or `location`. This is a way to “preserve” some values between the function calls — `useState` is a new way to use the exact same capabilities that `this.state` provides in a class. Normally, variables “disappear” when the function exits, but `state` variables are preserved by React.

The only argument the `useState()` Hook needs is the initial state (`true`, in this case). And unlike with classes, the state doesn’t have to be an object. It can be a number, a string, even a boolean if that’s all we need.

In our example, we need a boolean to determine if the user should see one message versus another in the DOM, so the initial state is set to `true` for the `showMessage` variable. (If we wanted to store two different values in state, we would call `useState()` twice and declare two different pairs of state — you'll see plenty of this sort of thing when we refactor the sample app.)

T> A best practice for `useState` is to declare all the variables at the top of the component right after defining it (like how we declare state values at the top of class-based components today).

Now that the state's been set in the component, let's compare how its value is read.

#### Reading showMessage state with useState

Here's how a class component would update the state of `showMessage`.

**Class component**

```javascript
export default class App extends React.Component {
  // state is set up here
  render() {
    return (
      // render some other JSX here
     {this.state.showMessage ? (
        <h3>When `showMessage` is true, you see me.</h3>
      ) : (
        <h3>When it's false, you don't</h3>
      )}
    );
  }
}
```

Instead of calling `{this.state.showMessage}` to read the value of `showMessage` in a class-based component, we can simply call `{showMessage}` in a functional component.

**Functional component**

{lang=javascript,crop-start-line=9,crop-end-line=23}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-state/src/App.js)

While displaying the value in this example of a class-based component above doesn't seem like that much more code, when you have many state variables being displayed in a single component, it can be much harder to decipher what all is going on in the component.

#### Updating showMessage state with useState

And last, but not least, updating state no longer involves us calling `this.setState` to update `showMessage`. Here's the class component example.

**Class component**

```javascript
export default class App extends React.Component {
  // state is set up here
  render() {
    return (
      // render some other JSX here
      <button onClick={() => this.setState({ showMessage: false })}>
        Hide Message
      </button>
    );
  }
}
```

In a functional component, we already have `setShowMessage` and `showMessage` as variables, so `this` becomes unnecessary.

**Functional component**

{lang=javascript,crop-start-line=24,crop-end-line=24}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-state/src/App.js)

I don't know about you, but this inline function attached to the `<button>` is easier for me to read than the one in the class-based component.

I> **There's one pretty big difference to keep in mind when it comes to functional state variables versus class-based state variables.**
I>
I> Functional state variables can hold objects and arrays just fine (so you can still group related data together), but unlike `this.setState` in a class component, updating a functional state variable always _replaces_ it instead of _merging_ it with existing variables. Just a little FYI to remember.

### Set counter (An example where previous state does matter)

The second example is one where the previous state of the application matters and demonstrates how you can still access previous state when updating state, even within a functional React component.

When you click the `Add 1` or `Remove 1` buttons, the state of `counter` number is incremented or decremented by 1 from its previous state value, and that value is reflected in the DOM. When I go through this example, most of it should seem more familiar after walking through our first example, but I'll be sure to highlight the key differences.

#### Declaring counter state with useState

Once more, we'll begin with declaring the initial state for a variable named `counter`, which will keep track of a count in the component.

Here's what `this.state.counter` looks like in a class component.

**Class component**

```javascript
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
    };
  }
  // other JS code goes here
}
```

And here is how the state named `counter` would be implemented with hooks in a functional component.

**Functional component**

{lang=javascript,crop-start-line=4,crop-end-line=7}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-state/src/App.js)

In the initial state declaration, there's nothing different happening from our first example. The state `counter` is declared, its updating function `setCounter` is paired with it, and the whole thing is set equal to the `useState` Hook with an initial value of `0`. Every time this component renders, its initial count will be set back to 0.

#### Reading counter state with useState

Reading the state values is relatively the same as the first example, as well.

Our class-based `App` accesses the variable through `{this.state.counter}`.

**Class component**

```javascript
export default class App extends React.Component {
  // state is set up here
  render() {
    return (
      // render some other JSX here
      <h3>Current Count:&nbsp;{this.state.counter}</h3>
    );
  }
}
```

Our functional `App` component accesses the same `counter` variable in its JSX display with `{counter}`.

**Functional component**

{lang=javascript,crop-start-line=32,crop-end-line=32}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-state/src/App.js)

Still with me? Great, let's get to updating `counter`'s value now.

#### Updating counter state with useState (This is where the difference is!)

Updating is where the change to the `useState` Hook happens. If the new state is computed using the previous state, you can pass a function to setState. The function will receive the previous value and return an updated value.

If you look at the two buttons from the example, the `setCounter` function takes in a variable named `prevCounter` and adds or subtracts 1 from it. `prevCounter` isn't explicitly defined anywhere in the code, but you can imagine it being like `prevState` or `prevProps` in class-based components — it works the same way.

The class-based component updating state is more readable when the functions handling the updates to `this.state.counter` are attached to the button's click handlers.

**Class component**

```javascript
export default class App extends React.Component {
  // state is set up here
  removeOne = (prevState) => {
    this.setState({value: prevState.value - 1})
  };

  addOne = (prevState) => {
    this.setState({value: prevState.value + 1})
  };

  render() {
    return (
      // render some other JSX here
      <button onClick={this.removeOne}>
        Remove 1
      </button>
      <button onClick={this.addOne}>
        Add 1
      </button>
    );
  }
}
```

In the functional component, I can make the update to `counter` value an inline function, and it's still fairly straightforward and easy to read.

**Functional component**

{lang=javascript,crop-start-line=33,crop-end-line=38}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-state/src/App.js)

When you look at the functional example with hooks, you start to really see the benefits hooks can bring to your components. Cleaner syntax, less code, easier-to-understand functions.

I> Referencing previous state to update current state is a lesser-known capability that `useState` has, so I wanted to be sure to mention it clearly so you're aware of it.
I>
I> If you want to learn more about it, the [official React docs](https://reactjs.org/docs/hooks-reference.html#functional-updates) are a good place to dive deeper.

And do you remember earlier when I wrote that `useState` doesn't merge state together like class-based `setState` does? There's a solution for this.

**Merge old state with new state in functional components**

If you want to replicate the merge behavior of `setState`, you can do so by combining the function updater form with [object spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) or [Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign).

```javascript
// merging state using the spread operator
setState((prevState) => {
  return { ...prevState, ...updatedValues };
});

// or you can use Object.assign
setState((prevState) => {
  return Object.assign({}, prevState, updatedValues);
});
```

Not too bad, right? Trust me, when you see how much easier state handling can be once state gets separated out into multiple variables, the fact that state's not as seamlessly merged together as it was before will matter a whole lot less.

I hope you now feel like you have a pretty fair understanding of the `useState` Hook. We'll see lots of it in the rest of this course, so you'll have ample time to really get comfortable.

For our next lesson, we'll take a look at the next most prominent hook introduced with the release of hooks: `useEffect`.

---
