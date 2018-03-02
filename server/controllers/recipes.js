import Sequelize from 'sequelize';
import db from '../models/index';
import validateSearchInput from '../validators/validateSearchInput';
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
   * Represents the method that gets all recipes in the application
   * @method
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
      .catch(error =>
        res.status(500).json({
          message: error.message
        }));
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
    return recipes
      .findById(req.params.recipeId)
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({
            message: 'This recipe does not exist.'
          });
        }
        return recipes
          .findOne({
            where: {
              id: foundRecipe.id
            },
            include: [
              {
                model: reviews,
                as: 'reviews'
              },
              {
                model: votes,
                as: 'votes',
                attributes: ['userId']
              }
            ]
          })
          .then(singleRecipe =>
            res.status(200).json({ recipeData: singleRecipe }));
      })
      .catch(() =>
        res.status(500).json({
          message: errorMessage
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
          return res.status(404).json({
            message: 'The recipe you are looking for does not exist.'
          });
        } else if (recipe.owner !== req.userId) {
          return res.status(403).json({
            message: 'You cannot delete this recipe as it does not belong to you.'
          });
        }
        return recipe.destroy().then(() =>
          res.status(201).json({
            message:
              'You have successfully deleted this recipe. Want to add another?',
            recipeId: recipe.id
          }));
      })
      .catch(() =>
        res.status(500).json({
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }
  static searchRecipes(req, res) {
    const { errors, isValid } = validateSearchInput(req.query);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    recipes.findAll({
      where: {
        [Op.or]: {
          name: {
            [Op.iLike]: `%${req.query.name}`
          },
          ingredients: {
            [Op.iLike]: `%${req.query.ingredients}`
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
      const queryName = req.query.name ? 'name' : 'ingredient(s)';
      res.status(200).json({
        message: `Found ${numberOfRecipesFound} recipe(s) with this ${queryName}`,
        recipeData: foundRecipes
      });
    }).catch((err) => {
      res.status(500).json({
        message: err.message
      });
    });
  }
}

export default Recipe;
