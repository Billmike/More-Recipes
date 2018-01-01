import db from '../models/index';

const recipes = db.Recipe;
const reviews = db.Review;

/**
  * @class { Object } Recipe
  *
  *
  */

class Recipe {
/**
  * @returns { Object } addRecipe
  *@param { String } req takes in the request
  *@param { String } res takes in the response
  */

  static addRecipe(req, res) {
    const {
      name, description, img_link, category, ingredients, instructions,
    } = req.body;
    return recipes
      .create({
        name,
        description,
        img_link,
        category,
        ingredients,
        instructions,
        owner: req.userId,
      })
      .then(recipe => res.status(201).send(recipe))
      .catch(() => res.status(400).send({ status: 'Failed.', error: 'Something here.' }));
  }

  /**
  * @returns { Object } modifyRecipe
  *@param { String } req takes in the request
  *@param { String } res takes in the response
  */

  static modifyRecipe(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ status: 'Not found.', message: 'It seems this recipe does not exist.' });
        } else if (recipe.owner !== req.userId) {
          return res.status(403).send({ status: 'Forbidden.', message: 'Sorry. You cannot perform this action.' });
        }

        return recipe
          .update({
            name: req.body.name || recipe.name,
            description: req.body.description || recipe.description,
            img_link: req.body.img_link || recipe.img_link,
            category: req.body.category || recipe.category,
            ingredients: req.body.ingredients || recipe.ingredients,
            instructions: req.body.instructions || recipe.instructions,
          })
          .then(() => res.status(201).send({ status: 'Update successful.', data: recipe }))
          .catch(error => res.status(400).send({ status: 'Unknown.', message: error.message }));
      })
      .catch(error => res.status(500).send({ status: 'Unknown error.', message: error.message }));
  }

  /**
  * @returns { Object } getRecipes
  *@param { String } req takes in the request
  *@param { String } res takes in the request
  */

  static getRecipes(req, res) {
    return recipes
      .all()
      .then(allRecipes => res.status(200).send({ status: 'Success.', data: allRecipes }))
      .catch(error => res.status(400).send(error.message));
  }

  static getOneRecipe(req, res) {
    return recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).send({ status: 'Not Found', message: 'This recipe does not exist.' });
        }
        return recipes.findOne({
          where: {
            id: foundRecipe.id,
          },
          include: {
            model: reviews,
            as: 'reviews',
          },
        })
          .then(singleRecipe => res.status(200).send({ status: 'OK', data: singleRecipe }))
          .catch(error => res.status(400).send(error.message));
      })
      .catch(error => res.status(500).send(error.message));
  }

  /**
  * @returns { Object } deleteRecipes
  *@param { String } req takes in the request
  *@param { String } res takes in the request
  */

  static deleteRecipe(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ status: 'Not found', message: 'The recipe you are looking for does not exist.' });
        } else if (recipe.owner !== req.userId) {
          return res.status(403).send({ status: 'Forbidden.', message: 'You do not have the priviledges to perform this action.' });
        }
        return recipe
          .destroy()
          .then(() => res.status(200).send({ status: 'Success.', message: 'You have successfully deleted this recipe. Want to add another?' }))
          .catch(error => res.status(400).send({ status: error.message }));
      })
      .catch(error => res.status(500).send({ status: 'Failed', message: error.message }));
  }
}

export default Recipe;
