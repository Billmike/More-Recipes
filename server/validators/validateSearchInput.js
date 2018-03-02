import { isEmpty } from 'lodash';

const validateSearchInput = (data) => {
  const errors = {};
  if ((data.name === undefined || data.name.trim() === '')
  && (data.ingredients === undefined || data.ingredients.trim() === '')) {
    errors.message = 'Your search parameter cannot be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default validateSearchInput;
