/**
  * @returns {Object} validateInput
  *
  *
  */

const validateInput = ({ name, description, category, ingredients, instructions }) => {
  if (name === undefined || name === '') return { valid: false, message: 'Name field is required.', status: 400 };
  if (description === undefined || description === '') return { valid: false, message: 'Description field is required.', status: 400 };
  if (category === undefined || category === '') return { valid: false, message: 'Please pick a category.', status: 400 };
  if (ingredients === undefined || ingredients === '') return { valid: false, message: 'Input your your ingredients.', status: 400 };
  if (instructions === undefined || instructions === '') return { valid: false, message: 'Give your users some desired instructions', status: 400 };
  return { valid: true };
};

export default validateInput;
