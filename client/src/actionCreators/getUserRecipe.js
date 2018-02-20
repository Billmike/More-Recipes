import { GET_USER_RECIPES } from '../actions/types';

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
  userRecipe
});

export default getUserRecipe;
