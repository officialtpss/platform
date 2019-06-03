# Populous Web

This is the main Populous web application. It is built using the [Meteor](http://docs.meteor.com) node framework for the backend and build system, and [React](https://github.com/facebook/react) on the front-end.

This is the public facing application, the admin application is a seperate Meteor project: 
[platform-admin](https://github.com/StrongMan1234/platform-admin).

Most of the API logic for the application is inside seperate packages
([populous-common](https://github.com/StrongMan1234/platform-common)) so it
can be shared between the public and admin apps.

## Development

Make sure you have [Meteor](https://guide.meteor.com/) installed and a recent version of node:

``` shell
$ curl https://install.meteor.com/ | sh
$ node --version
v8.7.0
```

Clone the repository (including sub-modules):

``` shell
$ git clone --recursive git@github.com:StrongMan1234/platform.git
$ cd platform
$ git submodule init
$ git submodule update
```

Install the dependencies and start the development web server

``` shell
$ npm i
$ npm run start
```

**Note: You should run `$ git submodule update --remote` after you `$ git pull` to ensure you have the latest common code**

Note 2: When switching branches, sometimes `$ git submodule update --remote`
doesn't work. Please try it without the `--remote` flag if this happens.

### Signing up and using localhost

### Email Verification
When you sign up it'll say it's sent an email, it hasn't. Go to the Login screen and click 
`Resend email verification link` this will put a URL in the console which will go over two lines,
 on the first line, remove the `=` character and concatenate the rest
 
 E.g.
 
```
I20171107-14:41:00.822(0)? http://localhost:3000/#/verify-email/uWsPUH0JDgDsxcdArIf70pouektBKlQ-J3syfU=
I20171107-14:41:00.822(0)? o-4V3
```

becomes http://localhost:3000/#/verify-email/uWsPUH0JDgDsxcdArIf70pouektBKlQ-J3syfUo-4V3

Enter this, boom, your email is verified. Want to check? Open a Terminal window CD into the 
project directory while running the project and run `$ meteor mongo`.

Replace Name with what you added in the signup
`db.users.find({ firstName: 'Name' }).pretty()`

You should find your email with `"verified" : true` below it.

### KYC Verification

Find your ID using:
Replace Name with what you added in the signup
`db.users.find({ firstName: 'Name' }).pretty()`

You'll find an `_id` propery with a UID string: `"_id:" : "Fi9wCqgMmqPgfMct5"`

Copy that ID in where you see it in this line:
`db.users.update({ _id: "Fi9wCqgMmqPgfMct5" }, { $set: { KYCStatus: 'VERIFIED' } })`

Give it a refresh and you should be KYCVerified, again, you can run:
`db.users.find({ firstName: 'Name' }).pretty()`

Find `"KYCStatus" : "VERIFIED"`

### Directory structure

The applications directory structure follows that of the [Meteor docs](https://guide.meteor.com/structure.html#special-directories) and [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit/wiki/Fractal-Project-Structure).

The [populous-common](https://github.com/StrongMan1234/platform-common) packages
are included as a [git sub-module](https://git-scm.com/book/en/v2/Git-Tools-Submodules).

Use `$ git submodule update --remote` to get the latest version from GitHub.

## Design

Populous uses the following [colour palette](https://coolors.co/363c5d-e0f6f9-302a42-302a42-041f1e):

- purple: `#363c5d`,
- lightBlue: `#e0f6f9`,
- black: `#302a42`,
- lightGrey: `???`

The components from React Storybook are deployed to [Firebase Hosting](https://populous-storybook.firebaseapp.com). Ask Henry for access to the firebase, is wanting to deploy.

### Tests

#### Meteor

Unit tests are all within their packages and written using [Mocha](https://mochajs.org) and [Chai](http://chaijs.com).
Test files are kept next to their module (e.g. `package/file.js` & `/package/file.tests.js`).

Currently their is a bug with the way MongoDB is running inside the Meteor test suite (see issue [here]()).
Because of this I have turned off testing on pre-commit and testing should be ran manually before commiting.

To run the tests manually run: `npm run test`

To run the tests in watch mode run: `npm run watch-tests`

#### React and UI

Have a read of [React UI Testing](https://storybook.js.org/testing/react-ui-testing/).

1. Jest's snapshot testing for Structural Testing
2. Enzyme for interaction testing might be used
3. Since inline-styles  are used, Jest's snapshot testing cab be used for Style Testing
4. We all need to pitch in for manual testing, this can be done when the storybook is deployed to Firebase Hosting, and for more complex UI interactions, testing the app in a staging environment.

##### Jest

Jest will pick up .test.js files.

Read more about using [Jest's matchers](https://facebook.github.io/jest/docs/en/using-matchers.html#content)

In order to use React and ES6 we have a `.babelrc` file. See more[here](https://facebook.github.io/jest/docs/en/getting-started.html#additional-configuration).

##### Storybook

Storybook is configured in `.storybook`. Stories are written in `imports/ui/stories/`.

##### Storyshots

`imports/ui/stories/storyshots.test.js`

Combining Storybook and Jest's Snapshot testing we can save a lot of time, however, it's a bit new.

Here's some of the issues we had getting it up and running:

- Explicitly install `react-test-renderer --dev` https://github.com/storybooks/storybook/issues/1409
- Also make sure that the presets in the .babelrc file were installed: `babel-preset-es2015` and `babel-preset-react`

### Linting

Code linting is also run before each commit. The code style follows that suggested by the Meteor documentation and is based off of the well known Airbnb config.

Meteor automatically adds the Airbnb config.

To run the linting manually run: `npm run lint`

### Ignore pre-commit hooks

You can force a commit by telling git to skip the pre-commit hooks by using `--no-verify` in your `commit` command.

## Deployment

Please see the [wiki](https://github.com/StrongMan1234/platform/wiki/Deployment)

## Testing servers

- Geth Ropsten: `217.138.132.58` Ports: `8541`-http `22`-ssh

- Mongo database: `35.177.68.124` Ports: `22`-ssh
- XBRL database: `35.178.76.240` Ports: `27017`-endpoint `22`-ssh

- Main Platform: `52.56.109.181` Ports: `22`-ssh
- Admin platform: `52.56.236.22` Ports: `22`-ssh

- PXT platform: `35.177.6.124` Ports: `22`-ssh
- PXT Admin: `comming soon`

You can access these servers with the: "PXT-ETH.pem" ssh key
