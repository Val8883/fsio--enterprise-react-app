---
title: 'Module 7 Summary'
role: 'LESSON'
description: This lesson is a summary of module 7.0, where we started adding unit and integration tests to our app to increase our confidence our app works as expected.
privateVideoUrl: https://fullstack.wistia.com/medias/4mj4kke9l3
isPublicLesson: false
---

# Module 7 summary

This lesson is a summary of what we've covered in Module 7.0.

In this module, we learned:

## Why React Testing Library and Jest are the de facto testing framework for modern React applications

As the React framework has grown up and evolved, the testing frameworks used to ensure the many pieces of an app continue to function have evolved alongside it.

In the early days, Jest and Enzyme were the dynamic duo, but when hooks were released, a new contender emerged in the form of React Testing Library, and its unique perspective on testing caught on like wildfire.

RTL took integration testing from a fairly brittle thing focused on the underlying implementation details to a more stable, more resilient model focused on the test interacting with the DOM the same way a user might.

## How to set Hardware Handler up for integration testing success

Integration testing is an expected piece of any enterprise-level React application (and many apps not yet that large). This testing gives us confidence as developers that the code we're writing isn't negatively impacting other parts of the app.

With the addition of a few testing libraries in our `package.json`'s `"devDependencies"` and two new sets of commands in the `"scripts"`, we could not only run one or more integration tests at will but also generate detailed code coverage reports that would display in the browser and show exactly which lines were and were not being tested.

We also discussed testing strategies and recommendations about acceptable code coverage percentages.

## How to integration test multiple different pieces of an application

From functional components to custom hooks to API-level JavaScript files, all of these things can be tested to make sure they're working together correctly.

In each lesson, we chose and tested a few files of each type to show many different examples of how it can be done — how to test happy paths when things went right, how to test unhappy paths when errors were thrown, how to set up mocks and share data among different test files.

## Next module: End-to-end tests for Hardware Handler

While integration testing is one piece of the automated testing puzzle, another common testing practice is end-to-end testing.

This is the practice of writing automated tests that go through a full user flow, interacting with the app in a fashion similar to how a user would. Because what's more important than an app working the way a user would expect it to?

We'll employ popular end-to-end testing framework Cypress in the next module to set up and write automated tests that will recreate mission-critical functionality in our app to make sure users can do what they need to do.

Let's get to it.

---
