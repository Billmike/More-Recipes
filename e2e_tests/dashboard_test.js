const faker = require('faker');

const user = {
  username: 'jackbauer',
  email: 'jackbauer@gmail.com',
  password: 'qwertyuiop'
};

const recipe = {
  name: faker.random.word(),
  description: 'Lorem ipsum dolor imet making waves here',
  imageUrl: faker.image.imageUrl(),
  category: 'Lunch',
  ingredients: 'Curry\nBread\nMaggi\nSalt',
  instructions: 'Cook well before eating\nMake sure you have it well cooked'
};

const URL = 'http://localhost:8080';

module.exports = {
  'Signin a user into their dashboard': (client) => {
    client.url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#loginContainer')
      .setValue('#email', user.email)
      .pause(1000)
      .setValue('#password', user.password)
      .pause(1000)
      .click('#submitButton')
      .submitForm('#loginFormBody')
      .waitForElementNotPresent('#loginContainer', 3000)
      .assert.elementNotPresent('#loginContainer')
      .url(`${URL}/dashboard`)
      .waitForElementPresent('#dashbordBody', 3000)
      .assert.elementPresent('#dashbordBody')
      .assert.visible('h2.dashboard-h2')
      .assert.containsText(
        'h2.dashboard-h2',
        `Welcome to your Dashboard, ${user.username}!`
      )
      .assert.elementPresent('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes');
  },
  'Create a recipe with a logged-in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementPresent('body', 3000)
      .assert.visible('h2.dashboard-h2')
      .assert.containsText(
        'h2.dashboard-h2',
        `Welcome to your Dashboard, ${user.username}!`
      )
      .assert.elementPresent('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes')
      .click('#addRecipeID')
      .waitForElementNotPresent('#dashbordBody', 3000)
      .assert.elementNotPresent('#dashbordBody')
      .waitForElementPresent('#AddRecipeDiv', 3000)
      .assert.elementPresent('#AddRecipeDiv')
      .setValue('#recipename', recipe.name)
      .pause(1000)
      .setValue('#descriptionTextArea', recipe.description)
      .pause(1000)
      .click('#dropZoneButton')
      .setValue('#dropZoneID', recipe.imageUrl)
      .pause(1000)
      .setValue('#category', recipe.category)
      .pause(1000)
      .setValue('#recipeingredients', recipe.ingredients)
      .pause(1000)
      .setValue('#recipeDesc', recipe.instructions)
      .click('#recipe-submit-button')
      .waitForElementNotPresent('#AddRecipeDiv', 7000)
      .assert.elementNotPresent('#AddRecipeDiv')
      .url(`${URL}/dashboard`)
      .waitForElementPresent('#dashbordBody', 3000)
      .assert.elementPresent('#dashbordBody');
  },
  'Delete a recipe by a logged in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 3000)
      .assert.elementPresent('.card')
      .click('#selectRecipe')
      .waitForElementPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        3000
      )
      .assert.elementPresent('.ReactModalPortal .ReactModal__Overlay--after-open')
      .assert.elementPresent('.modal-class')
      .assert.elementPresent('.modal-btn-red')
      .pause(1000)
      .click('.modal-btn-red')
      .waitForElementNotPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        3000
      )
      .assert.elementNotPresent('.ReactModalPortal .ReactModal__Overlay--after-open')
      .waitForElementPresent('.toast', 3000)
      .waitForElementPresent('#dashbordBody', 3000)
      .assert.elementPresent('#dashbordBody')
      .assert.elementPresent('.toast');
  },
  'Edit recipe by logged-in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 3000)
      .assert.elementPresent('.card')
      .click('#editRecipeLink')
      .waitForElementPresent('#editRecipeID', 3000)
      .assert.elementPresent('#editRecipeID')
      .setValue('#recipename', recipe.name)
      .pause(1000)
      .click('#recipe-submit-button')
      .waitForElementNotPresent('#editRecipeID', 3000)
      .assert.elementNotPresent('#editRecipeID')
      .waitForElementPresent('#dashbordBody', 3000)
      .assert.elementPresent('#dashbordBody');
  },
  'Add and remove Recipe from users favorites': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 3000)
      .click('#home-button')
      .waitForElementPresent('.under-carousel-div', 3000)
      .assert.elementPresent('.under-carousel-div')
      .assert.visible('.card')
      .click('#favbutton')
      .pause(5000)
      .assert.elementPresent('.toast')
      .click('#favoritesButton')
      .waitForElementPresent('#favorites-container', 3000)
      .assert.elementPresent('#favorites-container')
      .pause(3000)
      .assert.visible('.card')
      .click('#selectFavoriteButton')
      .waitForElementPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        3000
      )
      .pause(1000)
      .assert.visible('.modal-class')
      .click('.modal-btn-red')
      .waitForElementNotPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        3000
      )
      .assert.elementNotPresent('.ReactModalPortal .ReactModal__Overlay--after-open')
      .waitForElementPresent('#favorites-container', 3000)
      .assert.elementPresent('#favorites-container');
  },
  'Upvote a recipe and leave reviews as a logged-in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 3000)
      .click('#home-button')
      .waitForElementNotPresent('#dashbordBody', 3000)
      .assert.elementNotPresent('#dashbordBody')
      .waitForElementPresent('.under-carousel-div', 3000)
      .assert.elementPresent('.under-carousel-div')
      .assert.visible('.card')
      .click('#viewButton')
      .pause(5000)
      .waitForElementNotPresent('.under-carousel-div', 3000)
      .assert.elementNotPresent('.under-carousel-div')
      .waitForElementPresent('#recipe-detail-ID', 5000)
      .assert.visible('h4.recipe-detail-name')
      .assert.visible('h4.recipe-detail-description')
      .assert.visible('h4.detail-title')
      .click('#upvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 3000)
      .assert.elementPresent('.toast')
      .click('#upvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 3000)
      .assert.elementPresent('.toast')
      .click('#downvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 3000)
      .assert.elementPresent('.toast')
      .click('#downvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 3000)
      .assert.elementPresent('.toast')
      .setValue('#reviewFormId', 'Amazing recipe you got man!')
      .click('#submit-review')
      .pause(5000)
      .waitForElementPresent('.custom-div', 5000)
      .waitForElementPresent('.toast', 5000)
      .assert.elementPresent('.custom-div')
      .assert.elementPresent('.toast')
      .assert.visible('p.review-content')
      .assert.containsText('p.review-content', 'Amazing recipe you got man!')
      .end();
  },
};
