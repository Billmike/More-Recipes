import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';
const favoriteApi = '/api/v1/users';
let recipe;

describe('Tests for Favorites API endpoint', () => {
  describe('#Handle addition of user favorites', () => {
    beforeEach(() => {
      recipe = recipes;
    });
    it(
      'Should return a 403 when a user who is not authenticated attempts to favorite a recipe',
      (done) => {
        request.post(`${recipesApi}/${recipe[0].id}/favorites`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('Denied');
            expect(res.body.message)
              .to.equal('You need to be logged in to perform this action.');
            done();
          });
      }
    );
    it('Should return a 404 for an invalid route', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/favorite`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          done();
        });
    });
    it(
      'Should successfuly favorite a recipe by an authenticated user',
      (done) => {
        const testUser = { ...users[1] };
        request.post(`${recipesApi}/${recipe[0].id}/favorites?token=${testUser.tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(200);
            expect(res.body.status).to.equal('OK');
            expect(res.body.message)
              .to.equal('Recipe added to your list of favorites.');
            done();
          });
      }
    );
    it('Should return the favorites of a logged in user', (done) => {
      const testUser = { ...users[1] };
      request.get(`${favoriteApi}/${testUser.id}/favorites?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.status).to.equal('Success.');
          expect(res.body.message).to.be.a('string');
          expect(res.body.recipes).to.be.an('array');
          done();
        });
    });
    it('Should return an empty array of favorites for a logged in user without a favorite', (done) => {
      const testUser = { ...users[2] };
      request.get(`${favoriteApi}/${testUser.id}/favorites?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(201);
          expect(res.body.message).to.equal('User has no favorites.');
          done();
        })
    })
    it('Should return a 404 if the recipe does not exist', (done) => {
      request.post(`${recipesApi}/100/favorites?token=${users[0]
        .tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.status).to.equal('Not Found.');
          expect(res.body.message).to.equal('Recipe not found.');
          done();
        });
    });
    it(
      'Should return a 403 if the userId in token does not match userId in params',
      (done) => {
        request.get(`${favoriteApi}/100/favorites?token=${users[0]
          .tokens[0].token}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(403);
            expect(res.body.status).to.equal('Denied.');
            expect(res.body.message)
              .to
              .equal('Invalid token authorization, or the user doesn\'t exist.');
            done();
          });
      }
    );
    it('Should prevent a user from favoriting his own recipe', (done) => {
      const testUser = { ...users[0] };
      const testRecipe = { ...recipes[0] };
      request.post(`${recipesApi}/${testRecipe.id}/favorites?token=${testUser.tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application.json')
        .type('form')
        .end((err, res) => {
          console.log('unexpected shiiit', res.body);
          expect(res.status).to.equal(403);
          done();
        })
    })
  });
});
