---
title: 'Module 8 Introduction'
role: 'INTRODUCTION'
description: 'Introduction to module 8: Cypress e2es'
privateVideoUrl: https://fullstack.wistia.com/medias/k7qrsrggeo
isPublicLesson: false
---

# Module 8 introduction

Our last module began focusing on the other piece of enterprise-level apps that is so important: not the code itself but the integration tests instilling confidence in us as developers that the code we're writing isn't breaking existing functionality.

Integration tests are a good, speedy way to test that various pieces of an app work together well. They're the place to test both happy and unhappy code paths, but they're not the only form of testing we should have.

Another form of testing is end-to-end testing (e2e) — the testing that simulates exactly how a user would interact with our app. Even if our unit tests confirm a few components work together, end-to-end tests can reveal broken, mission-critical user flows when our _whole application_ runs.

They are another line of defense against us introducing buggy code into production.

In this module, we will continue reinforcing our confidence in the app by adding a series of end-to-end tests covering the most essential functions in Hardware Handler. We'll go over:

- An introduction to the most popular e2e testing library available today, Cypress, how it makes testing easy, and what exactly we should test with it
- How to set up end-to-end tests in our application and make them work for us
- Writing tests and mocking API calls and test data with Cypress
- Using the experimental Cypress Studio feature to help us write tests by demonstrating to Cypress how the test should work.

---
