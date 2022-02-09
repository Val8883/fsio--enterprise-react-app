---
title: 'Module 1 Summary'
role: 'LESSON'
description: This lesson is a summary of the React Hooks we've covered in Module 1.0
privateVideoUrl: https://fullstack.wistia.com/medias/r0jrfmluvr
isPublicLesson: false
---

# Module 1 Summary

This lesson is a summary of what we've covered in Module 1.0.

In this module, we learned:

## Why hooks? What problems do they solve?

The introduction of hooks into the React framework aimed to address problems that had arisen from only allowing state to exist in class-based components.

Problems like:

- Logic that can't be reused between components
- Classes that confuse people and machines
- Components with so much stateful logic they're hard to understand

## useState Hook

Our first hook to get familiar with was the `useState` Hook, the hook most similar to `this.state`, which everyone who's worked with React for any length of time is familiar with.

We looked at some functional component examples employing `useState` and compared them to their state component equivalents.

## useEffect Hook

Next up, we looked at the `useEffect` Hook, the hook responsible for side effects like:

- Data fetching
- Updating the DOM
- Subscribing to event listeners

Unlike React lifecycle methods, where disparate data is grouped together, and there are only a few methods to choose from, `useEffect` allows for many separate hooks whose side effects will only trigger when the variables they depend on change.

## useRef Hook

A lesser-known (but still very important hook) is the `useRef` Hook we discussed next.

This hook builds on the `ref` already present in React, most commonly used to imperatively instruct components how to act, like telling a component with an input to focus on the input once it's rendered in the DOM.

But `useRef` goes beyond this: it makes it possible to keep track of values over the life of a functional component without causing a component re-render like `useState` would.

Although this may not seem like a big deal, `useRef` opens up a ton of possibilities within functional components that were previously unheard of. It's really an ace in the hole when you finally realize you need it.

## useContext Hook

The final hook we got acquainted with is the `useContext` Hook, which takes React's `Context API` to a whole new level.

Now, any component, both class and functional, can provide or consume context, thus avoiding prop drilling and improving providing relevant state data only to the components that actually need it.

## Custom hooks

And last but not least, we discussed custom hooks.

Custom hooks are not actually a new hook in React, but the idea that we can extract groups of hooks providing certain functionality into functions to be reused among many components.

The real beauty of custom hooks is that they're functions, so we can decide what sorts of arguments they accept and what they return, and even though the logic is abstracted into a separate function, React interprets it just as if the hooks were inline in the components themselves.

Custom hooks are a convention that naturally follows from the design of hooks, rather than a React feature.

## More hooks

There's a handful of other hooks available, which you can read more about [here](https://reactjs.org/docs/hooks-reference.html), if you'd like. But the hooks I've covered in the previous lessons are the ones I find myself reaching for the most often.

## Next module: Upgrade the React app

Now that we're more confident with hooks we'll be using to upgrade our existing React application, it's time to put them into practice.

But before we can do that, we need to upgrade the version of React our application is running on (our current version doesn't support hooks), troubleshoot any issues we might encounter to make it run, and ensure that all the developers working on the app will be working with the same versions of the application.

Let's get started.

---
