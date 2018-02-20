import { EDIT_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } updates - The recipe object
 *
 * @returns { object } - returns an object with an action type and edited recipe
 */

const editRecipe = updates => ({
  type: EDIT_RECIPE,
  updates
});

export default editRecipe;
