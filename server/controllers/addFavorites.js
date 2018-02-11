import db from '../models/index';

const favorite = db.Favorite;
const recipe = db.Recipe;

/**
 * Represponseents the Favorites class
 *
 * @class
 */

class Favorites {
  /**
   * Represents the method that handles adding a favorite recipe
   * @method
   *
   * @param { object } request - The requestuest object
   * @param { object } response - The response object
   *
   * @returns { object } The favorited recipe
   */

  static addFavorite(request, response) {
    const { userId } = request;
    recipe
      .findOne({
        where: {
          id: request.params.recipeId
        }
      })
      .then((foundRecipe) => {
        if (!foundRecipe) {
          return response
            .status(404)
            .json({ status: 'Not Found.', message: 'Recipe not found.' });
        } else if (foundRecipe.owner == userId) {
          return response.status(403).json({
            status: 'Forbidden',
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
                    userId: request.userId,
                    recipeId: request.params.recipeId
                  })
                  .then(createdFavs =>
                    response.status(200).json({
                      status: 'OK',
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
                    response.status(201).json({
                      message: 'Recipe removed from your favorites.',
                      id: existingFavorite.dataValues.recipeId
                    });
                    existingFavorite.destroy();
                  });
              }
              return favorite
                .create({
                  userId: request.userId,
                  recipeId: request.params.recipeId
                })
                .then(createdFavorite =>
                  response.status(201).json({
                    status: 'OK',
                    message: 'Recipe added to your list of favorites.',
                    id: createdFavorite.recipeId
                  }));
            });
        }
      })
      .catch(() =>
        response.status(500).json({
          status: 'Server Error',
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }

  /**
   * Represents the method that handles getting the favorite recipes of a user
   * @method
   *
   * @param { object } request - The requestuest object
   * @param { object } response - The responseponse object
   *
   * @returns { object } The user's favorite recipes
   */

  static getFavorites(request, response) {
    const { userId } = request.params;
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
          return response.status(201).json({
            status: 'Success.',
            recipes: null,
            message: 'User has no favorites.'
          });
        }
        const recipes = [];
        favorites.forEach((fav) => {
          recipes.push(fav.dataValues.Recipe.dataValues);
        });
        return response.status(201).json({
          status: 'Success.',
          message: `${countFavorites} recipe(s) found in user's favorite list`,
          recipes
        });
      })
      .catch(() =>
        response.status(500).json({
          message: 'Oops.. Something went wrong. Why not try again later?'
        }));
  }
}

export default Favorites;
