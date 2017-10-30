const validateRecipeAdd = (req, res, next) => {
  const {
    name, description, category, ingredients, instructions,
  } = req.body;
  if (name === undefined || name === '') {
    const err = res.status(400).send({ status: 'Failed.', message: 'Name is required.' });
    return next(err);
  } else if (description === undefined || description === '') {
    const err = res.status(400).send({ status: 'Failed.', message: 'Description field is required.' });
    return next(err);
  } else if (category === undefined || category === '') {
    const err = res.status(400).send({ status: 'Failed.', message: 'Please pick a category.' });
    return next(err);
  } else if (ingredients === undefined || ingredients === '') {
    const err = res.status(400).send({ status: 'Failed.', message: 'Input the ingredients for your recipe.' });
    return next(err);
  } else if (instructions === undefined || instructions === '') {
    const err = res.status(400).send({ status: 'Failed.', message: 'Input a set of instructions.' });
    return next(err);
  }
  return next();
};
export default validateRecipeAdd;
