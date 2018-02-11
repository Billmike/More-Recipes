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
    name,
    description,
    imglink,
    category,
    ingredients,
    instructions,
    owner,
    reviews,
    favorites,
    viewCount,
    upVote,
    downVote,
    id,
    createdAt,
    updatedAt
  ) {
    this.name = name;
    this.description = description;
    this.imglink = imglink;
    this.category = category;
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

const countRecipes = (recipeArray, itemKey, itemValue) => {
  if (recipeArray.length === 0) return 0;
  if (itemKey === null && itemValue === null) return recipeArray.length;
  return recipeArray.filter(elem => elem[itemKey] === itemValue).length;
};

const sortRecipes = (recipeArray, sortOrder, callback) => {
  if (recipeArray.length === 0) return recipeArray;
  if (sortOrder !== 'ascending' && sortOrder !== 'descending') {
    const err = new Error('Invalid sorting order.');
    err.status = 400;
    return callback(err);
  }
  const sorted = recipeArray.sort((a, b) => {
    if (sortOrder === 'ascending') {
      if (a.upVote === b.upVote) return a.updatedAt - b.updatedAt;
      return a.upVote - b.upVote;
    }
    if (a.upVote === b.upVote) return b.updatedAt - a.updatedAt;
    return b.upVote - a.upVote;
  });
  callback(null, sorted);
};

/**
 * Represents the method for getting all recipes
 * @method
 *
 * @param { object } request - The request object
 * @param { object } response - The response object
 * @param { function } next - A callback function
 *
 * @returns { object } The recipes object
 */

const getAllRecipes = (request, response, next) => {
  Recipes.findAll({
    include: [
      {
        model: Votes,
        as: 'votes'
      },
      {
        model: User
      },
      {
        model: Favorites,
        as: 'favorites'
      }
    ]
  })
    .then((recipes) => {
      const tempStorage = [];
      const { sort, order } = request.query;
      recipes.forEach((elem) => {
        tempStorage.push(new GetRecipes(
          elem.name,
          elem.description,
          elem.imglink,
          elem.category,
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
          elem.updatedAt
        ));
      });
      if (sort && order) {
        return sortRecipes(tempStorage, order, (err, sorted) => {
          if (!err) {
            return response
              .status(201)
              .json({ status: 'Success', recipeData: sorted });
          }
          return next(err);
        });
      }
      return response
        .status(201)
        .json({ status: 'Success.', recipeData: tempStorage });
    })
    .catch(() => {
      const err = response.status(500).json({
        status: 'Server error',
        message: 'Oops.. Something went wrong. Why not try again later?'
      });
      return next(err);
    });
};

export default getAllRecipes;
