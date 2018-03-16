import { expect } from 'chai';
import models from '../../models';

const { Review } = models;

describe('Review model', () => {
  describe('Create reviews', () => {
    it('should create a new review', (done) => {
      Review.create({
        content: 'Amazing recipe man!'
      }).then((review) => {
        expect(review).to.be.an('object');
        done();
      });
    });
  });
});
