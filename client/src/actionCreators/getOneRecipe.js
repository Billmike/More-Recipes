import { GET_ONE_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } recipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipe
 */

const getOneRecipe = recipe => ({
  type: GET_ONE_RECIPE,
  recipe
});

export default getOneRecipe;
