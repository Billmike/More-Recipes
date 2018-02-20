import { REMOVE_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

const removeRecipe = ({ id } = {}) => ({
  type: REMOVE_RECIPE,
  id
});

export default removeRecipe;
