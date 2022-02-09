---
title: 'Module 7 Introduction'
role: 'INTRODUCTION'
description: 'Introduction to module 7: Unit testing'
privateVideoUrl: https://fullstack.wistia.com/medias/6dwu6wmit4
isPublicLesson: false
---

# Module 7 introduction

Up to this point, we've been overhauling our sample application's code, bringing it up to date with the latest and greatest React has to offer: functional components, custom hooks, the Context API — all really good stuff.

But modern app code is only one part of what goes into an enterprise-level app. Another key piece is testing, and specifically for this module, integration testing.

While QA teams can play a crucial role in testing and retesting applications' functionality as new features are added, nothing can test _every single bit_ of pre-existing functionality quite like automated tests can.

And this is where automated integration tests come into play. Automated tests are the tests that development teams can write to test that various pieces of our app work as we expect — _and keep working as we expect_ — even as we modify and add new code. They can run ridiculously fast (faster than a human tester could ever hope to), over and over and over again, performing the exact same test every single time and reassuring us as developers that we're not breaking any functionality that was already there.

Which is why in this module, we're going to dive into testing — an almost required part of enterprise apps nowadays. Here's what we'll cover:

- An introduction to React Testing Library and Jest, why this combination has become the widely accepted testing framework for React apps of all shapes and sizes and a strategy for testing applications
- Setting up our Hardware Handler app to run automated integration tests and code coverage with just a few simple npm scripts and dev dependency testing libraries, plus how to target particular tests, test suites, or test files
- Then, we'll get down to the business of writing automated tests: tests for our functional components, tests for our custom hooks, even tests for our API service calls

Testing is a crucial piece of modern enterprise applications, and I'm excited to show you how I like to approach it.

---
