/**
  * @returns { Object } validateReview
  *
  *
  */

const validateReview = ({ review }) => {
  if (review === undefined || review === '') return { valid: false, message: 'You cannot post an empty review. Are you sure you want to post a review?' };
  return { valid: true };
};

export default validateReview;
