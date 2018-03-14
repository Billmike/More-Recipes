const faker = require('faker');

const user = {
  username: faker.name.firstName(),
  email: faker.internet.email(),
  password: faker.internet.password()
};

const URL = 'http://localhost:8080';

module.exports = {
  'Signup with incomplete user information': (client) => {
    client.url(`${URL}/register`)
      .waitForElementVisible('body', 2000)
      .assert.visible('.card-form')
      .setValue('#username', user.username)
      .pause(2000)
      .setValue('#email', user.email)
      .pause(2000)
      .setValue('#password', '')
      .pause(2000)
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
      .pause(1000)
      .setValue('#email', user.email)
      .pause(1000)
      .setValue('#password', user.password)
      .pause(1000)
      .click('#submitButton')
      .waitForElementNotPresent('.card-form', 3000)
      .assert.elementNotPresent('.card-form')
      .url(`${URL}/dashboard`)
      .waitForElementPresent('#dashbordBody', 3000)
      .assert.elementPresent('#dashbordBody')
      .pause(2000)
      .assert.visible('h2.dashboard-h2')
      .assert.containsText(
        'h2.dashboard-h2',
        `Welcome to your Dashboard, ${user.username}!`
      )
      .assert.elementPresent('h4.dashboard-h4')
      .assert.containsText('h4.dashboard-h4', 'My Recipes');
  },
  'Sign-in a registered user': (client) => {
    client.url(`${URL}/login`)
      .waitForElementVisible('body', 3000)
      .assert.visible('#loginContainer')
      .setValue('#email', user.email)
      .pause(1000)
      .setValue('#password', user.password)
      .pause(1000)
      .click('#submitButton')
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
  'Sign-out a signed-in user': (client) => {
    client.url(`${URL}/dashboard`)
      .waitForElementVisible('body', 3000)
      .waitForElementVisible('a.logout', 3000)
      .pause(1000)
      .click('#logoutButton')
      .waitForElementNotPresent('#dashbordBody', 3000)
      .assert.elementNotPresent('#dashboardBody')
      .waitForElementPresent('.card-form', 3000)
      .assert.elementPresent('.card-form')
      .end();
  }
};
