---
title: 'Module 2 Summary'
role: 'LESSON'
description: This lesson is a summary of module 2.0, where we upgraded our React version and locked in our project configuration.
privateVideoUrl: https://fullstack.wistia.com/medias/e4opojk9qs
isPublicLesson: false
---

# Module 2 summary

This lesson is a summary of what we've covered in Module 2.0.

In this module, we learned:

## How to upgrade an existing React app

Plenty of React courses and tutorials start off with a brand new Create React App, taking advantage of the latest and greatest the React framework has to offer.

But almost none walk through upgrading an existing, slightly outdated app (which is a situation you're likely to encounter with a long-lived enterprise React app). The update process is documented, but it's not always the smoothest, nor does the process offer advice to troubleshoot when the app won't start up, or a new error appears after upgrade.

But that's alright, because we dealt with it ourselves, and our app is upgraded to the latest `react-scripts`, and it still runs.

## How to use Node Engines and Volta to define our Node.js and Yarn versions

The best kind of development setup is the kind you barely have to think about.

We tried to make development of the app a little easier by defining the Node and Yarn versions our project runs best with by defining the `"engines"` in our React app's `package.json`. This is a great start; anyone new to the project can, at a glance, see what version of Node they should be running for the best local development experience.

Then, we took it one step further and made the whole process even easier by introducing Volta to our project.

Volta, which also works on our `package.json`, takes us having to remember to switch to a specific version of Node.js or npm out of the equation. As long as it's installed on your local machine and defined in a project, Volta will handle switching to the correct JavaScript project dependencies for you. Now there's no reason any developer should have a problem running this application.

## Next module: Configure Prettier and ESLint

Two of the biggest game-changers to my development experience were the additions of Prettier and ESLint to all my projects.

Prettier brought opinionated code formatting to my life and, combined with the VSCode plugin, made it another thing I didn't even have to think about.

ESLint, with the right rules in place, has made me a better JavaScript developer overall.

In the next module, we'll set up both to enhance our application, and soon you'll marvel that you ever developed without them.

---
