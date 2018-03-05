const recipe = {
  name: 'Amazing fried rice',
  description: 'A really amazing fried rice',
  img_url: 'https://somereallycoolimage.ly',
  category: 'Lunch',
  ingredients: 'Bread\nSamolina\nBeancake',
  instructions: 'Cook it really well\nAvoid mixing with water',
};

const editedRecipe = {
  id: 1,
  name: 'Amazing fried rice',
  description: 'A really amazing fried rice',
  img_url: 'https://somereallycoolimage.ly',
  category: 'Lunch',
  ingredients: 'Bread\nSamolina\nBeancake',
  instructions: 'Cook it really well\nAvoid mixing with water',
};

export const mockRecipesReducers = {
  name: 'Amazing recipe',
  description: 'Amazing recipe here',
  img_url: 'https://someimagehereforall',
  category: 'Lunch',
  ingredients: 'Amala\nEwedu',
  instructions: 'Cook the meal well\nTurn properly',
  owner: 1
};

export const mockFavoriteRecipes = {
  recipeData: {
    name: 'Amazing fried rice',
    description: 'A really amazing fried rice',
    img_url: 'https://somereallycoolimage.ly',
    category: 'Lunch',
    ingredients: 'Bread\nSamolina\nBeancake',
    instructions: 'Cook it really well\nAvoid mixing with water',
  },
  status: 'Success'
};

export const recipeResponse = {
  status: 'Success',
  recipeData: recipe
};

export const editRecipeResponse = {
  status: 'Success',
  recipeData: editedRecipe
};

export const deleteRecipeResponse = {
  status: 'Success',
  recipeData: {}
};
