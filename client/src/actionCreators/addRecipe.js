import { ADD_RECIPE, ADD_RECIPE_REQUEST } from '../actions/types';

export const addRecipeRequest = () => ({
  type: ADD_RECIPE_REQUEST,
  isLoading: true
});

/**
 * Represents a function
 * @function
 *
 * @param { object } recipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipe
 */

const addRecipe = recipe => ({
  type: ADD_RECIPE,
  recipe,
  isLoading: false
});

export default addRecipe;
