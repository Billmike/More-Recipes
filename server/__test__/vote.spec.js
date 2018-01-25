import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';
let recipe;
const upVote = 'upvote';
const downVote = 'downvote';

describe('Vote routes tests', () => {
  describe('#Handle the testing of user votes', () => {
    beforeEach(() => {
      recipe = recipes;
    });
    it('Should return a 403 if a non-authenticated user tries to vote on a recipe', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/votes/${upVote}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(403);
          expect(res.body.message).to.equal('You need to be logged in to perform this action.');
          done();
        });
    });
    it('Should return a 404 if the route the user tries to access while upvoting does not exist', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/votes/upvoting?token=${users[0].tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(404);
          expect(res.body.message).to.equal('URL not found.');
          done();
        });
    });
    it('Should successfully upvote a recipe by an authenticated user', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/votes/${upVote}?token=${users[0].tokens[0].token}`)
        .set('Cconnection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('upvote successful.');
          done();
        });
    });
    it('Should successfully downvote a recipe by an authenticated user', (done) => {
      request.post(`${recipesApi}/${recipe[0].id}/votes/${downVote}?token=${users[0].tokens[0].token}`)
        .set('Connection', 'keep alive')
        .set('Content-Type', 'application/json')
        .type('form')
        .end((err, res) => {
          expect(res.status).to.equal(200);
          expect(res.body.message).to.equal('downvote successful.');
          done();
        });
    });
  });
});
