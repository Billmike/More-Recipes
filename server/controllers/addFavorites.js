import db from '../models/index';

const favorite = db.Favorite;
const recipe = db.Recipe;

class Favorites {
  static addFavorite(req, res, next) {
    const { userId } = req;
    favorite.findAll({
      where: {
        recipeId: req.params.recipeId,
      },
    })
      .then((favs) => {
        if (!favs) {
          return res.status(404).send({ status: 'Not found.', message: 'Recipe not found.' });
        } else if (favs.owner === req.userId) {
          return res.status(403).send({ status: 'Forbidden.', message: 'Sorry, you cannot favorite your own recipe.' });
        } else if (favs.length === 0) {
          return favorite.create({
            userId: req.userId,
            recipeId: req.params.recipeId,
          })
            .then(() => res.status(200).send({ status: 'Success.', message: 'Recipe added to your favorite.' }))
            .catch((error) => {
              const err = res.status(400).send({ status: 'Unknown', message: error.message });
              return next(err);
            });
        }
        const arrayFavs = [];
        favs.forEach((fav) => {
          arrayFavs.push(fav.dataValues.userId);
        });
        const userFavs = favs.filter(fav => fav.dataValues.userId === userId)[0];
        if (arrayFavs.includes(userId)) {
          return favorite.findById(userFavs.dataValues.id)
            .then(favourite => favourite.destroy())
            .then(() => res.status(200).send({ message: 'Recipe has been removed from your favorites.' }));
        }
        favorite.create({
          userId: req.userId,
          recipeId: req.params.recipeId,
        })
          .then(() => res.status(200).send({ status: 'Success.', message: 'Recipe added to your favorite.' }))
          .catch(error => res.status(400).send({ message: error.message }));
      })
      .catch(error => res.status(500).send({ error: error.message }));
  }

  static getFavorites(req, res, next) {
    const { userId } = req.params;

    if (req.userId !== parseInt(userId, 10)) {
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
