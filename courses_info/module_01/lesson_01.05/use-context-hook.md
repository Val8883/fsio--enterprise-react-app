---
title: useContext Hook
description: Context is a powerful API to pass state within React applications, and with the introduction of the useContext Hook, accessing state in any component (class or functional) is possible.
role: 'LESSON'
isPublicLesson: false
privateVideoUrl: https://fullstack.wistia.com/medias/o61fmrou8z
useMdx: true
---

# useContext Hook

The `useContext` Hook simplifies using the [Context API](https://reactjs.org/docs/context.html#api) within a React application, even in functional components.

For the longest time, I understood _why_ Context existed: to avoid passing props through React components that didn't need them to reach the components that did need them.

But what I couldn't wrap my head around was how to not only _consume the already-defined state context_ at the child component level but also update that same state in the parent component _from the child_.

When I finally figured that out, things clicked into place for me. And the first time I really started to take advantage of Context was with the release of the `useContext` Hook.

**In this lesson, we'll learn how the `useContext` Hook can be employed to simplify passing state around within a React application.**

### Sample useContext code

My code example for this lesson is a multi-file example to illustrate how `useContext` could work in a real-world scenario.

In it, a context is created to capture state in a parent component. An intermediate component (that does not need that parent's state) contains a functional child component that _does_ rely on the parent's state and also needs to update it. `useContext` helps make this possible.

<CodeSandboxEmbed
src="//codesandbox.io/s/newline-modernize-react-app-use-context-pcbd2?fontsize=14&hidenavigation=1&theme=dark&autoresize=1"
style={{width: '100%', height: '35em'}}
/>

### useContext to allow functional child components to consume and update parent state

In this example, after the app initially loads, when you click the **Open Drawer from Parent** button, you'll see a purple background pop up (the drawer, in this case) with a new button titled **Close Drawer from Child**.

If you've used Context before, you may already be pretty familiar with how it operates, but let's briefly discuss how `useContext` works as a hook, then we'll go through the various pieces of the code and connect the dots.

#### How does useContext work?

The `useContext` Hook accepts a Context object (the value returned from calling `React.createContext`) and returns the current context value for that Context. The current context value is determined by the value prop of the nearest `<SampleContext.Provider>` above the calling component in the tree.

When the nearest `<SampleContext.Provider>` above the component updates, this hook will trigger a re-render with the latest context value passed to that `SampleContext` provider.

T> If the above paragraphs sounded like a lot of jargon to you, never fear. The next section explains what I'm describing step by step with code examples.

The argument passed to the `useContext` Hook must be the _context object itself_. And just like with all the other React Hooks, you can use multiple different Contexts within the same functional component.

**Multiple useContext Hooks in one child component**

```javascript
const sampleContext = useContext(SampleContext);
const testContext = useContext(TestContext);
const anotherContext = useContext(AnotherContext);
```

T> **Any component calling the same `useContext` data source will always re-render when the provider's context value changes.**
T>
T> What this means is: if you've got two components subscribed to the same Provider and one component updates the Provider's value, both of those components will re-render. Don't worry too much about this now, but do be aware that it will happen.
T>
T> If re-rendering the component is expensive, you can [optimize it using React's useMemo Hook](https://github.com/facebook/react/issues/15156#issuecomment-474590693). But that's beyond the scope of this lesson (and frankly, only to be undertaken once performance actually becomes a problem).

All right, let's get into the `useContext` code example now.

#### First, check out the DrawerContext.js file

The first file to look at is the `DrawerContext.js`. As stated above, a Context object is created by invoking `React.createContext`, then wrapping the new context around the parent component providing the values to the context.

**DrawerContext.js**

{lang=javascript}
<<[src/DrawerContext.js](./protected/source_code/newline-modernize-react-app-use-context/src/DrawerContext.js)

If you've used Context before, the code snippet above shouldn't look too foreign.

It's a simple new Context object named `DrawerContext` with a `showDrawer` state value and a `toggleDrawerState` function. Both are undefined or empty properties that will be supplied with values in the `App` component where the Context Provider will be initialized.

T> **I like to define properties in my context objects**
T>
T> This may be my own personal preference, but I like to explicitly define the properties the context will be responsible for (although I don't usually give them default values) so that I can quickly glance back at a specific context file and see what it contains. It's not a necessity, though.

#### Next, open up the App.js

The `App.js` file is where the `DrawerContext` component we just looked at is initialized as a Context Provider.

Within this component, I define a local state variable named `showDrawer` and a function named `toggleDrawerState`.

T> In this example, the local variables possess the same names as the properties I set in the `DrawerContext` component, but it doesn't have to be that way. I do it for convenience, ease of understanding how these variables relate to one another, and so that I can take advantage of the [JavaScript ES6 property shorthand](https://alligator.io/js/object-property-shorthand-es6/).
T>
T> If I wanted to name my local variables something different like: `isDrawerOpen`, I would assign it as the value to associate with `showDrawer` in the Context Provider like so: `value={{ showDrawer: isDrawerOpen, ... }}`

Once those two variables are defined, they're passed into the `DrawerContext.Provider` using `value={{ showDrawer, toggleDrawerState }}`, which wraps the whole component's JSX.

**App.js**

{lang=javascript}
<<[src/App.js](./protected/source_code/newline-modernize-react-app-use-context/src/App.js)

You'll notice in the JSX itself, the variables defined in this component are referenced as well. The `showDrawer` state is used to show or hide the button to open the drawer, and the `<button>`'s `onClick` function calls the `toggleDrawerState` function to flip `showDrawer`'s value from `false` to `true` in the DOM.

Although this `toggleDrawerState` function is simple, by defining a function that can be assigned to a property in the Context object, we can easily handle more complicated data transformations before updating the state when needed.

I> **This `toggleDrawerState` function is the key to updating the state of a parent variable from a child component.**
I>
I> Although React props are immutable once passed to child components (which is why you can't just pass `setShowDrawer` in the Context or directly to a child component through props — it won't update the state of `showDrawer` in the parent), declaring a function that can take in a variable and update state _within the parent component_ does work.
I>
I> This was the missing link I had trouble recognizing as I learned how to use Context myself, in case it helps make it click for you, too.

Once the button is clicked, it disappears from view, and the immediate child component, `InBetweenComponent`, and its own child component take center stage.

#### The inbetween component is just there for the example

Very briefly, we'll look at the aptly named `InBetweenComponent.js`. This functional component exists for the sole purpose of being a component _in between_ the parent controlling the state and the child consuming it to better illustrate why you'd want to avoid prop drilling the values from `App`.

**InbetweenComponent.js**

{lang=javascript}
<<[src/InbetweenComponent.js](./protected/source_code/newline-modernize-react-app-use-context/src/InbetweenComponent.js)

As you can see, this component needs nothing from its direct parent, `App`; it is as simple as functional components can get.

Its child `DrawerComponent` does, but since `InBetweenComponent` itself needs none of those values, there's no point passing them through this component to reach the `DrawerComponent` if we can avoid it.

#### Drawer component: The child who needs useContext

Okay, we've reached the child component where the drawer lives. This is finally where our `useContext` Hook comes into play.

The `useContext` Hook is imported at the top of the file along with the `DrawerContext`, then right inside the component initialization, a local variable named `drawerContext` is created by passing the `DrawerContext` object into the `useContext` Hook.

Now, this local `drawerContext` has access to all the state variables passed into the Provider in our parent component (`showDrawer` and `toggleDrawerState`).

**DrawerComponent.js**

{lang=javascript}
<<[src/DrawerComponent.js](./protected/source_code/newline-modernize-react-app-use-context/src/DrawerComponent.js)

In `DrawerComponent`'s JSX, a local `<button />` is present. This button's `onClick` function is attached to the `drawerContext.toggleDrawerState()` function, and it passes the `false` boolean in, which sets the `showDrawer` state all the way back up the React hierarchy tree to `false`.

And that's all there is to it.

Once the button's clicked, the drawer with its purple background disappears once again, and we're left viewing the `Open Drawer From Parent` button.

**My aha moment was understanding that while _I couldn't directly pass a state's setter_ (like `showDrawer`) to a child component and update that state in the parent, _I could pass a function_ to trigger that state to update in the parent component.** Once I figured that out, I really started to see the value of Context.

To me, the hooks syntax of calling `useContext` is a lot less confusing than trying to wrap components in `Context.Consumer`.

The Provider became more straightforward as I used it and because only one component can be responsible for the state variables going into the context. I always felt a little shaky on the consumer pattern with class components, though, since multiple children can consume the context from the Provider.

I> **Context !== Redux**
I>
I> A common misconception about [React's Context API](https://reactjs.org/docs/context.html) is that it is a one-to-one replacement for a state management library like [Redux](https://react-redux.js.org/) or [Recoil](https://recoiljs.org/). It's not.
I>
I> When you think about what Context actually does, it functions to _pass state_ around an application without having to "prop drill" (i.e., get state to a component several levels deep in a component tree without the intermediate components being aware of that state). But the _state itself_ is still defined within a particular component.
I>
I> What Redux or Recoil does is _own and manage_ a centralized state throughout an app so that the state is available to all components that need it, but _none of the components_ are responsible for defining that state first.
I>
I> This is beside the point, but I think it's worth stating because there are so many conversations about replacing Redux with Context, and it's not so simple as that. The two don't really do the same thing.
I>
I>(And yes, many projects are probably over-engineered, employing Redux before they really need to, when a few Context components would suffice just fine.)

And with that, we've made it to the end of another lesson already! Well done, well done!

Okay, there's one final hook I'd like to cover, and it's (arguably) the biggest and most important update that the React team introduced with hooks — the Custom Hook. Yes, you heard that right, custom hooks.

You ready?

---
