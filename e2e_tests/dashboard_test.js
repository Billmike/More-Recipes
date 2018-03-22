const faker = require('faker');

const user = {
  username: 'jackbauer',
  email: 'jackbauer@gmail.com',
  password: 'qwertyuiop'
};

const recipe = {
  name: faker.random.word(),
  description: 'Lorem ipsum dolor imet making waves here',
  imageUrl: 'http://res.cloudinary.com/andela-nigeria/image/upload/v1521002722/pkydklkwiazpath1dktx.jpg',
  category: 'Lunch',
  ingredients: 'Curry\nBread\nMaggi\nSalt',
  instructions: 'Cook well before eating\nMake sure you have it well cooked'
};

const URL = 'http://localhost:8080';

module.exports = {
  'Signin a user into their dashboard': (client) => {
    client.url(`${URL}/login`)
      .waitForElementVisible('body', 7000)
      .assert.visible('#loginContainer')
      .setValue('#email', user.email)
      .pause(1000)
      .setValue('#password', user.password)
      .pause(1000)
      .click('#submitButton')
      .submitForm('#loginFormBody')
      .waitForElementNotPresent('#loginContainer', 7000)
      .assert.elementNotPresent('#loginContainer')
      .url(`${URL}/dashboard`)
      .waitForElementPresent('#dashbordBody', 7000)
      .assert.elementPresent('#dashbordBody')
      .assert.visible('h2.dashboard-h2')
      .assert.containsText(
        'h2.dashboard-h2',
        `Welcome to your Dashboard, ${user.username}!`
      )
      .assert.elementPresent('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes');
  },
  'Create a recipe without complete details': (client) => {
    client
      .assert.visible('h2.dashboard-h2')
      .assert.containsText(
        'h2.dashboard-h2',
        `Welcome to your Dashboard, ${user.username}!`
      )
      .assert.elementPresent('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes')
      .click('#addRecipeID')
      .waitForElementNotPresent('#dashbordBody', 7000)
      .assert.elementNotPresent('#dashbordBody')
      .waitForElementPresent('#AddRecipeDiv', 7000)
      .assert.elementPresent('#AddRecipeDiv')
      .setValue('#recipename', recipe.name)
      .pause(1000)
      .setValue('#descriptionTextArea', recipe.description)
      .pause(1000)
      .setValue('#dropZoneID', recipe.imageUrl)
      .pause(1000)
      .click('#category')
      .setValue('#category', recipe.category)
      .pause(1000)
      .setValue('#recipeingredients', recipe.ingredients)
      .pause(1000)
      .click('#recipe-submit-button')
      .waitForElementVisible('span.has-errors', 7000)
      .assert.elementPresent('span.has-errors')
      .assert.containsText('span.has-errors', 'Input directions on how to cook your recipe')
      .pause(2000);
  },
  'Create a recipe as a logged-in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementPresent('body', 7000)
      .assert.visible('h2.dashboard-h2')
      .assert.containsText(
        'h2.dashboard-h2',
        `Welcome to your Dashboard, ${user.username}!`
      )
      .assert.elementPresent('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes')
      .click('#addRecipeID')
      .waitForElementNotPresent('#dashbordBody', 7000)
      .assert.elementNotPresent('#dashbordBody')
      .waitForElementPresent('#AddRecipeDiv', 7000)
      .assert.elementPresent('#AddRecipeDiv')
      .setValue('#recipename', recipe.name)
      .pause(1000)
      .setValue('#descriptionTextArea', recipe.description)
      .pause(1000)
      .setValue('#dropZoneID', recipe.imageUrl)
      .pause(1000)
      .click('#category')
      .setValue('#category', recipe.category)
      .pause(1000)
      .setValue('#recipeingredients', recipe.ingredients)
      .pause(1000)
      .setValue('#recipeDesc', recipe.instructions)
      .click('#recipe-submit-button')
      .waitForElementNotPresent('#AddRecipeDiv', 7000)
      .assert.elementNotPresent('#AddRecipeDiv')
      .url(`${URL}/dashboard`)
      .waitForElementPresent('#dashbordBody', 7000)
      .assert.elementPresent('#dashbordBody');
  },
  'Delete a recipe by a logged in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 7000)
      .assert.elementPresent('.card')
      .click('#selectRecipe')
      .waitForElementPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        7000
      )
      .assert.elementPresent('.ReactModalPortal .ReactModal__Overlay--after-open')
      .assert.elementPresent('.modal-class')
      .assert.elementPresent('.modal-btn-red')
      .pause(1000)
      .click('.modal-btn-red')
      .waitForElementNotPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        7000
      )
      .assert.elementNotPresent('.ReactModalPortal .ReactModal__Overlay--after-open')
      .waitForElementPresent('.toast', 7000)
      .waitForElementPresent('#dashbordBody', 7000)
      .assert.elementPresent('#dashbordBody')
      .assert.elementPresent('.toast');
  },
  'Edit recipe by logged-in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 7000)
      .assert.elementPresent('.card')
      .click('#editRecipeLink')
      .waitForElementPresent('#editRecipeID', 7000)
      .assert.elementPresent('#editRecipeID')
      .setValue('#recipename', recipe.name)
      .pause(1000)
      .click('#recipe-submit-button')
      .waitForElementNotPresent('#editRecipeID', 7000)
      .assert.elementNotPresent('#editRecipeID')
      .waitForElementPresent('#dashbordBody', 7000)
      .assert.elementPresent('#dashbordBody');
  },
  'Add and remove Recipe from users favorites': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 7000)
      .click('#home-button')
      .waitForElementPresent('.under-carousel-div', 7000)
      .assert.elementPresent('.under-carousel-div')
      .assert.visible('.card')
      .click('#favbutton')
      .pause(9000)
      .click('#favoritesButton')
      .waitForElementPresent('#favorites-container', 7000)
      .assert.elementPresent('#favorites-container')
      .pause(7000)
      .assert.visible('.card')
      .click('#selectFavoriteButton')
      .waitForElementPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        7000
      )
      .pause(1000)
      .assert.visible('.modal-class')
      .click('.modal-btn-red')
      .waitForElementNotPresent(
        '.ReactModalPortal .ReactModal__Overlay--after-open',
        7000
      )
      .assert.elementNotPresent('.ReactModalPortal .ReactModal__Overlay--after-open')
      .waitForElementPresent('#favorites-container', 7000)
      .assert.elementPresent('#favorites-container');
  },
  'Upvote a recipe and leave reviews as a logged-in user': (client) => {
    client.url(`${URL}`)
      .waitForElementPresent('.under-carousel-div', 7000)
      .assert.elementPresent('.under-carousel-div')
      .assert.visible('.card')
      .click('#viewButton')
      .pause(5000)
      .waitForElementNotPresent('.under-carousel-div', 7000)
      .assert.elementNotPresent('.under-carousel-div')
      .waitForElementPresent('#recipe-detail-ID', 5000)
      .assert.visible('h4.recipe-detail-name')
      .assert.visible('h4.recipe-detail-description')
      .assert.visible('h4.detail-title')
      .click('#upvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 7000)
      .assert.elementPresent('.toast')
      .click('#upvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 7000)
      .assert.elementPresent('.toast')
      .click('#downvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 7000)
      .assert.elementPresent('.toast')
      .click('#downvoteid')
      .pause(2000)
      .waitForElementPresent('.toast', 7000)
      .assert.elementPresent('.toast')
      .click('#favoriteid')
      .pause(4000)
      .waitForElementPresent('.toast', 7000)
      .assert.elementPresent('.toast')
      .click('#favoriteid')
      .pause(4000)
      .waitForElementPresent('.toast', 7000)
      .assert.elementPresent('.toast')
      .setValue('#reviewFormId', 'Amazing recipe you got man!')
      .pause(2000)
      .click('#submit-review')
      .pause(5000)
      .waitForElementPresent('.custom-div', 5000)
      .waitForElementPresent('.toast', 5000)
      .assert.elementPresent('.custom-div')
      .assert.elementPresent('.toast')
      .assert.visible('p.review-content')
      .assert.containsText('p.review-content', 'Amazing recipe you got man!')
      .pause(2000);
  },
  'Show client their profile page': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementPresent('body', 5000)
      .click('#profileID')
      .waitForElementPresent('#profileContainer', 7000)
      .assert.elementPresent('#profileContainer')
      .assert.visible('.profile-card')
      .assert.visible('.profile-title')
      .assert.visible('.prop-username')
      .assert.containsText('.prop-username', `${user.username}`)
      .assert.visible('.profile-email')
      .assert.visible('.prop-email')
      .assert.containsText('.prop-email', `${user.email}`)
      .pause(2000)
      .end();
  }
};
