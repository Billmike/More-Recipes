import recipes from '../models/recipes';
import validators from '../validators/validateinput';
import validateReview from '../validators/validateReview';

const recipesDB = [...recipes];

/**
 *Represents a Recipe class.
 */

class Recipes {
  static getRecipes(req, res) {
    return res.status(200).json({
      feed: { recipes: recipesDB },
    });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */
  static createRecipe(req, res) {
    const validate = validators(req.body);
    const recipe = Object.assign({}, req.body, {
      id: recipesDB.length + 1,
      upVote: 0,
      downVote: 0,
      favorite: 0,
      reviews: [{
        review: '',
      }],
    });
    if (validate.valid) {
      recipesDB.push(recipe);
      res.status(201).send({ status: 'Successful.', feed: recipesDB[recipesDB.length - 1] });
    } else {
      res.status(400).send({ status: false, message: validate.message });
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */

  static updateRecipe(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        const validate = validators(req.body);
        if (validate.valid) {
          recipesDB[i].name = req.body.name;
          recipesDB[i].description = req.body.description;
          recipesDB[i].category = req.body.category;
          recipesDB[i].ingredients = req.body.ingredients;
          recipesDB[i].instructions = req.body.instructions;

          return res.status(201).json({
            message: 'Success',
            recipes: { recipes: recipesDB[i] },
          });
        } else {
          res.status(401).send({ status: 'Update failed.', message: validate.message });
        }
      }
    }
    return res.status(400).json({ status: false, message: 'Unable to modify recipe. Try again later.' });
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */

  static deleteRecipe(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        recipesDB.splice(i, 1);
        return res.status(201).json({ status: 'Success', message: 'Successfully deleted recipe' });
      }
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */

  static upVote(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        const counter = parseInt(req.body.upVote, 10);
        recipesDB[i].upVote += counter;
        return res.status(201).send({ status: 'Success.', message: 'Upvote successful.' });
      }
    }
  }

  static downVote(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        const counter = parseInt(req.body.downVote, 10);
        recipesDB[i].downVote += counter;
        return res.status(201).send({ status: 'Success.', message: 'Thanks for your feedback!' });
      }
    }
  }

  /**
   *
   * @param {*} req
   * @param {*} res
   */

  static reviews(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        const reviewValidate = validateReview(req.body);
        if (reviewValidate.valid) {
          recipesDB[i].reviews.push({
            review: req.body.review,
          });
          return res.status(201).send({ status: 'Success', message: 'Your review has been recorded. Our moderators would have a look at it.' });
        }
        res.status(400).send({ status: false, message: reviewValidate.message });
      }
    }
  }
}

export default Recipes;
