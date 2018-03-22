import { TOGGLE_FAVORITE } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } favoriteRecipes - The recipe object
 *
 * @returns { object } - returns an object with an action type and favorite recipe(s)
 */

const toggleFavorites = (favoriteRecipes, userId, toggleType = 'add') => ({
  type: TOGGLE_FAVORITE,
  favoriteRecipes,
  userId,
  toggleType
});

export default toggleFavorites;
