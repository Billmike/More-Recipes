import { isEmpty } from 'lodash';

const validateReview = (reviewText) => {
  const errors = {};
  if (reviewText === undefined || reviewText.trim() === '') {
    errors.name = 'Review is required.';
  }
  return {
    errors,
    valid: isEmpty(errors)
  };
};

export default validateReview;
