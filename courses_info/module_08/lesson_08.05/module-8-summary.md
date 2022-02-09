---
title: 'Module 8 Summary'
role: 'LESSON'
description: This lesson is a summary of module 8.0, where we integrated Cypress into a React app and wrote automated end-to-end tests.
privateVideoUrl: https://fullstack.wistia.com/medias/2i7i1n879a
isPublicLesson: false
---

# Module 8 summary

This lesson is a summary of what we've covered in Module 8.0.

In this module, we learned:

## What's the purpose of end-to-end tests, and How Cypress does it better

End-to-end tests are one more form of automated testing we can use to give us confidence that our application will work as intended.

Unlike unit tests that focus on small pieces of an app's functionality and try to test many possible scenarios, e2es are designed to test the whole flow through an application, and due to their increased run time and complexity, generally only test happy path scenarios.

And Cypress is what's made end-to-end testing much more palatable in recent times. Prior to Cypress, e2e testing was tough to set up, tough to write and debug tests, and tough to cover all possible frontend scenarios — be they multi-browser compatibility or working with many different frontend frameworks.

In 2015, Cypress came in swinging, and in short order, it became the favorite for e2e testing for good reason. With one extra npm library and a locally running instance of an app, Cypress is ready to roll, and its ease of use just keeps getting better.

## How to add Cypress to our app and get us ready to test Hardware Handler

Cypress makes end-to-end testing much easier than it used to be, but there's still some initial configuration required — and some nuances to learn to make the most of all the framework has to offer.

We downloaded Cypress, checked out its recommended e2e testing structure, and added a few new npm scripts and config files to ensure our e2e tests were of the best quality they can be.

## How to write traditional end-to-end tests with Cypress

End-to-end testing is more of an art than unit and integration testing because it involves more thought about what is critical system functionality and then striving to set up data to recreate these scenarios.

We focused on setting up mocked data and API calls in our first few tests to ensure that different necessary paths through the app work.

This gave us a taste of how Cypress interacts with the DOM and how we need to set up data to give the tests what they need each time they're run, independent of what the production data looks like at the time.

## How to use the experimental Cypress Studio feature to create e2e tests

Finally, we looked at a relatively new feature Cypress has unveiled, still behind an experimental feature flag.

Cypress Studio again makes the act of e2e test-writing easier by allowing us to demonstrate what we want it to test and recording our actions into a working e2e test.

It's not quite perfect because mocked test data set up is still required, and after the test actions are written, we need to fill in extra assertions to make sure everything is working, but it's still a marked improvement.

This is definitely something I will use in the future to help make my testing efforts go quicker.

## Next module: Bonus — Add a component library to our app

At this point in time, I'd say you could call this course complete.

We've modernized an enterprise React app from stem to stern. Over the course of these many modules and lessons, we've upgraded an app, rewritten components to use hooks, added configuration, added integration tests, added end-to-end tests, and more.

It's pretty crazy to look back and see how far we've come already, but there's one more module I want to share with you, because especially when it comes to large, long-running applications, there's a good chance you could encounter it, and that is using a component library.

Component libraries can provide us with a whole host of ready-made, already-styled, highly functional components we can plug into our apps to speed up design and development time, and I'll show you how to get started with it in the next bonus module.

---
