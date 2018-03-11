import Sequelize from 'sequelize';
import db from '../models/index';
import errorMessage from '../errorHandler/errorMessage';

const { Op } = Sequelize;
const recipes = db.Recipe;
const reviews = db.Review;
const favorites = db.Favorite;
const votes = db.Vote;

/**
 * Represents the Recipe class
 *
 * @class
 *
 */

class Recipe {
  /**
   * Creates a new recipe by an logged-in user
   *
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } The new recipe object
   */

  static addRecipe(req, res) {
    const {
      name,
      description,
      imageUrl,
      category,
      ingredients,
      instructions
    } = req.body;
    recipes.findOne({
      where: {
        name,
        owner: req.userId
      }
    }).then((foundRecipe) => {
      if (foundRecipe) {
        return res.status(409).json({
          message: 'You already have a recipe with this name'
        });
      }
      recipes
        .create({
          name,
          description,
          imageUrl,
          category,
          ingredients,
          instructions,
          owner: req.userId
        })
        .then(recipe =>
          res.status(201).json({
            message: 'Recipe created successfully',
            recipeData: recipe
          }));
    }).catch(() =>
      res.status(500).json({
        message: errorMessage
      }));
  }

  /**
   * Modifies an existing recipe by the user who created the recipe
   *
   *
   * @param { object } res - The response object
   * @param { object } req - The request object
   *
   * @returns { object } the modified recipe object
   */

  static modifyRecipe(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).json({
            message: 'It seems this recipe does not exist.'
          });
        } else if (recipe.owner !== req.userId) {
          return res.status(403).json({
            message: 'Sorry. You cannot perform this action.'
          });
        }

        return recipe
          .update({
            name: req.body.name || recipe.name,
            description: req.body.description || recipe.description,
            imageUrl: req.body.imageUrl || recipe.imageUrl,
            category: req.body.category || recipe.category,
            ingredients: req.body.ingredients || recipe.ingredients,
            instructions: req.body.instructions || recipe.instructions
          })
          .then(() =>
            res
              .status(201)
              .json({ message: 'Update successful.', recipeData: recipe }));
      })
      .catch(() =>
        res.status(500).json({
          message: errorMessage
        }));
  }

  /**
   * Fetches all the recipes in the database
   * and limits them to six recipes per page
   *
   *
   * @param { object } req - the request object
   * @param { object } res - the response object
   *
   * @returns { object } All recipes in the application
   */

  static getRecipes(req, res) {
    let offset;
    const limit = 6;
    let singlePage;
    let pages;
    recipes
      .findAndCountAll()
      .then((foundRecipes) => {
        pages = Math.ceil(foundRecipes.count / limit);
        singlePage = parseInt(req.params.page, 10);
        offset = singlePage * limit;

        return recipes
          .findAll({
            limit,
            offset,
            pages,
            include: [
              {
                model: favorites,
                as: 'favorites',
                attributes: ['userId']
              },
              {
                model: reviews,
                as: 'reviews'
              }
            ]
          })
          .then((allRecipes) => {
            res.status(200).json({
              recipeData: allRecipes,
              pages
            });
          });
      })
      .catch(() =>
        res.status(500).json({
          message: errorMessage
        }));
  }

  /**
   * Deletes a single recipe in the application
   *
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
          return res.status(404).json({
            message: 'The recipe you are looking for does not exist.'
          });
        } else if (recipe.owner !== req.userId) {
          return res.status(403).json({
            message: 'You cannot delete this recipe' +
              ' as it does not belong to you.'
          });
        }
        return recipe.destroy().then(() =>
          res.status(201).json({
            message:
              'Recipe deleted successfully',
            recipeId: recipe.id
          }));
      })
      .catch(() =>
        res.status(500).json({
          message: errorMessage
        }));
  }

  /**
   * Searches the database for recipe(s) using either name or ingredient
   *
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } An array of recipes
   * object that matches the request parameter
   */

  static searchRecipes(req, res) {
    const { search } = req.query;
    recipes.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${search}`
          },
          ingredients: {
            [Op.iLike]: `%${search}`
          }
        }
      }
    }).then((foundRecipes) => {
      const numberOfRecipesFound = foundRecipes.length;
      if (foundRecipes.length <= 0) {
        return res.status(200).json({
          message: 'No recipes found with this name or ingredient'
        });
      }
      res.status(200).json({
        message: `Found ${numberOfRecipesFound} recipe(s)`,
        recipeData: foundRecipes
      });
    }).catch(() => {
      res.status(500).json({
        message: errorMessage
      });
    });
  }

  static popularRecipes(req, res) {
    return recipes.findAll({
      include: [{
        model: favorites,
        as: 'favorites',
      },
      {
        model: reviews,
        as: 'reviews'
      }],
      order: [
        [
          {
            model: favorites,
            as: 'favorites'
          },
          'id',
          'ASC'
        ]
      ],
      limit: 6
    }).then((theFoundrecipes) => {
      return res.status(200).json({
        theFoundrecipes
      });
    }).catch((err) => {
      return res.status(400).json({
        message: err.message
      });
    });
  }
}

export default Recipe;
