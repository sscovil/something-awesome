# Something Awesome

This repository is an ongoing training exercise used to teach full-stack web development from the ground up. The goal is to develop a robust blogging application over time and, in doing so, learn:

* HTML & CSS
* JavaScript (ES6)
* Node.js
* Angular.js
* PostgreSQL
* REST APIs

In addition, the developer will learn to use:

* Git & GitHub for version control and collaboration
* NPM & Bower for package management
* WebPack & related build tools for transpiling

## Prerequisites

The application requires **Git**, **Node/NPM**, **Bower** and **PostgreSQL** to be installed. You should also install an integrated development environment, or **IDE**.

### Git

Git is a free and open source distributed version control system designed to handle everything from small to very large projects with speed and efficiency. It is commonly used by software engineering teams in conjunction with GitHub.com for collaboration.

* [Install Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Create GitHub Account](https://github.com/join)

### Node/NPM & Bower

Node.js is a JavaScript runtime built on the Chrome web browser's V8 JavaScript engine. It is most often used for writing server-side JavaScript. Node Package Manager (NPM) is bundled with it, and is used to easily install and manage code libraries that an application requires. Bower is similar to NPM, but is used to install and manage libraries needed for client-side JavaScript.

* [Install Node/NPM](https://nodejs.org/en/download/)
* [Install Bower](https://bower.io/#install-bower)

### PostgreSQL

PostgreSQL is a powerful, open source object-relational database management system (RDBMS). It has more than 15 years of active development and a proven architecture that has earned it a strong reputation for reliability, data integrity, and correctness. It runs on all major operating systems, including Linux, UNIX (AIX, BSD, HP-UX, SGI IRIX, macOS, Solaris, Tru64), and Windows.

* [Install PostgreSQL](http://postgresapp.com/) (MacOS only)
* [Install PostgreSQL Command Line Tools](http://postgresapp.com/documentation/cli-tools.html) (MacOS only)

### IDE

An integrated development environment (IDE) is a software application that provides comprehensive facilities to computer programmers for software development. An IDE normally consists of a source code editor, build automation tools and a debugger. Most modern IDEs have intelligent code completion and integration with version control tools like Git.

Choose one, or try them all:

* [Install Visual Studio Code](https://code.visualstudio.com/) (recommended, free)
* [Install WebStorm](https://www.jetbrains.com/webstorm/) (recommended, free trial, $130/year)
* [Install Atom](https://atom.io/) (free)
* [Install Sublime Text](https://www.sublimetext.com/) (free)

## Getting Started

To install the app, be sure you have installed all of the prerequisites (see above) and then follow these instructions.

### Overview

1. Configure GitHub SSH
1. Fork repository on Github
1. Clone your fork
1. Add upstream remote
1. Install dependencies
1. Start server

### Configure GitHub SSH

Using the SSH protocol, you can connect and authenticate to remote servers and services. With SSH keys, you can connect to GitHub without supplying your username or password every time you commit and push changes to your code.

Detailed instructions on connecting to GitHub with SSH can be found here:
https://help.github.com/articles/connecting-to-github-with-ssh/

### Fork Repository

A fork is a copy of a repository. Forking a repository enables you to freely experiment with changes without affecting the original project. Begin by forking [this repository](https://github.com/sscovil/something-awesome) on GitHub.

Detailed instructions on forking can be found here:
https://help.github.com/articles/fork-a-repo/

### Clone Your Fork

When you create a repository on GitHub, it exists as a remote repository. You can clone your repository to create a local copy on your computer and sync between the two locations. From the command line, navigate to a directory where you want to keep all of your Git repositories and use the command:

```bash
$ git clone git@github.com:YOUR_USERNAME/something-awesome.git
```

Be sure to replace `YOUR_USERNAME` with your GitHub username!

Detailed instructions on cloning can be found here:
https://help.github.com/articles/cloning-a-repository/

### Add Upstream Remote

You must configure a remote that points to the upstream repository in Git to sync changes you make in your fork with the original repository. This also enables you to sync changes made in the original repository with your fork. From the command line, navigate to the directory of your cloned repository and use the command:

```bash
$ git remote add upstream git@github.com:sscovil/something-awesome.git
```

Detailed instructions on adding an upstream remote can be found here:
https://help.github.com/articles/configuring-a-remote-for-a-fork/

### Install Dependencies

This project uses Node Package Manager (NPM) to manage server-side application dependencies, and and Bower to manage client-side dependencies. Eventually we will eliminate the need for Bower by utilizing a build system, but for now this keeps things clean so we can avoid serving files from our `node_modules` directory.

From the command line, use the command:

```bash
$ npm install && bower install
```

More on installing dependencies with NPM:
https://docs.npmjs.com/getting-started/using-a-package.json

More on installing dependencies with Bower:
https://bower.io/docs/creating-packages/#bowerjson

### Start Server

From the command line, navigate to the root directory of the repository and use the command:

```bash
$ node src/app.js
```

With the server running, open your favorite web browser and visit:
http://localhost:3000

### Environment Variables

In order to prevent uploading private keys, this repository uses a .env file for storing environment variables.

We list .env as a file type in our .gitignore file in order to make sure that the .env file is never committed.

For example, if you want to specify the port number, you would set the `PORT` environment variable in the .env file like so:

```bash
PORT=8080
```

Environment Variables Supported:
* MAILGUN_DOMAIN
* MAILGUN_SECRET
* MAILGUN_ADMIN_EMAIL
* PORT
* PGHOST (default: 'localhost')
* PGUSER (default: process.env.USER)
* PGPASSWORD
* PGPORT (default: 5432)


More on dotenv:
https://www.npmjs.com/package/dotenv

To stop the server, use `CTRL+C`.
