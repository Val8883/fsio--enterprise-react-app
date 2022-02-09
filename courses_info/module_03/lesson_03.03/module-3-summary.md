---
title: 'Module 3 Summary'
role: 'LESSON'
description: This lesson is a summary of the automated code formatting and linting we set up with the help Prettier and ESLint in Module 3.0.
privateVideoUrl: https://fullstack.wistia.com/medias/fsn2pwsorc
isPublicLesson: false
---

# Module 3 summary

This lesson is a summary of what we've covered in Module 3.0.

In this module, we learned:

## How to add Prettier to automatically format a project's code

Even though code formatting isn't something that affects the end user's experience with the app, it dramatically improves the day-to-day developer experience.

Prettier is an opinionated code formatter with just a handful of options that can be adjusted, and then it takes care of the rest. Just install one new npm package, add a single config file, and you're ready to roll.

Not only does it save devs from having to think about styling code to be readable and consistent, but it also saves teammates having to call it out in PRs (because no one wants to be "that person" on the team).

With the advent of VSCode and the Prettier extension, code formatting gets even easier. So easy, in fact, it can be set up to format the file being worked on automatically.

This will definitely save devs some time and effort they can put towards more important code issues.

## How to add and configure ESLint to improve the project's code

Code linting has existed for years (especially in more strongly typed languages with compilers), but it hasn't been until more recently that linting has become popular in the JavaScript language.

ESLint, the most popular linter today, starts off very barebones and expects a dev team to decide for themselves what rules and standards to follow and enforce.

But Airbnb has taken the time and effort to make their very thorough, React-focused, ESLint configuration public and extendable, so any dev team can incorporate it into their project and have a great starting point for linting in line with React best practices.

The setup of ESLint in our project is a little more involved than configuring Prettier, but well worth the effort, especially when you can run one command to see linting issues and run another to fix some of them automatically.

And once more, there's a lovely VSCode extension that will automatically lint files, identifying issues as a developer adds to them, too.

## Next module: Refactor our app's classes to use hooks

It's finally time to start changing the code in our app. It's time to take those class-based components and convert them to functional components taking advantage of hooks.

In the next module, each lesson will build up our confidence of how to employ hooks to take the place of classes while ensuring app functionality remains the same. We'll go file by file in each lesson, working our way up from the simpler files to convert to hooks to the more complex ones by the end.

---
