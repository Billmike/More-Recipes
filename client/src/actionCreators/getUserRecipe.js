import { GET_USER_RECIPES, GET_USER_RECIPES_REQUEST } from '../actions/types';

export const getUserRecipeRequest = () => ({
  type: GET_USER_RECIPES_REQUEST,
  isLoading: true
});

/**
 * Represents a function
 * @function
 *
 * @param { object } userRecipe - The recipe object
 *
 * @returns { object } - returns an object with an action type and user recipe
 */

const getUserRecipe = userRecipe => ({
  type: GET_USER_RECIPES,
  userRecipe,
  isLoading: false
});

export default getUserRecipe;
