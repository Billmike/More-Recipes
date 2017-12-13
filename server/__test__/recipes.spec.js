import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import reviews from './seed/reviewSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';
let recipe;

describe('Recipes Endpoint', () => {
  describe('#Test Creating a new Recipe', () => {
    beforeEach(() => {
      recipe = recipes;
    });
    it('Should return a 403 when a user tries to create a recipe without a token', (done) => {
      request.post(recipesApi)
        .send(recipe[0])
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should successfully create a recipe as a logged in user', (done) => {
      const testUser = Object.assign({}, users[0]);
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .send(recipe[0])
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should return a 400 if no name of recipe is provided on creation attempt', (done) => {
      const testUser = Object.assign({}, users[0]);
      const testRecipe = Object.assign({}, recipe[0]);
      delete testRecipe.name;
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 if no description is provided on recipe creation attempt', (done) => {
      const testUser = Object.assign({}, users[0]);
      const testRecipe = Object.assign({}, recipe[0]);
      delete testRecipe.description;
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 if no category is provided on recipe creation attempt', (done) => {
      const testUser = Object.assign({}, users[0]);
      const testRecipe = Object.assign({}, recipe[0]);
      delete testRecipe.category;
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 if no ingredients are provided on recipe creation', (done) => {
      const testUser = Object.assign({}, users[0]);
      const testRecipe = Object.assign({}, recipe[0]);
      delete testRecipe.ingredients;
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
    it('Should return a 400 if no instructions are provided on recipe creation', (done) => {
      const testUser = Object.assign({}, users[0]);
      const testRecipe = Object.assign({}, recipe[0]);
      delete testRecipe.instructions;
      request.post(`${recipesApi}?token=${testUser.tokens[0].token}`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(400);
          done();
        });
    });
  });
  describe('#Test Editing a recipe', () => {
    beforeEach(() => {
      recipe = recipes;
    });
    it('Should return a 403 if a user tries to edit a recipe without a token', (done) => {
      const testRecipe = Object.assign({}, recipe[0]);
      const recipeId = recipe[0].id;
      testRecipe.name = 'New Rice meal';
      request.put(`${recipesApi}/${recipeId}/modify`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should return a 404 if the recipe to be edited is not found', (done) => {
      const testUser = Object.assign({}, users[0]);
      const testRecipe = Object.assign({}, recipe[0]);
      request.put(`${recipesApi}/100/modify?token=${testUser.tokens[0].token}`)
        .send(testRecipe)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
  });
  describe('#Test the posting of reviews', () => {
    beforeEach(() => {
      recipe = recipes;
    });
    it('Should prevent a non-logged in user from posting a review on a recipe', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/reviews`)
        .send(reviews)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should prevent a user from posting an empty review', (done) => {
      const testReview = Object.assign({}, reviews);
      delete testReview.content;
      request.post(`${recipesApi}/${recipe[0].id}/reviews?token=${users[0].tokens[0].token}`)
        .send(testReview)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should return a 404 when a user tries to access a recipe that does not exist', (done) => {
      request.post(`${recipesApi}/100/reviews?token=${users[0].tokens[0].token}`)
        .send(reviews)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Should add a review by an authenticated user', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/reviews?token=${users[0].tokens[0].token}`)
        .send(reviews)
        .end((err, res) => {
          expect(res.status).to.equal(201);
          done();
        });
    });
    it('Should return all the recipes in the application', (done) => {
      request.get(`${recipesApi}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
