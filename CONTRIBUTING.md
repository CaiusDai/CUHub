# Contributing guideline

You should follow the steps below to make contribution to the project:

## Submit a PR

### Format your code

Before pushing your code to the repository, please make sure your code is consistent with our code format.
We will check your code format in Github Action. Your code will not be accepted if it could not pass the ci.  
**Make sure you've set up the npm, node environment and has a package.json file. If not, go README to setup**

```bash
#Environment Setting
npm install eslint --save-dev
npm install eslint-plugin-node --save-dev
npm install prettier --save-dev
npm install eslint-config-prettier --save-dev

# Code format: Do this before you push your code
npx eslint .
npx prettier . -w
```

### Commit Title convention

Please be descriptive when you commit your code. A good practice is to follow the format below:  
[Part] <Commit summary\>, for example:

```
[Database][Schema] Create the schema of the database
```

### PR Title convention

A valid PR title should begin with one of the following prefix:

-   `feat`: A new feature
-   `fix`: A bug fix
-   `doc`: Documentation only changes
-   `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
-   `refactor`: A code change that neither fixes a bug nor adds a feature
-   `perf`: A code change that improves performance
-   `test`: Adding missing tests or correcting existing tests
-   `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
-   `ci`: Changes to CI configuration files and scripts
-   `chore`: Other changes that don't modify src or test files
-   `revert`: Reverts a previous commit

You are encourage to check out and review [previous PRs](https://github.com/CaiusDai/CUHub/pulls).
