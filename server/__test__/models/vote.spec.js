import { expect } from 'chai';
import models from '../../models';

const { Vote } = models;

describe('Votes model', () => {
  describe('Create votes', () => {
    it('Should create a vote for a recipe', (done) => {
      Vote.create({
        userId: 3,
        voteType: 'upvote'
      }).then((vote) => {
        expect(vote.dataValues).to.be.an('object');
        done();
      });
    });
  });
});
