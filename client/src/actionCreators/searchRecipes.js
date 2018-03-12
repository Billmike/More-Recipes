import { SEARCH_RECIPES } from '../actions/types';

const searchRecipes = (recipes, pagination) => ({
  type: SEARCH_RECIPES,
  recipes,
  pagination
});

export default searchRecipes;
