---
title: 'Module 6 Summary'
role: 'LESSON'
description: This lesson summarizes our addition of the Context API and useContext Hooks in Module 6.0.
privateVideoUrl: https://fullstack.wistia.com/medias/heb4ch0p5s
isPublicLesson: false
---

# Module 6 summary

This lesson is a summary of what we've covered in Module 6.0.

In this module, we learned:

## Where the Context API can be useful to avoid passing props

When props are passed more than a few levels through components, it's probably a good idea to think about employing the context API instead to avoid unnecessary complexity in components that don't need those props themselves.

We learned not only how to set up a context object `Provider` but also how to add `useContext` Hooks to multiple components consuming the values from that `Provider`.

## How to create multiple contexts nested within other components

Contexts don't just have to live at the top level of a component to work. In fact, all the `Provider` has to wrap is the JSX of the child components that will need to access its state and nothing else.

Not only that, but these contexts can be used to access both functions and values from parents with no problem. Need to change a value from a child in a parent? Context functions can handle that.

## Next module: Unit testing our app

Automated testing is an important part of any enterprise-level React application. It's an expectation nowadays, not an exception.

And there's no better way to give us a sense of security that our refactoring or new feature additions haven't broken any existing functionality in our app than with automated tests.

With the advent of React Hooks, the accepted unit testing library of Jest and Enzyme was forsaken in favor of Jest and React Testing Library, which took a very different approach to testing. An approach, which in my opinion, makes a lot more sense once you wrap your head around it.

In the next module, we'll get our first look at React Testing Library's testing philosophy, how to set up our app to run unit tests and generate code coverage reports with a few simple npm commands, and how to test React components using hooks as well as React Custom Hooks themselves.

---
