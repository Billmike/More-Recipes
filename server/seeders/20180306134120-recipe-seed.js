'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Recipes', [{
      id: 5,
      name: 'Amazing new great recipe',
      description: 'Something amazing for your taste buds',
      category: 'Lunch',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01',
      owner: 1,
      ingredients: 'Beans Rice Tomatoes',
      instructions: 'Cook well. Dont sleep on it',
    }, {
      id: 10,
      name: 'Great things seeding recipe',
      description: 'Migos favorite recipe',
      category: 'Dinner',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01',
      owner: 1,
      ingredients: 'Coolest uzzi lobster',
      instructions: 'Rockstar baller',
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Recipes', [{
      id: 5,
      name: 'Amazing new great recipe',
      description: 'Something amazing for your taste buds',
      category: 'Lunch',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01',
      owner: 1,
      ingredients: 'Beans Rice Tomatoes',
      instructions: 'Cook well. Dont sleep on it',
    }, {
      id: 10,
      name: 'Great things seeding recipe',
      description: 'Migos favorite recipe',
      category: 'Dinner',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01',
      owner: 1,
      ingredients: 'Coolest uzzi lobster',
      instructions: 'Rockstar baller',
    }]);
  }

};
