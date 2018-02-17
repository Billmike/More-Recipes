import db from '../models/index';
import errorMessage from '../errorHandler/errorMessage';

const Recipes = db.Recipe;
const Votes = db.Vote;
const Favorites = db.Favorite;
const Review = db.Review;
const User = db.User;

class GetRecipes {
/**
   * @param  {string} name - Recipe name
   * @param  {string} description - Recipe description
   * @param  {string} imageUrl - Recipe image link
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
    name, description, imageUrl, category, ingredients, instructions,
    owner, reviews, favorites, viewCount, upVote, downVote, id,
    createdAt, updatedAt,
  ) {
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
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
 * @param { object } req - The request object
 * @param { object } res - The response object
 * @param { function } next - A callback function
 *
 * @returns { object } The recipes object
 */

const getAllRecipes = (req, res, next) => {
  Recipes.findAll({
    where: {
      id: req.params.recipeId
    },
    include: [{
      model: Votes,
      as: 'votes',
    }, {
      model: User,
    }, {
      model: Review,
      as: 'reviews'
    }, {
      model: Favorites,
      as: 'favorites',
    }],
  })
    .then((recipes) => {
      console.log('found recipe', recipes);
      const tempStorage = [];
      recipes.forEach((elem) => {
        tempStorage.push(new GetRecipes(
          elem.name,
          elem.description,
          elem.imageUrl,
          elem.category,
          elem.ingredients,
          elem.instructions,
          { id: elem.User.id, username: elem.User.username },
          elem.reviews,
          countRecipes(elem.favorites),
          null,
          countRecipes(elem.votes, 'voteType', 'upvote'),
          countRecipes(elem.votes, 'voteType', 'downvote'),
          elem.id,
          elem.createdAt,
          elem.updatedAt,
        ));
      });
      return res
        .status(200).json({ recipeData: tempStorage });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message
      });
    });
};

export default getAllRecipes;
