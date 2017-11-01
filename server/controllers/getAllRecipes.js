import db from '../models/index';

const Recipes = db.Recipe;
const Votes = db.Vote;
const Favorites = db.Favorite;
const User = db.User;

class GetRecipes {
/**
   * @param  {string} name - Recipe name
   * @param  {string} description - Recipe description
   * @param  {string} imglink - Recipe image link
   * @param  {array} ingredients - Recipe ingredients
   * @param  {array} instructions - Recipe instructions
   * @param  {object} owner - User information - id, and username.
   * @param  {array} reviews - Recipe review
   * @param  {number} favorites - Recipe favorites
   * @param  {number} viewCount - Recipe view count
   * @param  {number} upVote - Recipe upvote count
   * @param  {number} downVote - Recipe downvote count
   * @param  {number} id - Recipe id
   * @param  {time} createdAt - Recipe time of creation
   * @param  {time} updatedAt - Recipe time of update
   */
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
