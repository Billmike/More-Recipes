import { EDIT_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } updates - The recipe object
 *
 * @returns { object } - returns an object with an action type and edited recipe
 */

const editRecipe = (id, updates) => ({
  type: EDIT_RECIPE,
  id,
  updates
});

export default editRecipe;
