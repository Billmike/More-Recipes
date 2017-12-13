import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';
let recipe;

describe('Tests for Favorites API endpoint', () => {
  describe('#Handle addition of user favorites', () => {
    beforeEach(() => {
      recipe = recipes;
    });
    it('Should return a 403 when a user who is not authenticated attempts to favorite a recipe', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/favorites`)
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
    it('Should return a 404 for an invalid route', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/favorite`)
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it('Should successfuly favorite a recipe by an authenticated user', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/favorites?token=${users[0].tokens[0].token}`)
        .end((err, res) => {
          expect(res.status).to.equal(200);
          done();
        });
    });
  });
});
