import recipes from '../models/recipes';
import validators from '../validators';

const recipesDB = [...recipes];

class Recipes {
  static getRecipes(req, res) {
    return res.status(200).json({
      feed: { recipes: recipesDB },
    });
  }

  static createRecipe(req, res) {
    const validate = validators(req.body);
    const recipe = Object.assign({}, req.body, { id: recipesDB.length + 1 });
    if (validate.valid) {
      recipesDB.push(recipe);
      res.status(201).send({ status: 'Successful.', feed: recipesDB[recipesDB.length - 1] });
    } else {
      res.status(400).send({ status: false, message: 'All fields are required. Check your input again.' });
    }
  }

  static updateRecipe(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        recipesDB[i].name = req.body.name;
        recipesDB[i].description = req.body.description;
        recipesDB[i].category = req.body.category;
        recipesDB[i].ingredients = req.body.ingredients;
        recipesDB[i].instructions = req.body.instructions;

        return res.status(201).json({
          message: 'Success',
          recipes: { recipes: recipesDB },
        });
      }
    }
    return res.status(400).json({ status: false, message: 'Unable to modify recipe. Try again later.' });
  }

  static deleteRecipe(req, res) {
    for (let i = 0; i <= recipesDB.length; i += 1) {
      if (recipesDB[i].id == req.params.recipeId) {
        recipesDB.splice(i, 1);
        res.status(201).json({ status: 'Success', message: 'Successfully deleted recipe' });
      }
    }
    res.status(400).send({ status: 'Failed', message: 'Fuck outchea.' });
  }
}

export default Recipes;
