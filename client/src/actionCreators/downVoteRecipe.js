import { DOWNVOTE_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

const downVoteRecipe = (id, userId) => ({
  type: DOWNVOTE_RECIPE,
  id,
  userId
});

export default downVoteRecipe;
