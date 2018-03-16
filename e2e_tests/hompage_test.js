const URL = 'http://localhost:8080';

module.exports = {
  'Homepage Test': (client) => {
    client.url(`${URL}`)
      .waitForElementVisible('body', 2000)
      .assert.title('More Recipes')
      .assert.visible('h3.carousel-h3')
      .assert.containsText(
        'h3.carousel-h3',
        'Handcrafted recipes made by local chefs'
      )
      .assert.visible('input.form-control')
      .assert.visible('h2.homepage-h2')
      .assert.containsText('h2.homepage-h2', 'Popular Recipes of the week')
      .assert.visible('#carouselExampleIndicators')
      .assert.visible('.card')
      .click('#favbutton')
      .pause(1000)
      .assert.elementPresent('.toast')
      .click('#viewButton')
      .pause(1000)
      .assert.urlContains('http://localhost:8080')
  },
  'Search for recipes': (client) => {
    client.url(`${URL}`)
      .waitForElementVisible('body', 7000)
      .assert.visible('input#searchParamId')
      .setValue('#searchParamId', 'Fried rice')
      .pause(2000)
      .waitForElementPresent('.card', 7000)
      .assert.elementPresent('.card')
      .pause(2000)
      .clearValue('#searchParamId')
      .setValue('#searchParamId', 'balooon')
      .pause(2000)
      .waitForElementPresent('p.search-text', 5000)
      .assert.elementPresent('p.search-text')
      .pause(2000);
  },
  'Show a 404 page for invalid routes': (client) => {
    client.url(`${URL}/jdsdksdjksdjskdj`)
      .waitForElementVisible('body', 7000)
      .assert.visible('.section-bck')
      .assert.visible('.p-section')
      .assert.visible('#homepageLink')
      .pause(5000)
      .click('#homepageLink')
      .waitForElementNotPresent('.section-bck', 7000)
      .assert.elementNotPresent('.section-bck')
      .waitForElementPresent('.under-carousel-div', 7000)
      .assert.elementPresent('.under-carousel-div')
      .pause(5000)
      .end();
  }
};
