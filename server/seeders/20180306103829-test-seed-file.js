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
    return queryInterface.bulkInsert('Users', [{
      username: 'Dome shots',
      email: 'domeshot@gmail.com',
      password: 'qwertyuiop',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01'
    }, {
      username: 'drizzydrake',
      email: 'email@gmail.com',
      password: 'qwertyuiop',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01'
    }]);
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    return queryInterface.bulkDelete('Users', [{
      username: 'Dome shots',
      email: 'domeshot@gmail.com',
      password: 'qwertyuiop',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01'
    }, {
      username: 'drizzydrake',
      email: 'email@gmail.com',
      password: 'qwertyuiop',
      createdAt: '2018-03-05 12:01:18.936+01',
      updatedAt: '2018-03-05 12:01:18.936+01'
    }]);
  }
};
