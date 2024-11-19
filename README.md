# Back-end/Full-stack engineer assignment

To see how you work and think, we will do a little programming today.

**We will focus on:**

1. If you can produce quality work in a timely manner
2. Your knowledge of several concepts in microservices and security

For this exercise, you will **not** be judged on:

1. Code repo management.

   > (quality of commit messages, PR names, branch names, and all that). You can
   > even hack it in a Dropbox folder if that’s your thing.

2. Over-documenting.

   > We prefer you write clear code, and that should not require a lot of
   > documentation. Don’t write more docs than you normally would.

3. Web design.

   > We don't judge on aesthetics (colors, spacing etc.), but usability and
   > clarity of the demo is appreciated, approach it as you usually would.

4. Form validation.

   > We are not going to do any complicated edge case testing or supply any
   > anomaly-input on purpose. We are curious what you do demo instead.

## Preliminaries

You've

- Installed `nvm` so you can install node versions
  1. Use `nvm install` to get the right node version from [`.nvmrc`](./.nvmrc)
  2. Next run `nvm use` to use the installed configured version
- All `node` projects in this collection use `yarn` for package management
- Installed `docker` to run different containers

### The assignment

In this repo you will find two services [_lobby_](lobby/) (not implemented yet)
and [_images_](images/), and a [_front end_](frontend/) who together are able to
serve “assignments” to logged-in users, with an image that has to be annotated.
There are two users: Alice and Bob, and there is one reviewer: Rick.

In short:

- [_lobby_](lobby/) is the only one with a database. It has the users, their
  permissions, and all (3) assignments.
- [_images_](images/) serves images to the front end.
- [_front end_](frontend/) calls _lobby_ and _images_ to show assignments to a
  user.

Currently, the lobby service is not implemented yet, and there is no security
setup. Your job is to change that.

You'll have to:

- Make a security plan: either implement security in _lobby_, or create another
  security service.
- Add a database layer to _lobby_ and add all 3 users and all 3 assignments in
  its database. You can create the schema any way you see fit.
- Add security to the _images_ service
- Demonstrate that your backend services work by creating an _API collection_,
  using for instance OpenAPI (Swagger), Postman, cURL or other approach to your
  liking.

You can run all services on your local machine and/or using `docker`. You are
not allowed to (ab)use _lobby_ as a proxy for the _images_ service. Calls have
to go to the _images_ service directly.

**lobby**:

You are allowed to implement this service in JavaScript, Typescript, Python,
Java or Rust, in a framework of your choosing. Persistence should be done in
Postgres, which you can start using `docker-compose up`. You can find the
credentials in the [`docker-compose.yaml`](./docker-compose.yaml) file. Please
don't be afraid to completely replace a service with something else. The current
services are there as place-holder. Pick whatever makes you comfortable.

If you want to, you are allowed to put authentication into a separate service
(creating a total of three backend services: _`images`_, _`lobby`_, and
_`auth`_);

The database should have three users: Bob, Alice (the annotators) and Rick the
reviewer. The database should also contains 3 assignments. For the sake of this
exercise, the assignments hold no other information other than their ID.

The authorization should work as follows:

| User/Permissions | Assignment 1 | Assignment 2 | Assignment 3 |
| ---------------- | ------------ | ------------ | ------------ |
| Bob              | Read/Write   | \-           | Read/Write   |
| Alice            | \-           | Read/Write   | Read/Write   |
| Rick             | Read         | Read         | Read         |

**Images**:

This service serves images for certain assignments. Checkout
[its readme](images/README.md)

**Front-end**:

A [`Create React App`](https://create-react-app.dev/) that is used to login to
the _auth_ (that you've implemented) and downloads images from the _images_
service.

We have already created a simple interface which you can use. It will need small
adjustments based on the results of your work. You can find more information
about it in its README: [frontend/README.md](./frontend/README.md).

### For bonus

Depending on your experience with the above frameworks you might have some time
left. In that case we would like to see:

- Some (unit) tests to prove security works as expected.

  > Consider the testing strategy and tradeoffs, if you would like to add this,
  > describe which approach you'd use. Running such tests could be a way to show
  > the safety and demonstrate specific scenarios.

- Deploying this to your localhost Kubernetes cluster

  > At Promaton, we use Kubernetes extensively. Demonstrating a deployment of
  > your solution / making it Kubernetes-ready can be a great way to invest your
  > potentially remaining time.

- Integrate your solution in the _front end_ application.

  > The _front end_ is currently a skeleton with no calls to the new backend
  > yet. It tries to load images but those fail. You'll have to fix that. You'll
  > also have to make sure the login works correctly, in conjunction with your
  > backend.
