---
title: Custom Hooks
description: 'Custom hooks are arguably the most important addition of all the hooks released with React 16.8.0. Explore how custom hooks can dramatically simplify sharing code between components.'
role: 'LESSON'
isPublicLesson: false
privateVideoUrl: https://fullstack.wistia.com/medias/46q81moafm
useMdx: true
---

# Custom hooks

Unlike all the other hooks we've covered so far, which are actual hooks (`useState`, `useEffect`, etc.), custom hooks are simply: **the ability to extract component logic into reusable functions.** Which is a _huge_ upgrade to how React works.

Remember in the introductory lesson when we talked about some of the biggest reasons that hooks happened? One of them was [don't repeat yourself (DRY) in code](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) and avoid having to duplicate it across various components or even across lifecycle methods within the same component.

Custom hooks make that possible. Up to now, React has had two popular ways to share stateful logic between components: [render props](https://reactjs.org/docs/render-props.html) and [higher-order components](https://reactjs.org/docs/higher-order-components.html). We will now look at how hooks solve many of the same problems without forcing you to add more components to the tree.

The moment you realize two components need the same piece of code, you've identified a potential use case for a custom hook. Or, if you want to clean up an especially large, complex component and modularize some of its functions, custom hooks could be your new solution.

You can write custom hooks that cover a wide range of use cases like:

- Form handling
- Animations
- Declarative subscriptions
- Timers

And probably many more I haven’t even considered — the sky is the limit!

The best part? Custom hooks use the hooks we've been talking about in this whole module. They just group a bunch of hooks together inside one wrapper, and you've got a brand new custom hook to drop into whatever component you need.

**This lesson will teach you exactly what a custom hook can look like and how it can be used inside of another React component.**

### Sample custom hook: Close modal on click outside

Here's an example of a custom hook you might want to use in your React application. Let's say your site has a number of modals that pop up from time to time. Perhaps, in addition to explicitly dismissing them via a **Close** button, you'd like them to dismiss whenever a user clicks outside of the modal's body as well.

While you could certainly write this code and tie it to a particular modal, if you want to apply this behavior to more than one modal (or you want the same sort of functionality with dropdown menus or tooltips), you'd be duplicating code. Therefore, this seems like a perfect opportunity to write a custom hook encapsulating that logic.

Let's talk about a few basics to keep in mind about custom hooks, and then we'll get to the meat of the hook itself.

<CodeSandboxEmbed
src="//codesandbox.io/s/newline-modernize-react-app-custom-hook-ps01i?autoresize=1&fontsize=14&hidenavigation=1&theme=dark" style={{width: '100%', height: '35em'}}
/>

### How do custom hooks work?

First of all, I want to reiterate a custom hook is a JavaScript function whose name starts with "use" and that may call other hooks.

I> The rest of the rules of hooks still apply to custom hooks, though: hooks must be called in the same order each time, they can only be used in functional components, etc.

Unlike a React component, though, a custom hook doesn’t need to have a specific signature. We decide what it takes as arguments and what, if anything, it should return. In other words, a custom hook is just like a normal function.

The major difference is in its naming: custom hooks should always start with `use` so you can easily tell it's a custom hook.

T> **Custom hook naming best practice**
T>
T> It's considered a best practice to name any custom hooks you may be creating as `useXyz`. For instance, this example has `useOnClickOutside`, but you might also have `useFetchData` or `useOnScreen` or whatever. Just try to name your hooks `useSomething`.

#### Pass information between hooks

Since hooks are just functions, we can pass info between them just like we do with all the other hooks (which you'll see in our code example soon).

Each time the state being passed to the hook updates, the custom hook will unsubscribe from the argument value it was in charge of and subscribe to the new argument's value instead.

No extra effort is required on our part, which is pretty cool.

But enough theory, let's see a custom hook in practice.

T> Keep in mind, this custom hook we'll be examining should work in exactly the same way as if it was written in the component. All we're doing is extracting some code that could be useful to multiple components into a separate function.

### useOnClickOutside custom hook

Unlike the previous lesson for `useContext`, this example only needs two JavaScript files (but the `useOnClickOutside.js` file is our custom hook where most of the magic happens).

Currently, when the component renders, there's a button with the text **Open Modal**. Click it, and a light blue modal pops up in the center of the screen with the text `Hi, I'm a modal. Click outside of me and I'll close.` Click anywhere inside of the modal, and it will stay open; click outside of it, and it will disappear from the screen, replaced once again with the **Open Modal** button.

#### Review App.js first

For simplicity's sake, let's take a look at the `App.js` file first. It's pretty simple to understand, and then we'll dive into the custom hook file.

**App.js**

{lang=javascript}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-custom-hook/src/App.js)

Our `App.js` file has just two pieces of state that it's responsible for: a ref, `modalRef` to keep track of the modal element when it's rendered in the DOM, and an `isModalOpen` state to determine when to show or hide the modal.

> **useRef reappears (and it plays an important role!)**
>
> If you remember from our `useRef` lesson just a few lessons back, when the component first renders, since the modal is not present, the `modalRef.current` value will be `undefined`.
>
> As soon as the button's clicked and the modal's visible, the `modalRef.current` value becomes this JSX:
>
> ```javascript
> <div class="modal-container">
>   <h4>Hi, I'm a modal. Click outside of me and I'll close.</h4>
> </div>
> ```

The `<button>` has the `onClick` function responsible for flipping `isModalOpen`'s state to `true`, causing it to appear in the DOM.

The `useOnClickOutside` function, which looks like any other function we might declare or import into a functional component, is what determines if the modal should then be closed.

You'll notice it accepts two arguments, the first being a reference to the DOM element we're keeping track of, `modalRef`, and the second is a function to close the modal `() => setIsModalOpen(false)`.

Now that we've examined our component, let's look at `useOnClickOutside`'s logic.

#### Open up the useOnClickOutside.js file

The modal in the component is open, there's a `ref` keeping track of the element in the DOM, and there's a function to close the modal when the proper requirements are met. How does our custom hook come into play here?

Let's see...

**useOnClickOutside.js**

{lang=javascript}
<<[src/useOnClickOutside.js](./protected/source_code/newline-modernize-react-app-custom-hook/src/useOnClickOutside.js)

The custom hook pulls in its own React Hook, the `useEffect` Hook, and puts it into effect (no pun intended) as soon as the hook is defined.

Right inside the `useEffect`, a function named `listener` is defined. `listener` is what determines whether the `handlerFunction` argument being passed into our custom hook runs or not.

#### listener function

`listener` accepts an event (in this case, it's a [`mousedown` or `touchstart` event](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent) defined just a few lines lower).

Once that event happens, the function checks if `ref.current` exists and if `ref.current.contains(event.target)`.

The first check should always return true, but the second check only is true if the user clicks inside the modal. This is part of the [Node Web API](https://developer.mozilla.org/en-US/docs/Web/API/Node/contains) and checks if a node is a descendant of a given node or one of its children, which refers to any child components that modal might have as well.

If neither of these checks returns `true`, the `handlerFunction` runs, and in this case the handler function being passed in is `() => setIsModalOpen(false)`. And then, the referenced DOM element should close.

I> So, if the `event.target` is the `modal-container` JSX (or any of its descendants held in reference by the `modalRef.current` value), nothing should happen in the DOM.

#### Back to the custom hook at large

Jump down a few lines after the `listener` function declaration, and you'll see the `eventListeners` added to the DOM to keep track of `mousedown` actions or `touchstart` actions. Each of these actions keeps track of clicks in the DOM, and if either of them registers, the `listener` function fires, checks the `event.target`, and acts accordingly.

One thing to notice is these same `eventListeners` are removed when the `useOnClickOutside` Hook inside of the anonymous function at the bottom of the `useEffect`. This is what's known as a [`useEffect` cleanup function](https://reactjs.org/docs/hooks-effect.html), and it's similar to the `componentWillUnmount` lifecycle method. It serves as a way to prevent memory leaks by unsubscribing from event listeners or API calls or the host of other things `useEffect` might do. Not all `useEffect`s need it.

And last but not least, you can see that both the arguments this custom hook accepts (`ref` and `handlerFunction`) are part of the dependency array for this `useEffect`. Any time one of those arguments updates (which will happen from the component when the **Open Modal** button is clicked), this hook will run again.

This very same code could be slapped into the `App.js` file with pretty much no changes, and it would work just the same.

And there you have it. Custom hooks in a nutshell.

Once you break down what's happening and realize these custom hooks are just calling the same React Hooks we've been talking about this whole module, it's not so intimidating, is it? And once again, we'll get some practice with these in our app that we'll be refactoring very soon.

#### Just remember, there are so many custom hook possibilities

T> Interested in seeing lots of custom hooks you can use in your own React apps? The [use hooks site](https://usehooks.com/) is a great resource of fun and useful hooks. There's even an Easter Egg Hook for the [Konami Code](https://www.howtogeek.com/659611/what-is-the-konami-code-and-how-do-you-use-it/)!

---
