import jwt from 'jsonwebtoken';
// import { User } from '../../models';

// const { Recipe } = require('../../models/recipe');

const userOneId = '1';
const userTwoId = '2';

const users = [{
  id: userOneId,
  email: 'someemail@email.com',
  password: 'somepassword',
  username: 'someusername',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ id: userOneId }, process.env.SECRET).toString(),
  }],
}, {
  id: userTwoId,
  email: 'someemailtwo@email.com',
  password: 'somepassword',
}];

const recipes = [{
  id: '1',
  name: 'Rice',
  description: 'So many things here',
  category: 'Lunch',
  img_url: 'https://someimgurlhere.com',
  ingredients: ['Tomatoes', 'Curry', 'THyme'],
  instructions: ['Cook this shii weel', 'Chop to a million pieces'],
}, {
  id: '2',
  name: 'Canda',
  description: 'AMazeballs',
  category: 'Dinner',
  img_url: 'https://somerandomimagehere.com',
  ingredients: ['Array', 'of', 'ingredients'],
  instructions: ['Array', 'of', 'instructions'],
}];

// const populateRecipes = (done) => {
//   Recipe.destroy({}).then(() => Recipe.create(recipes)).then(() => done());
// };

// const populateUsers = (done) => {
//   User.destroy({}).then(() => {
//     const userOne = User(users[0]).create();
//     const userTwo = User(users[1]).create();

//     return Promise.all([userOne, userTwo]);
//   }).then(() => done());
// };

export default {
  recipes, users,
};
