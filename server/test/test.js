import { expect } from 'chai';
import supertest from 'supertest';

const server = require('../app');

const request = supertest(server);

let data = {};
let rev = {};

describe('More-Recipes', () => {
  beforeEach(() => {
    data = {
      recipes: [
        {
          id: 1,
          name: 'Shrimp Fried Rice',
          description: 'An italian Dish with the best taste in the world.',
          category: 'Lunch',
          ingredients: ['rice', 'shrimp', 'onions', 'olive oil'],
          instructions: ['Perboil Boil rice', 'Wash shrimp properly', 'Steam for 1 - 3 hrs', 'Fry meat'],
        },
      ],
    };
    rev = {
      reviews: {
        id: 1,
        content: 'Amazing recipe. I can\'t wait to try it out with my family members!',
      },
    };
  });
  it('It should get all the recipes in the application', (done) => {
    request.get('/api/v1/recipes')
      .end((err, res) => {
        expect(res).to.be.an('object');
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('It should create a review for the selected recipe', (done) => {
    request.post('/api/v1/recipes/:recipeId/reviews')
      .send(rev)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res).to.be.an('object');
        done();
      });
  });
});
