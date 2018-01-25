import db from '../models/index';

const recipes = db.Recipe;
const reviews = db.Review;

/**
  * Represents the Recipe class
  *
  * @class
  *
  */

class Recipe {
/**
  * Represents the methos that creates a new recipe
  * @method
  *
  * @param { object } req - The request object
  * @param { object } res - The response object
  *
  * @returns { object } The recipe object
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
      .then(recipe => res.status(201).json({
        message: 'Recipe created successfully',
        recipeData: recipe,
      }))
      .catch(() => res
        .status(500)
        .json({
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }

  /**
  * Represents the Method that edits the recipe
  * @method
  *
  * @param { object } res - The response object
  * @param { object } req - The request object
  *
  * @returns { object } the modified recipe
  */

  static modifyRecipe(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res
            .status(404)
            .json({
              status: 'Not found.',
              message: 'It seems this recipe does not exist.'
            });
        } else if (recipe.owner !== req.userId) {
          return res
            .status(403)
            .json({
              status: 'Forbidden.',
              message: 'Sorry. You cannot perform this action.'
            });
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
          .then(() => res
            .status(201)
            .json({ status: 'Update successful.', recipeData: recipe }));
      })
      .catch(() => res
        .status(500)
        .json({
          status: 'Unknown error.',
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }

  /**
  * Represents the method that gets all recipes in the application
  * @method
  *
  * @param { object } req - the request object
  * @param { object } res - the response object
  *
  * @returns { object } All recipes in the application
  */

  static getRecipes(req, res) {
    return recipes
      .all()
      .then(allRecipes => res
        .status(201).json({ status: 'Success.', recipeData: allRecipes }))
      .catch(error => res.status(400).json(error.message));
  }

  /**
  * Represents the method that gets one recipe in the application
  * @method
  *
  * @param { object } req - the request object
  * @param { object } res - the response object
  *
  * @returns { object } A recipe object
  */

  static getOneRecipe(req, res) {
    return recipes.findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res
            .status(404)
            .json({
              status: 'Not Found', message: 'This recipe does not exist.'
            });
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
          .then(singleRecipe => res
            .status(201)
            .json({ status: 'OK', recipeData: singleRecipe }));
      })
      .catch(() => res.status(500).json({
        message: 'Oops.. Something went wrong. Why not try again later?'
      }));
  }

  /**
  * Represents the method that deletes a recipe in the application
  * @method
  *
  * @param { object } req - the request object
  * @param { object } res - the response object
  *
  * @returns { object } A response with either a success or failure message
  */

  static deleteRecipe(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res
            .status(404)
            .json({
              status: 'Not found',
              message: 'The recipe you are looking for does not exist.'
            });
        } else if (recipe.owner !== req.userId) {
          return res
            .status(403)
            .json({
              status: 'Forbidden.',
              message: 'You do not have the priviledges to perform this action.'
            });
        }
        return recipe
          .destroy()
          .then(() => res
            .status(201)
            .json({
              status: 'Success.',
              message: 'You have successfully deleted this recipe. Want to add another?'
            }));
      })
      .catch(() => res
        .status(500)
        .json({
          status: 'Failed',
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }
}

export default Recipe;
