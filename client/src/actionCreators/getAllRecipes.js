import { GET_RECIPES, GET_RECIPES_REQUEST } from '../actions/types';

export const getAllRecipesRequest = () => ({
  type: GET_RECIPES_REQUEST,
  isLoading: true
});

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
  pagination,
  isLoading: false
});

export default getAllRecipes;
