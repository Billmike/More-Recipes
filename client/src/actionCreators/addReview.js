import { ADD_REVIEW } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } review - The review object
 *
 * @returns { object } - returns an object with an action type and recipe review
 */

const addReview = (review, username) => ({
  type: ADD_REVIEW,
  review,
  username
});

export default addReview;
