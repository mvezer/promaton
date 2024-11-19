# Image service

This service is a TypeScript (Node.js) [Express](https://expressjs.com/) service
providing two URLs:

1. `/` - with just a hello
2. `/assignments/:id/image` with the image of the assignment. It has 3 images
   (one per assignment) in its "database".

## Runtime tips

- To change the port of the service, adjust the according value in `index.ts`

## Development Scripts

In the project directory, you can run:

### yarn

- `yarn watch` creates a typescript compiler / watcher, and starts nodemon so
  the app will reload on change
- `yarn debug` same as watch but with the inspect or on so you can connect from
  your IDE
- `yarn test` to run tests (currently absent)

### `yarn`

Installs all the application dependencies and prepares the 3-rd party packages.

### `yarn start`

Runs the app in the development mode.

> [!NOTE] The service will reload if you make edits.

### `yarn test`

> [!NOTE] 🙈 Currently this application has no tests, don't worry about them
> this time.

### `yarn build`

Builds the app for production to the `.build` folder.

### `yarn serve`

Runs the app from the `.build` folder.

For new changes to be reflected, first run `yarn build` and then `yarn serve`
again.
