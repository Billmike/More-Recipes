import { GET_RECIPES } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } recipes - The recipe object
 *
 * @returns { object } - returns an object with an action type and recipes
 */

const getAllRecipes = (recipes, pagination) => ({
  type: GET_RECIPES,
  recipes,
  pagination
});

export default getAllRecipes;
