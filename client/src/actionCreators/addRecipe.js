import { ADD_RECIPE } from '../actions/types';

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
  recipe
});

export default addRecipe;
