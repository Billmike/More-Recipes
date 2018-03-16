import { expect } from 'chai';
import models from '../../models';

const { Favorite } = models;

describe('Favorite model', () => {
  describe('Create favorites', () => {
    it('Should create user favorite', (done) => {
      Favorite.create({
      }).then((recipe) => {
        expect(recipe).to.be.an('object');
        done();
      });
    });
  });
});
