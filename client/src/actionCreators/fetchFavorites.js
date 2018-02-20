import { FETCH_FAVORITE_RECIPES } from '../actions/types';

/**
 * Represents a function
 * @function
 *
 * @param { object } favoriteRecipes - The recipe object
 *
 * @returns { object } - returns an object with an action type and favorite recipe(s)
 */

const fetchFavorites = favoriteRecipes => ({
  type: FETCH_FAVORITE_RECIPES,
  favoriteRecipes
});

export default fetchFavorites;
