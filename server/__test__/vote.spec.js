import { expect } from 'chai';
import supertest from 'supertest';
import app from '../app';
import recipes from './seed/recipeSeed';
import users from './seed/userSeed';

const request = supertest(app);
const recipesApi = '/api/v1/recipes';
const upVote = 'upvote';
const downVote = 'downvote';

describe('Vote routes tests', () => {
  describe('Upvote and Downvote routes', () => {
    it(`Should return an error message if a
 non-authenticated user tries to vote on a recipe`, (done) => {
        request
          .post(`${recipesApi}/${recipes[0].id}/votes/${upVote}`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(401);
            expect(res.body.message).to.equal('You need to be logged in to perform this action.');
            done();
          });
      });
    it(`Should return an error message if the
 route the user tries to access while upvoting does not exist`, (done) => {
        request
          .post(`${recipesApi}/${recipes[0].id}/votes/upvoting?token=${
            users[0].tokens
          }`)
          .set('Connection', 'keep alive')
          .set('Content-Type', 'application/json')
          .type('form')
          .end((err, res) => {
            expect(res.status).to.equal(400);
            expect(res.body.message).to.equal('Parameter passed should be upvote or downvote.');
            done();
          });
      });
    it('Should successfully upvote a recipe by an authenticated user', (done) => {
      request
        .post(`${recipesApi}/${recipes[0].id}/votes/${upVote}?token=${
          users[0].tokens
        }`)
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
      request
        .post(`${recipesApi}/${recipes[0].id}/votes/${downVote}?token=${
          users[0].tokens
        }`)
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
