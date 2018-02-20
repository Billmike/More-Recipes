import { UPVOTE_RECIPE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { number } id - The recipe id
 *
 * @returns { object } - returns an object with an action type
 */

const upVoteRecipe = (id, userId) => ({
  type: UPVOTE_RECIPE,
  id,
  userId
});

export default upVoteRecipe;
