import { DOWNVOTE_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

const downVoteRecipe = id => ({
  type: DOWNVOTE_RECIPE,
  id
});

export default downVoteRecipe;
