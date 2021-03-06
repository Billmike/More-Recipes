/**
  * Validate user input prior to adding a recipe
  *
  * @param { object } req - The request object
  * @param { object } res - The response object
  * @param { functon } next - The callback function
  *
  * @returns { object } an object of error messages
  */

const validateRecipeAdd = (req, res, next) => {
  const {
    name, description, category, ingredients, instructions,
  } = req.body;
  if (name === undefined || name.trim() === '') {
    const err = res
      .status(400)
      .send({
        status: 'Operation Failed.',
        message: 'Name is required.'
      });
    return next(err);
  } else if (description === undefined || description.trim() === '') {
    const err = res
      .status(400)
      .send({
        status: 'Operation Failed.',
        message: 'Description field is required.'
      });
    return next(err);
  } else if (category === undefined || category.trim() === '') {
    const err = res
      .status(400)
      .send({
        status: 'Operation Failed.',
        message: 'Please pick a category.'
      });
    return next(err);
  } else if (ingredients === undefined || ingredients.trim() === '') {
    const err = res
      .status(400)
      .send({
        status: 'Operation Failed.',
        message: 'Input the ingredients for your recipe.'
      });
    return next(err);
  } else if (instructions === undefined || instructions.trim() === '') {
    const err = res
      .status(400)
      .send({
        status: 'Operation Failed.',
        message: 'Input a set of instructions.'
      });
    return next(err);
  }
  return next();
};
export default validateRecipeAdd;
