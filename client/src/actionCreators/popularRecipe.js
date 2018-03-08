import { POPULAR_RECIPES } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } recipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipe
 */

const popularRecipe = recipe => ({
  type: POPULAR_RECIPES,
  recipe
});

export default popularRecipe;
