[![Build Status](https://travis-ci.org/Billmike/More-Recipes.svg?branch=develop)](https://travis-ci.org/Billmike/More-Recipes)  [![Test Coverage](https://api.codeclimate.com/v1/badges/4eec654ff50f54688b72/test_coverage)](https://codeclimate.com/github/Billmike/More-Recipes/test_coverage)  [![Coverage Status](https://coveralls.io/repos/github/Billmike/More-Recipes/badge.svg?branch=master)](https://coveralls.io/github/Billmike/More-Recipes?branch=master)

# More-Recipes
A recipe application that enables users share insightful recipes.

##  Usage
-  Download the local repo (make sure you are on the develop branch)
-  cd into More-Recipes
-  Open ```index.html``` to see the home page and get started.

##  Testing out the routes

-  cd into the More-Recipes folder
-  run ```npm install``` to install local dependencies
-  run ```npm start``` to start up the development server. If you have installed nodemon, you can run ```npm run start:dev``` instead.
-  Open up Postman and test out the following routes
  -  POST ```localhost:8080/api/v1/recipes```
  -  GET ```localhost:8080/api/v1/recipes```
  -  PUT ```localhost:8080/api/v1/recipes/:recipeId```
  -  DELETE ```localhost:8080/api/v1/recipes/:recipeId```
  -  POST ```localhost:8080/api/v1/recipes/:recipeId/reviews```
  -  GET ```localhost:8080/api/v1/recipes/sort/votes```

##  Running tests

-  run ```npm test``` to make sure all tests are passing.


