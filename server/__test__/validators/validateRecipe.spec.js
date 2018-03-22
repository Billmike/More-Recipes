import { expect } from 'chai';
import validateRecipe from '../../validators/validateRecipe';

const inputData = {
  name: 'Fried rice',
  description: 'Amazing recipe',
  category: 'Lunch',
  ingredients: 'Baking powder\nSoda',
  instructions: 'Soda powder\nNomencleture'
};

describe('Validate Add recipe', () => {
  it('Should throw an error if no name is provided on recipe creation', () => {
    const noName = { ...inputData, name: '' };
    const invalidData = validateRecipe(noName);
    expect(invalidData.errors.name).to.equal('Recipe name is required');
  });
  it('Should throw an error if no description is passed', () => {
    const noDescription = { ...inputData, description: '' };
    const invalidData = validateRecipe(noDescription);
    expect(invalidData.errors.description).to
      .equal('Enter a description for your recipe');
  });
  it('should throw an error if no category is provided', () => {
    const noCategory = { ...inputData, category: '' };
    const invalidData = validateRecipe(noCategory);
    expect(invalidData.errors.category).to
      .equal('Select a category from the dropdown');
  });
  it('Should throw an error if no ingredient is passed through', () => {
    const noIngredient = { ...inputData, ingredients: '' };
    const invalidData = validateRecipe(noIngredient);
    expect(invalidData.errors.ingredients).to
      .equal('Input some ingredients for your recipe');
  });
  it('Should throw an error if no instruction is provided', () => {
    const noInstruction = { ...inputData, instructions: '' };
    const invalidData = validateRecipe(noInstruction);
    expect(invalidData.errors.instructions)
      .to.equal('Input directions on how to cook your recipe');
  });
});
