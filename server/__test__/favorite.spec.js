import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';
const favoriteApi = '/api/v1/users';

describe('Tests for Favorites API endpoint', () => {
  describe('Handle addition of user favorites', () => {
    it(
      `Should return an error message when a user who
 is not signed in attempts to favorite a recipe`,
      (done) => {
        request.post(`${recipesApi}/${recipes[0].id}/favorites`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message)
              .to.equal('You need to be logged in to perform this action.');
            done();
          });
      }
    );
    it('Should return an error message for an invalid route', (done) => {
      request.post(`${recipesApi}/${recipes[0].id}/favorite`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it(
      'Should successfully favorite a recipe by a logged-in user',
      (done) => {
        const testUser = { ...users[1] };
        request.post(`${recipesApi}/${recipes[0]
          .id}/favorites?token=${testUser.tokens}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message)
              .to.equal('Recipe added to your list of favorites.');
            done();
          });
      }
    );
    it('Should return the favorites of a logged in user', (done) => {
      const testUser = { ...users[1] };
      request.get(`${favoriteApi}/${testUser
        .id}/favorites?token=${testUser.tokens}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.be.a('string');
          expect(res.body.recipes).to.be.an('array');
          done();
        });
    });
    it(
      `Should return an empty array of favorites
 for a logged in user without a favorite`,
      (done) => {
        const testUser = { ...users[0] };
        request.get(`${favoriteApi}/${testUser
          .id}/favorites?token=${testUser.tokens}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.message).to
              .equal('You currently have no favorites.');
            done();
          });
      }
    );
    it('Should return an error message if' +
      ' the recipe does not exist', (done) => {
        request.post(`${recipesApi}/100/favorites?token=${users[0]
          .tokens}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(404);
            expect(res.body.message).to.equal('Recipe not found.');
            done();
          });
      });
    it('Should prevent a user from favoriting his/her own recipe', (done) => {
      const testUser = { ...users[0] };
      const testRecipe = { ...recipes[0] };
      request.post(`${recipesApi}/${testRecipe
        .id}/favorites?token=${testUser.tokens}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application.json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          done();
        });
    });
  });
});
