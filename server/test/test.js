import chai from 'chai';
import supertest from 'supertest';
import validateFunction from '../validators/validateinput';
import app from '../app';

const expect = chai.expect;
const request = supertest(app);
let data = {};
let updateData = {};
const upVote = '1';

describe('API Endpoints testing', () => {
  describe('Get all recipes in the application', () => {
    beforeEach(() => {
      data = {
        id: 1,
        name: 'Banana milk shake',
        description: 'Probably the best milk shake you ever had in your entire life',
        category: 'Dessert',
        ingredients: ['Milk', 'Banana', 'Olive oil'],
        instructions: ['Blend the banana properly', 'Filter and shake'],
        upVote: 0,
        downVote: 0,
        favorite: 0,
        reviews: [
          {
            review: '',
          },
        ],
      };
      updateData = {
        name: 'Banana milk shake',
        description: 'Probably the best milk shake you ever had in your entire life',
        category: 'Dessert',
        ingredients: ['Milk', 'Banana', 'Olive oil'],
        instructions: ['Blend the banana properly', 'Filter and shake'],
      };
    });
    it('Should get all the recipes in the application', () => {
      request.get('/api/v1/recipes')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res).to.be.an('object');
        });
    });
    it('Should create new recipe in the application', () => {
      request.post('/api/v1/recipes')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
        });
    });
    it('Should update the current recipe in the application', () => {
      request.put('/api/v1/recipes/:recipeId')
        .send(updateData)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res).to.be.an('object');
        });
    });
    it('Should delete the recipe in the application', () => {
      request.delete('/api/v1/recipes/:recipeId')
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
    it('Should upvote the current recipe', () => {
      request.post('/api/v1/recipes/:recipeId/testVote')
        .send(upVote)
        .end((err, res) => {
          expect(res.status).to.equal(201);
        });
    });
  });
});
