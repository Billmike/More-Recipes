import recipes from '../models/recipes';
import validators from '../validators/validateinput';
import validateReview from '../validators/validateReview';

const recipesDB = [...recipes];

/**
 *Represents a Recipe class.
 */

class Recipes {
  /**
   * @returns { Object } getRecipes
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
   */

  static getRecipes(req, res) {
    if (req.query.sort == 'upVotes') {
      if (req.query.order == 'desc') {
        recipesDB.sort((recipe1, recipe2) => recipe2.upVote - recipe1.upVote);
      } else {
        recipesDB.sort((recipe1, recipe2) => recipe1.upVote - recipe2.upVote);
      }
    }
    return res.status(200).json({
      feed: { recipes: recipesDB },
    });
  }

  /**
   * @returns { Object } createRecipe
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
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
   * @returns { Object } updateRecipe
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
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
  }

  /**
   * @returns { Object } deleteRecipe
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
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
   * @returns { Object } upVote
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
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

  /**
   * @returns { Object } downVote
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
   */

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
   * @returns { Object } reviews
   * @param { String } req - The request being passed.
   * @param { String } res - The response being returned.
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
