[![Build Status](https://travis-ci.org/Billmike/More-Recipes.svg?branch=develop)](https://travis-ci.org/Billmike/More-Recipes)  [![Test Coverage](https://api.codeclimate.com/v1/badges/4eec654ff50f54688b72/test_coverage)](https://codeclimate.com/github/Billmike/More-Recipes/test_coverage)  [![Coverage Status](https://coveralls.io/repos/github/Billmike/More-Recipes/badge.svg?branch=chore%2Fmake-footer)](https://coveralls.io/github/Billmike/More-Recipes?branch=chore%2Fmake-footer)
[![Maintainability](https://api.codeclimate.com/v1/badges/4eec654ff50f54688b72/maintainability)](https://codeclimate.com/github/Billmike/More-Recipes/maintainability)

# More-Recipes
## Introduction
> **More Recipes** is an application built using React, Redux, and Node that enables users create, share and vote on insightful recipes from around the world.

## Features currently available in the application
* Users can create accounts by signing up with a valid email address and username
* Registered users can login with verified details
* Registered users can add recipes to the application
* Registered users can edit their recipes in the application
* Registered users can delete their recipes in the application
* Registered users can add and remove recipes from their list of favorite recipes
* Registered users can upvote on a particular recipe, and also downvote.
* Registered users can review a recipe and leave their thoughts

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
* Once installation is done, create a ```.env``` file and fill it with the neccessary environment variables (**see ```.env.example``` for the neccessary environment variables required**)
* Create a database to be used with the application
* Migrate database by running 
```sh
> $ sequelize db:migrate
```
* To start the application, run 
```sh
> $ npm run dev
```

##  API docs
For an indepth look at the API build and up-to-date documentation, visit the [api doumentation website](https://more-recipes-app1.herokuapp.com/api-docs) to get started.

##  Running tests
*  Create a test database
* run
```sh
> $ npm run test-local
```

## Current limitations in the application
* Users cannot signup/sign-in with their social media accounts

## How To Contribute
* Fork the repository
* Create a feature branch with a feature.md file
* Write tests and make them pass
* Open a pull request


