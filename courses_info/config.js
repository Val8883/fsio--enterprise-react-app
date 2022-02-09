module.exports = ({ dedent }) => ({
  title: 'The newline Guide to Modernizing an Enterprise React App',
  slug: 'newline-guide-to-modernizing-an-enterprise-react-app',
  permalink: '/courses/newline-guide-to-modernizing-an-enterprise-react-app',
  // posterImageUrl: "./images/tinyhouse-video-banner.png",
  heroVideoUrl: "https://fullstack.wistia.com/medias/yq7jprsdms",
  gitRepoHttpUrl:
    'https://gitlab.com/fullstackio/books/newline-guide-to-modernizing-an-enterprise-react-app',
  publicLessonCount: 0,
  previewPercent: 40,
  modulePrefix: 'module_',
  lessonDirsGlob: 'module_*/lesson_*',
  moduleDirsGlob: 'module_*',
  authorSlugs: ['paigen11'],
  isFree: false,
  isShownPublicly: false,
  previewPagesOnSite: false,
  useDeltas: true,
  posterImageUrl: './images/twitter.jpg',
  ogImageUrl: './images/twitter.jpg',
  twitterPromoImageUrl: './images/twitter.jpg',
  heroPhotoUrl: './path/to/file.jpg',
  heroLogoUrl: './path/to/logo.jpg',
  summary: dedent(`
In this course, you'll learn all the pieces that go into modernizing an existing React application so it can take advantage of the latest framework features and run well for years to come.
  `),
  whatYouWillLearn: {
    items: [
      {
        text: "How to modernize an existing React application according to today's standards",
      },
      {
        text: 'How React Hooks work compared to class components',
      },
      {
        text: 'How config tools Volta and Node engines simplify development',
      },
      {
        text: 'How to set up ESLint and Prettier to improve code quality',
      },
      {
        text: 'How to upgrade an existing React app and refactor the app as you go',
      },
      {
        text: 'How to write integration tests with React Testing Library to ensure app functionality',
      },
      {
        text: 'How end-to-end tests with Cypress can test mission critical user flows',
      },
      {
        text: 'How to incorporate a component library to speed up design and development time',
      },
    ],
  },
  primaryDescriptionMarkdown: dedent(`
In this course we'll dive into all the ways to modernize an existing React application - from tooling and linting, to testing and Hooks. React is a powerful, extremely popular JavaScript framework, but keeping applications up to date with all that it has to offer is tough - especially when dealing with the larger, enterprise-level business applications many developers are responsible for.

## Why this course

The newline Guide to Modernizing an Enterprise React application will cover everything you need to know to confidently work on a React application of any size, in any state, and leave it better than when you found it. 

While many React tutorials start with the latest version of React, or gloss over all the other things required to make sure apps vital to a company's success keep running, this course does not. In 54 lessons spanning 10 modules, it tackles head-on, the many things that must be considered when building and maintaining large, complex React apps.

## Course modules 

As you progress through this course, you'll gain a deeper understanding for how and why React Hooks came to be, the importance of various types of automated testing and project configuration, and how to leverage design systems to improve your application. You will gain a detailed understanding of how to modernize a React app in a real-world scenario, bringing it in line with today's development standards. 

![Home page of the Hardware Handler sample React application](https://d2uusema5elisf.cloudfront.net/courses/newline-guide-to-modernizing-an-enterprise-react-app/module_10/lesson_00.00/public/assets/hardware-handler-home-page.png)

### Part one: tooling and setup

The first part of this course will consist of getting familiar with our example application, and doing the behind-the-scenes work to set it up for success. 

We'll learn about why React Hooks came about and how to use them, how to upgrade an outdated React app successfully, and how to use tools like Volta, ESLint and Prettier to improve the app's code and development experience.

- Module 0: Meet Hardware Handler - our outdated, but promising React application.
- Module 1: [React Hooks](https://reactjs.org/docs/hooks-intro.html#motivation) - why they were created, the issues they solve and how the most common ones work.
- Module 2: Upgrading a React app - our app needs an upgrade to use Hooks, and we'll streamline development with [Volta](https://volta.sh/).
- Module 3: Project configuration - adding [Prettier](https://prettier.io/) and [ESLint](https://eslint.org/) to our app will dramatically improve code quality.  

### Part two: refactoring the code

With our app configured for success, we'll get down to the business of refactoring Hardware Handler. 

I'll show you my strategy for converting class components to functional ones, and we'll go file-by-file keeping the app's functionality intact while upgrading it to use hooks - including custom hooks, and the Context API. 

- Module 4: Classes to functions - we'll take every class component and turn it into a functional component.
- Module 5: [Custom hooks](https://reactjs.org/docs/hooks-custom.html) - we'll identify where custom hooks can simplify our functional components further.
- Module 6: [Context API](https://reactjs.org/docs/context.html) - a few strategically placed React contexts will round out our code improvements.

### Part three: testing

An updated application is only half the battle for enterprise-level apps; development teams must also be confident in their continued success as the apps expand in size and scope. 

We'll add automated testing to our app using the widely accepted testing frameworks React Testing Library and Cypress.

- Module 7: Integration testing - the popular combination of [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) will be used to unit test smaller pieces of our app.
- Module 8: End-to-end testing - the ease of writing e2es with [Cypress Studio](https://www.cypress.io/) will blow you away.

### Bonus: design systems

Finally, I've included a special bonus module about how to incorporate design systems into an already existing application, and switch out components in a systematic way. Design systems and component libraries are quickly gaining ground - especially in big orgs with lots of apps and development teams. 

Being able to effectively use one is an important skill to learn.

- Module 9: [Ant Design](https://ant.design/) - we'll swap in the robust design system's components to handle our app's more complex interactions for us.

![Product page of the Hardware Handler sample React application](https://d2uusema5elisf.cloudfront.net/courses/newline-guide-to-modernizing-an-enterprise-react-app/module_10/lesson_00.00/public/assets/hardware-handler-product-page.png)

## Bottom Line

In 10 modules, we'll go step-by-step taking an app from outdated in every way to up to today's high standards, giving you ample practice and hands-on examples along the way. 

If you've been wanting to get more confident in your React skills _and_ see what it takes to build enterprise apps in today's world, this is the course for you.

![Checkout page of the Hardware Handler sample React application](https://d2uusema5elisf.cloudfront.net/courses/newline-guide-to-modernizing-an-enterprise-react-app/module_10/lesson_00.00/public/assets/hardware-handler-check-out.png)

  `),
  numProjects: 1,
  linesOfCode: 2439,
  ctaFeatures: {
    features: [
      {
        text: 'Learn how to use React Hooks and strategically upgrade React class components, including automated testing.',
      },
      {
        text: 'Modernize an existing React application to take advantage of the latest and greatest features the framework has to offer.',
      },
      {
        text: 'Build an application on par with the expectations of enterprise level apps today: automated integration and end-to-end testing, configuration tools and quality code standards, organized source code, design libraries, and more.',
      },
      {
        text: 'Incorporate a design system library into a React application to speed up design and development time and cut down on the custom code the dev team is responsible for.',
      },
    ],
  },
  authorBios: {
    paigen11: dedent(`
👋 Hi! I'm Paige (@paigen11 on Discord). I'm a Staff Software Engineer for IoT startup Blues Wireless, a host of the podcast React Round Up, and a regular writer and speaker about frontend web development. I really enjoy building beautiful, functional UIs with JavaScript, React, and other cutting-edge tech. 

Since changing careers from marketing to coding, I spent 5 years at The Home Depot learning about modern software development in large orgs, and believe me, there's a lot to know.

Now, I'm sharing what I learned building websites and applications with frontend frameworks like React in this course in hopes of helping other developers succeed in their own careers.
`),
  },
  faq: [
    {
      q: 'Who is this course for?',
      a: 'Intermediate to advanced developers already comfortable with React and somewhat familiar with the React framework but not necessarily well-versed with the newest syntax like React Hooks. Also, for anyone who wants to learn the kinds of things that go into large, long-lived enterprise-sized React apps: the tooling and configuration, testing, design systems and strategies for updating existing apps to keep them fresh and relevant',
    },
    {
      q: 'I already know how to use Hooks, will I still get something out of this course?',
      a: "You sure will. This course goes way beyond React Hooks because the React apps supporting big companies encompass way more than that. We cover integration and end-to-end testing, project tooling and configuration like Volta, Prettier and ESLint, design system library integration and more. You may know React, but there's a lot more to it than just Hooks",
    },
    {
      q: 'What if I need help?',
      a: 'You can ask us questions anytime through the community Discord channel #modernizing-an-enterprise-react-app or by [sending us a message](mailto:us@fullstack.io).',
    },
  ],
});
