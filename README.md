[![Build Status](https://travis-ci.org/Billmike/More-Recipes.svg?branch=develop)](https://travis-ci.org/Billmike/More-Recipes) [![Coverage Status](https://coveralls.io/repos/github/Billmike/More-Recipes/badge.svg?branch=develop)](https://coveralls.io/github/Billmike/More-Recipes?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/49c250c64c46d991a656/maintainability)](https://codeclimate.com/github/Billmike/More-Recipes/maintainability)

# More-Recipes

## Introduction

> **More Recipes** is an application built using React, Redux, and Node that enables users create, share and vote on insightful recipes from around the world.

## Table of Content
- [Features in the application](#features-in-the-application)
- [Technology stack used](#technology-stack-used)
- [Getting Started](#getting-started)
- [API Docs](#api-docs)
- [Running Tests](#running-tests)
- [How To Contribute](#how-to-contribute) 

## Features in the application

* Users can see a catalogue of recipes well paginated.
* Users can see the most popular recipes in the application.
* Users can create accounts by signing up with a valid email address and username.
* User can search a catalogue of recipes.
* Registered users can login with verified details.
* Registered users can add recipes to the application.
* Registered users can edit their recipes in the application.
* Registered users can delete their recipes in the application.
* Registered users can add and remove recipes from their list of favorite recipes.
* Registered users can upvote on a particular recipe, and also downvote.
* Registered users can review a recipe and leave their thoughts.
* Users receive email notification when they sign-up
* Users get email notification when their recipe is reviewed
* Users can see the number of times their recipe has been viewed
* Users can see the number of favorites their recipe currently has

## Technology Stack used

* NodeJS
* ExpressJS
* PostgreSQL
* Sequelize
* ReactJS
* Redux

## Getting Started

* Before cloning the repo, make sure you have Node and PostgresQL installed on your local machine
* Clone the repo to your local machine

```sh
> $ git clone https://github.com/billmike/more-recipes.git
```

* Change directory into the more-recipes directory

```sh
> $ cd more-recipes
```

* Install all required dependencies by running

```sh
> $ npm install
```

* Once installation is done, create a `.env` file and fill it with the neccessary environment variables (**see `.env.example` for the neccessary environment variables required**)
* Create a database to be used with the application
* Migrate database by running

```sh
> $ sequelize db:migrate
```

* To start the application, run

```sh
> $ npm run dev
```

## API docs

For an indepth look at the API build and up-to-date documentation, visit the [api doumentation website](https://more-recipes-app1.herokuapp.com/api-docs) to get started.

* POST `localhost:8080/api/v1/recipes/:recipeId/testVote`

  * To vote on a recipe, enter the url above and replace `recipeId` with a numeric value of a recipe that currently exists.

* PUT `localhost:8080/api/v1/recipe/:recipeId`
  * To update a recipe, enter the url above and replace `recipeId` with the id of the recipe you want to update.
* POST `localhost:8080/api/v1/recipes?sort=upVotes&order=desc`
  * Enter the url above to get the reipes based on their number of votes.

## Running tests

#### Server-side tests

* Create a test database
* run

```sh
> $ npm run test-local
```

#### Client-side tests

* To run the client-side tests, run

```sh
> $ npm run client-test
```

#### End-to-end tests

* To run the end-to-end tests, make sure you have selenium and chrome-driver downloaded on your local machine. (See the `nightwatch.json` file for paths and how to set it up).
* run

```sh
> $ npm run e2e
```

## Current limitations in the application

* Users cannot signup/sign-in with their social media accounts

## How To Contribute

* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request
