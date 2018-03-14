import { ADD_REVIEW, ADD_REVIEW_REQUEST } from '../actions/types';


export const addReviewRequest = () => ({
  type: ADD_REVIEW_REQUEST,
  isLoading: true
});
/**
 * Represents a function
 * @function
 *
 * @param { object } review - The review object
 *
 * @returns { object } - returns an object with an action type and recipe review
 */

const addReview = review => ({
  type: ADD_REVIEW,
  review,
  isLoading: false
});

export default addReview;
