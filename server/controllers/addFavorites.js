import db from '../models/index';
import errorMessage from '../errorHandler/errorMessage';

const favorite = db.Favorite;
const recipe = db.Recipe;

/**
 * Represents the Favorites class
 *
 * @class
 */

class Favorites {
  /**
   * Adds a particular recipe to the list of favorites for a user
   *
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { object } The favorited recipe
   */

  static addFavorite(req, res) {
    const { userId } = req;
    recipe.findOne({
      where: {
        id: req.params.recipeId,
      },
    }).then((foundRecipe) => {
      if (!foundRecipe) {
        return res
          .status(404)
          .json({ message: 'Recipe not found.' });
      } else if (foundRecipe.owner == userId) {
        return res
          .status(403)
          .json({
            message: 'Sorry, you cannot perform this action on your own recipe.'
          });
      } else if (foundRecipe) {
        favorite.findAll({
          where: {
            recipeId: foundRecipe.id,
          },
        })
          .then((favoriteRecipes) => {
            if (favoriteRecipes.length === 0) {
              return favorite.create({
                userId: req.userId,
                recipeId: req.params.recipeId,
              })
                .then((createdFavs) => {
                  const favoritesIdArray = [];
                  favoritesIdArray.push(req.userId)
                  res
                    .status(200)
                    .json({
                      message: 'Recipe added to your list of favorites.',
                      favoritedRecipe: {
                        recipeId: createdFavs.recipeId
                      },
                      favoritesId: favoritesIdArray
                    });
                });
            }
            const arrayOfUserIDs = [];
            favoriteRecipes.forEach((singleFavoriteRecipes) => {
              arrayOfUserIDs.push(singleFavoriteRecipes.dataValues.userId);
            });
            const userFavorites = favoriteRecipes
              .filter(fav => fav.dataValues.userId === userId)[0];
            if (arrayOfUserIDs.includes(userId)) {
              return favorite.findById(userFavorites.dataValues.id)
                .then((existingFavorite) => {
                  arrayOfUserIDs.pop(req.userId)
                  res.status(200).json({
                    message: 'Recipe removed from your favorites.',
                    favoritedRecipe: {
                      recipeId: existingFavorite.dataValues.recipeId
                    },
                    favoritesId: arrayOfUserIDs
                  });
                  existingFavorite.destroy();
                });
            }
            return favorite.create({
              userId: req.userId,
              recipeId: req.params.recipeId,
            })
              .then((createdFavorite) => {
                arrayOfUserIDs.push(req.userId);
                res
                  .status(200)
                  .json({
                    message: 'Recipe added to your list of favorites.',
                    favoritedRecipe: {
                      recipeId: createdFavorite.recipeId
                    },
                    favoritesId: arrayOfUserIDs
                  });
              });
          });
      }
    }).catch(() => res
      .status(500)
      .json({
        message: errorMessage
      }));
  }

  /**
   * Gets the list of favorites for a particular user
   *
   *
   * @param { object } req - The request object
   * @param { object } res - The response object
   *
   * @returns { array } An array of the user's favorite recipes
   */

  static getFavorites(req, res) {
    const { userId } = req.params;
    favorite.findAll({
      where: {
        userId: parseInt(userId, 10),
      },
      include: {
        model: recipe,
      },
    })
      .then((favorites) => {
        const countFavorites = favorites.length;
        if (countFavorites === 0) {
          return res
            .status(200)
            .json({
              message: 'You currently have no favorites.'
            });
        }
        const recipes = [];
        favorites.forEach((fav) => {
          recipes.push(fav.dataValues.Recipe.dataValues);
        });
        return res
          .status(200)
          .json({
            message: `${countFavorites} recipe(s) found in user's favorite list`,
            recipes
          });
      })
      .catch(() => res.status(500).json({
        message: errorMessage
      }));
  }
}

export default Favorites;
