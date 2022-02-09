---
title: 'Module 5 Summary'
role: 'LESSON'
description: This lesson is a summary of module 5.0's custom hooks we added to Hardware Handler.
privateVideoUrl: https://fullstack.wistia.com/medias/v4zrca1bsu
isPublicLesson: false
---

# Module 5 summary

This lesson is a summary of what we've covered in Module 5.0.

In this module, we learned:

## How to identify duplicate app functionality and refactor it into a custom hook

We looked at how a couple of components in our app both called the same department API for different uses.

With a few minor tweaks to a new custom hook we made, it worked perfectly for both scenarios. And we simplified the code in both components that needed the data.

## A way to make complex components simpler and easier to understand and maintain

Custom hooks can also serve the function of taking large, complicated components and breaking them down into less daunting blocks of code.

The `useProducts` custom hook gave us a way to take some of the complex API calls and data transformations away from being tightly coupled to the components using them while still maintaining the same functionality.

This is something all future developers touching the codebase will benefit from.

## To simplify code beyond the components the custom hook impacts

With a little analysis, we identified two API calls so similar that the data needed for both could actually be done in one API call instead.

And in the process of refactoring one hook to take the place of two API calls, we were also able to simplify our `checkoutService` file, simplify our possible error states, and simplify a child component consuming props from its parent.

That's a huge win.

## Next module: Bring in the Context API to simplify app state management

Creating custom hooks is a fantastic achievement — it really helps solidify a developer's understanding of how React Hooks can work in so many situations.

And now, it's time to bring in the Context API and the `useContext` Hook we went over many modules ago.

Context will allow us to simplify passing and accessing state within our app, and I think you'll be pleasantly surprised at what we can achieve with it.

I'll tell you: when context finally clicked for me, I didn't realize how much of a difference it would make to my development skills with React.

---
