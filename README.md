[![Build Status](https://travis-ci.org/Billmike/More-Recipes.svg?branch=develop)](https://travis-ci.org/Billmike/More-Recipes)  [![Test Coverage](https://api.codeclimate.com/v1/badges/4eec654ff50f54688b72/test_coverage)](https://codeclimate.com/github/Billmike/More-Recipes/test_coverage)  [![Coverage Status](https://coveralls.io/repos/github/Billmike/More-Recipes/badge.svg?branch=chore-deploy-to-heroku)](https://coveralls.io/github/Billmike/More-Recipes?branch=chore-deploy-to-heroku)
[![Maintainability](https://api.codeclimate.com/v1/badges/4eec654ff50f54688b72/maintainability)](https://codeclimate.com/github/Billmike/More-Recipes/maintainability)

# More-Recipes
A recipe application that enables users share insightful recipes.

##  Usage
-  Download the local repo (make sure you are on the develop branch)
-  cd into More-Recipes
-  Open ```index.html``` to see the home page and get started.

##  API docs
For an indepth look at the API build and up-to-date documentation, visit the [api doumentation website](https://more-recipes-app1.herokuapp.com/apidoc/) to get started.

  -  POST ```localhost:8080/api/v1/recipes/:recipeId/testVote```
    -  To vote on a recipe, enter the url above and replace ```recipeId``` with a numeric value of a recipe that currently exists.
  
  -  PUT ```localhost:8080/api/v1/recipe/:recipeId```
    -  To update a recipe, enter the url above and replace ```recipeId``` with the id of the recipe you want to update.
  -  POST ```localhost:8080/api/v1/recipes?sort=upVotes&order=desc```
    -  Enter the url above to get the reipes based on their number of votes.

##  Running tests

-  run ```npm test``` to make sure all tests are passing.


