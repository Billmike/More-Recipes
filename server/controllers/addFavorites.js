import db from '../models/index';

const favorite = db.Favorite;
const recipe = db.Recipe;

/**
 * Represents the Favorites class
 *
 * @class
 */

class Favorites {
  /**
   * Represents the method that handles adding a favorite recipe
   * @method
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } The favorited recipe
   */

  static addFavorite(req, res) {
    const { userId } = req;
    recipe
      .findOne({
        where: {
          id: req.params.recipeId
        }
      })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return res.status(404).json({ message: 'Recipe not found.' });
        } else if (foundRecipe.owner == userId) {
          return res.status(403).json({
            message: 'Sorry, you cannot perform this action on your own recipe.'
          });
        } else if (foundRecipe) {
          favorite
            .findAll({
              where: {
                recipeId: foundRecipe.id
              }
            })
            .then((favoriteRecipes) => {
              if (favoriteRecipes.length === 0) {
                return favorite
                  .create({
                    userId: req.userId,
                    recipeId: req.params.recipeId
                  })
                  .then(createdFavs =>
                    res.status(201).json({
                      message: 'Recipe added to your list of favorites.',
                      id: createdFavs.recipeId
                    }));
              }
              const arrayOfUserIDs = [];
              favoriteRecipes.forEach((singleFavoriteRecipes) => {
                arrayOfUserIDs.push(singleFavoriteRecipes.dataValues.userId);
              });
              const userFavorites = favoriteRecipes.filter(fav => fav.dataValues.userId === userId)[0];
              if (arrayOfUserIDs.includes(userId)) {
                return favorite
                  .findById(userFavorites.dataValues.id)
                  .then((existingFavorite) => {
                    res.status(200).json({
                      message: 'Recipe removed from your favorites.',
                      id: existingFavorite.dataValues.recipeId
                    });
                    existingFavorite.destroy();
                  });
              }
              return favorite
                .create({
                  userId: req.userId,
                  recipeId: req.params.recipeId
                })
                .then(createdFavorite =>
                  res.status(200).json({
                    status: 'OK',
                    message: 'Recipe added to your list of favorites.',
                    id: createdFavorite.recipeId
                  }));
            });
        }
      })
      .catch(() =>
        res.status(500).json({
          status: 'Server Error',
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }

  /**
   * Represents the method that handles getting the favorite recipes of a user
   * @method
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } The user's favorite recipes
   */

  static getFavorites(req, res) {
    const { userId } = req.params;
    favorite
      .findAll({
        where: {
          userId: parseInt(userId, 10)
        },
        include: {
          model: recipe
        }
      })
      .then((favorites) => {
        const countFavorites = favorites.length;
        if (countFavorites === 0) {
          return res.status(200).json({
            status: 'Success.',
            recipes: null,
            message: 'User has no favorites.'
          });
        }
        const recipes = [];
        favorites.forEach((fav) => {
          recipes.push(fav.dataValues.Recipe.dataValues);
        });
        return res.status(200).json({
          status: 'Success.',
          message: `${countFavorites} recipe(s) found in user's favorite list`,
          recipes
        });
      })
      .catch(() =>
        res.status(500).json({
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }
}

export default Favorites;
