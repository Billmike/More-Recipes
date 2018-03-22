import { isEmpty } from 'lodash';

/**
  * Validate user input prior to adding a recipe on the client-side
  *
  * @param { object } data - The request data object
  *
  * @returns { object } an object of error messages
  */

const validateRecipe = (data) => {
  const errors = {};
  if (data.name === undefined || data.name.trim() === '') {
    errors.name = 'Recipe name is required';
  }
  if (data.description === undefined || data.description.trim() === '') {
    errors.description = 'Enter a description for your recipe';
  }
  if (data.category === undefined || data.category.trim() === '') {
    errors.category = 'Select a category from the dropdown';
  }
  if (data.ingredients === undefined || data.ingredients.trim() === '') {
    errors.ingredients = 'Input some ingredients for your recipe';
  }
  if (data.instructions === undefined || data.instructions.trim() === '') {
    errors.instructions = 'Input directions on how to cook your recipe';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateRecipe;
