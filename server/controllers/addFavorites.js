import db from '../models/index';

const favorite = db.Favorite;
const recipe = db.Recipe;

class Favorites {
  static addFavorite(req, res) {
    const { userId } = req;
    recipe.findOne({
      where: {
        id: req.params.recipeId,
      },
    }).then((foundRecipe) => {
      if (!foundRecipe) {
        return res.status(404).send({ status: 'Not Found.', message: 'Recipe not found.' });
      } else if (foundRecipe.owner === userId) {
        return res.status(403).send({ status: 'Forbidden', message: 'Sorry, you cannot perform this action on your own recipe.' });
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
                .then(() => res.status(200).send({ status: 'OK', message: 'Recipe added to your list of favorites.' }))
                .catch(error => res.status(500).send({ status: 'Server Error', message: error.message }));
            }
            const arrayOfUserIDs = [];
            favoriteRecipes.forEach((singleFavoriteRecipes) => {
              arrayOfUserIDs.push(singleFavoriteRecipes.dataValues.userId);
            });
            const userFavorites = favoriteRecipes.filter(fav => fav.dataValues.userId === userId)[0];
            if (arrayOfUserIDs.includes(userId)) {
              return favorite.findById(userFavorites.dataValues.id)
                .then(existingFavorite => existingFavorite.destroy())
                .then(() => res.status(200).send({ message: 'Recipe Removed from your favorites.' }))
                .catch(error => res.status(500).send({ message: error.message }));
            }
            return favorite.create({
              userId: req.userId,
              recipeId: req.params.recipeId,
            })
              .then(() => res.status(200).send({ status: 'OK', message: 'Recipe added to your list of favorites.' }))
              .catch(error => res.status(500).send({ message: error.message }));
          }).catch(error => res.status(500).send({ status: 'Server error', message: error.message }));
      }
    }).catch(error => res.status(500).send({ status: 'Server Error', message: error.message }));
  }

  static getFavorites(req, res, next) {
    const { userId } = req.params;

    if (req.userId !== userId) {
      const err = res.status(403).send({ status: 'Denied.', message: 'Invalid token authorization, or the user doesn\'t exist.' });
      return next(err);
    }
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
          return res.status(200).send({ status: 'Success.', recipes: null, message: 'User has no favorites.' });
        }
        const recipes = [];
        favorites.forEach((fav) => {
          recipes.push(fav.dataValues.Recipe.dataValues);
        });
        return res.status(200).send({ status: 'Success.', message: `${countFavorites} recipe(s) found in user's favorite list`, recipes });
      })
      .catch(error => res.status(500).send({ message: error.message }));
  }
}

export default Favorites;
