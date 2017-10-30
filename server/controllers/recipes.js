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
}

export default Recipe;
