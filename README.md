# gaming-app
A simple gaming web application

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), using the [Redux](https://redux.js.org/) and [Redux Toolkit](https://redux-toolkit.js.org/) template.

A component based React app, created with CRA and RTK best practices, which differs from a standard Redux app with store creation,
reducer function structure and built in Immer library that makes reducer functions immutable data flow seamless.

App has two main routes,
- Login Page
- Games page
    - Game Detail Page with route parameters

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified, and the filenames include the hashes.<br />
Your app is ready to be deployed!

## Available Scripts in mock folder

#### `yarn start`
Starts the mock api that depends on the json-server module

## CI / CD - Deployment

Deployments are running on Heroku containers, manually you can build, push and release docker images but for this repository Github Actions makes our lives easier 👏<br />
Workflows handle the process of delivering artifacts to Heroku Dynos.

If you have speed luck with you then you should see the live version on
[🚀live version on heroku](https://gaming-app-demo.herokuapp.com/)

[🚀Mock api is running on Heroku](https://gaming-app-mock-api.herokuapp.com/)

And don't forget since the Heroku Dyno is free it will be sleeping most of the time 💤
