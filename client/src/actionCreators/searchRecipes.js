import { SEARCH_RECIPES } from '../actions/types';

const searchRecipes = recipes => ({
  type: SEARCH_RECIPES,
  recipes
});

export default searchRecipes;
