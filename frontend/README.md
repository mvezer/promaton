# Assignment Front-end

This service allows a user to login and retrieve their assignments.

## Expected user flow

1. Login on the front page
2. Retrieve the assignments (with their details) for the logged-in user
3. Click through the assignment list to select what to view
4. Select a specific assignment to view it

### Related services

- [`images`](../images/README.md) - the image serving backend

  > [!TIP] Don't forget to start the `image` service too to retrieve the images.

- all additional backend services you are going to create 🙂

### Suggestions

- Look out for `TODO(xyz): ...` and `IDEA: ...` comments in the source code for
  some implementation hints.

## Development Scripts

In the project directory, you can run:

### `yarn`

Installs all the application dependencies and prepares the 3-rd party packages.

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

> 🙈 Currently this application has no tests, don't worry about them this time.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests)
for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best
performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about
[deployment](https://facebook.github.io/create-react-app/docs/deployment) for
more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can
`eject` at any time. This command will remove the single build dependency from
your project.

Instead, it will copy all the configuration files and the transitive
dependencies (webpack, Babel, ESLint, etc) right into your project so you have
full control over them. All of the commands except `eject` will still work, but
they will point to the copied scripts so you can tweak them. At this point
you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for
small and middle deployments, and you shouldn’t feel obligated to use this
feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
