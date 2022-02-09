---
title: 'Module 6 Introduction'
role: 'INTRODUCTION'
description: 'Introduction to module 6: The useContext Hook'
privateVideoUrl: https://fullstack.wistia.com/medias/41j2ju5t15
isPublicLesson: false
---

# Module 6 introduction

Although it still looks the same on the surface, Hardware Handler's becoming a whole new application under the hood.

In our last module, we rewrote some pieces of code into custom hooks that multiple components could use and simplified our components using them in the process.

Now it's time to take a closer look at where the Context API can come into play and make our code even simpler to read and understand. Prop drilling is an anti-pattern in React, but context makes that a thing of the past, and with the addition of the `useContext` Hook, we can now grab state from anywhere in our application — no matter if it's a class component or a functional component.

This module will focus on:

- Identifying where props are being passed to child components that context could handle instead
- Setting up multiple contexts with values and functions to support different parts of the application

Let's get to it.

---
