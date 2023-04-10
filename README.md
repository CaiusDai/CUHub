# CUHub

CUHub is an online platform that blends the functionalities of traditional social media and those of "treehole" platform.

# Setup Guidelines

## Frontend

You should do the following operations in the folder `client`. **Do not do them in root**

### ReactFrameWork start up

```bash
# After entering the client folder, user the following command to set up the framework
# this command is used to install the node_modules required by frontend
npm install
```

```bash
# After installed modules, start the frontend with following command to check whether it works well
npm start
```

## Backend

You should do the following operations in the folder `server`. **Do not do them in root**

### PostgreSql

#### Mac

**Server**: Install Postgres.app, which should be the easiest way to install the server. Follow this [link](https://postgresapp.com/) for installation details. Once setup successfully, you should be able to start/close server by opening/closing the Postgres.app. The server will be ready once you open the app and waiting for connections.

**Client**: From Postgres.app, simply click on any database you’d like to connect to. It will automatically open up Terminal or iTerm (depending on your setting in Preferences) with psql CLI running.

After these, you should configure your user's information in `server/src/configs/db.js`. You should create a database in the postsql server use `CREATE DATABASE cuhub;` (I would like to highlight the `;` sign, make sure it is at the end of the command) also make sure the database's name is cuhub. Note:

### Node.js and npm

Recommend use `nvm` to install the `Node.js` as well as `npm`.
Follow this [link](https://github.com/nvm-sh/nvm#install--update-script) to install nvm. To install Node.js as well as npm, simply use command `nvm install node`. Note: If you are facing any problem relating to `node: /lib/x86_64-linux-gnu/libc.so.6: version GLIBC_2.28' not found (required by node)` error, please use command `nvm install 17` instead. After having npm set-up, you can use `npm -v` to check for installation.

Then, run the following commands in your working directory to set up package files and express:

**Do the following under folder `server/`**

```bash
# Set up the package.json. You may ignore if you've got one
# You will have a package.json file after this step.
npm init -y
# Set up the express and pg modules
npm i express pg express-session cors
```

### Table Manipulation

**Do the following under folder `server/`**

Table Creation:

```bash
node ./src/scripts/db_create.js
```

Table Deletion: (Delete the table as well as the data)

```bash
node ./src/scripts/db_delete.js
```

Load Data:

```bash
node ./src/scripts/db_insert.js
```

### Start Server:

```bash
# Run this under server folder
node ./src/index.js

# Or you can configure your package.json script, add a "start" : "node ./src/index.js"
# Then you can start the server via:
npm start
```
