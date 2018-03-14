module.exports = {
  'Homepage Test': (client) => {
    client.url('http://localhost:8080')
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
      .end();
  }
};
