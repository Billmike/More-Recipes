// import { Recipes } from '../models';
import db from '../models/index';

const recipes = db.Recipe;

class Recipe {
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

  static modifyRecipe(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ status: 'Not found.', message: 'It seems this recipe does not exist.' });
        } else if (recipe.owner !== req.userId) {
          return res.status(403).send({ status: 'Forbidden.', message: 'Sorry. You cannot perform this action.' });
        }

        const {
          name, description, img_link, category, ingredients, instructions,
        } = req.body;
        return recipe
          .update({
            name,
            description,
            img_link,
            category,
            ingredients,
            instructions,
          })
          .then(() => res.status(200).send({ status: 'Update successful.', data: recipe }))
          .catch(error => res.status(400).send({ status: 'Unknown.', message: error.message }));
      })
      .catch(error => res.status(400).send({ status: 'Unknown error.', message: error.message }));
  }
}

export default Recipe;
