const user = {
  username: 'jackbauer',
  email: 'jackbauer@gmail.com',
  password: 'qwertyuiop'
};

const URL = 'http://localhost:8080';

module.exports = {
  'Signup with incomlete user information': (client) => {
    client.url(`${URL}/register`)
      .waitForElementVisible('body', 2000)
      .assert.visible('.card-form')
      .setValue('#username', user.username)
      .setValue('#email', user.email)
      .setValue('#password', '')
      .click('#submitButton')
      .waitForElementVisible('span.has-errors', 4000)
      .assert.visible('span.has-errors')
      .assert.containsText(
        'span.has-errors',
        'Please provide a password greater than 8 characters.'
      );
  },
  'Signup with valid credentials': (client) => {
    client.url(`${URL}/register`)
      .waitForElementVisible('body', 5000)
      .assert.visible('.card-form')
      .setValue('#username', user.username)
      .setValue('#email', user.email)
      .setValue('#password', user.password)
      .click('#submitButton')
      .waitForElementNotPresent('#signupForm', 3000)
      .assert.elementNotPresent('#signupForm')
      .url(`${URL}/dashboard`)
      // .waitForElementVisible('#dashbordBody', 5000)
      .waitForElementPresent('#dashbordBody', 3000)
      .assert.elementPresent('#dashbordBody')
      .assert.visible('h2.dashboard-h2')
      .assert.containsText('h2.dashboard-h2', `Welcome to your Dashboard, ${user.username}!`)
      .assert.visible('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes')
      .assert.visible('p.no-recipes-p');
  }
};
