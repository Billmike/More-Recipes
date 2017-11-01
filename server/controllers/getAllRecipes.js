import db from '../models/index';

const Recipes = db.Recipe;
const Votes = db.Vote;
const Favorites = db.Favorite;
const User = db.User;

class GetRecipes {
  constructor(
    name, description, imglink, ingredients, instructions,
    owner, reviews, favorites, viewCount, upVote, downVote, id,
    createdAt, updatedAt,
  ) {
    this.name = name;
    this.description = description;
    this.imglink = imglink;
    this.ingredients = ingredients;
    this.instructions = instructions;
    this.owner = owner;
    this.reviews = reviews;
    this.favorites = favorites;
    this.viewCount = viewCount;
    this.upVote = upVote;
    this.downVote = downVote;
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

const countRecipes = (arr, key, val) => {
  if (arr.length === 0) return 0;
  if (key === null && val === null) return arr.length;
  return arr.filter(elem => elem[key] === val).length;
};

const sortRecipes = (arr, dir, callback) => {
  if (arr.length === 0) return arr;
  if (dir !== 'ascending' && dir !== 'descending') {
    const err = new Error('Invalid sorting order.');
    err.status = 400;
    return callback(err);
  }
  const sorted = arr.sort((a, b) => {
    if (dir === 'ascending') {
      if (a.upVote === b.upVote) return a.updatedAt - b.updatedAt;
      return a.upVote - b.upVote;
    }
    if (a.upVote === b.upVote) return b.updatedAt - a.updatedAt;
    return b.upVote - a.upVote;
  });
  callback(null, sorted);
};

const getAllRecipes = (req, res, next) => {
  Recipes.findAll({
    include: [{
      model: Votes,
      as: 'votes',
    }, {
      model: User,
    }, {
      model: Favorites,
      as: 'favorites',
    }],
  })
    .then((recipes) => {
      const tempStorage = [];
      const { sort, order } = req.query;
      recipes.forEach((elem) => {
        tempStorage.push(new GetRecipes(
          elem.name,
          elem.description,
          elem.imglink,
          elem.ingredients,
          elem.instructions,
          { id: elem.User.id, username: elem.User.username },
          null,
          countRecipes(elem.favorites),
          null,
          countRecipes(elem.votes, 'voteType', 'upvote'),
          countRecipes(elem.votes, 'voteType', 'downvote'),
          elem.id,
          elem.createdAt,
          elem.updatedAt,
        ));
      });
      if (sort && order) {
        return sortRecipes(tempStorage, order, (err, sorted) => {
          if (!err) return res.status(200).send({ status: 'Success', data: sorted });
          return next(err);
        });
      }
      return res.status(200).send({ status: 'Success.', data: tempStorage });
    })
    .catch((error) => {
      const err = res.status(500).send({ status: 'Server error', message: error.message });
      return next(err);
    });
};

export default getAllRecipes;
