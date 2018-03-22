import { expect } from 'chai';
import models from '../../models';

const { Recipe } = models;

describe('Recipe models', () => {
  describe('Create recipe', () => {
    it('should fail to create a recipe if no recipe name if provided', (done) => {
      Recipe.create({
        description: 'Best recipe in town',
        imageUrl: 'http://someimagehere',
        category: 'Lunch',
        ingredients: 'New baby\nNew recipe',
        instructions: 'Make it shine\nLet it shine'
      }).catch((error) => {
        expect(error.errors[0].message).to.equal('name cannot be null');
        expect(error.errors[0].type).to.equal('notNull Violation');
      });
      done();
    });
    it('should fail to create a recipe if no category is picked', (done) => {
      Recipe.create({
        name: 'My recipe',
        description: 'Best recipe in town',
        imageUrl: 'http://someimagehere',
        ingredients: 'New baby\nNew recipe',
        instructions: 'Make it shine\nLet it shine'
      }).catch((error) => {
        expect(error.errors[0].message).to.equal('category cannot be null');
        expect(error.errors[0].type).to.equal('notNull Violation');
      });
      done();
    });
    it('Should create a recipe succesfully', (done) => {
      Recipe.create({
        name: 'Amazing recipe',
        description: 'Amazing recipe description',
        imageUrl: 'http://someimagehere',
        category: 'Dessert',
        ingredients: 'New baby\nNew recipe',
        instructions: 'Make it shine\nLet it shine'
      }).then((recipe) => {
        expect(recipe.dataValues.name).to.be.a('string');
        expect(recipe.dataValues.description).to.be.a('string');
        expect(recipe.dataValues.imageUrl).to.be.a('string');
        expect(recipe.dataValues.category).to.be.a('string');
        expect(recipe.dataValues.ingredients).to.be.a('string');
        expect(recipe.dataValues.instructions).to.be.a('string');
        expect(recipe.dataValues).to.be.an('object');
      });
      done();
    });
  });
  describe('Get all recipes', () => {
    it('Should get all the recipes in the application', (done) => {
      Recipe.all()
        .then((recipes) => {
          expect(recipes).to.be.an('array');
        });
        done();
    });
  });
  describe('Edit a recipe', () => {
    it('Should modify a recipe', (done) => {
      Recipe.findById(2)
        .then((recipe) => {
          recipe.update({
            name: 'Amazing recipe here'
          }).then((updatedRecipe) => {
            expect(updatedRecipe.dataValues.name)
              .to.equal('Amazing recipe here');
            expect(updatedRecipe.dataValues).to.be.an('object');
          });
        });
        done();
    });
  });
  describe('Delete a recipe', () => {
    it('Should delete a recipe', (done) => {
      Recipe.findById(2)
        .then((recipe) => {
          recipe.destroy()
            .then((deletedRecipe) => {
              expect(deletedRecipe.length).to.equal(0);
            });
            done();
        });
    });
  });
});
