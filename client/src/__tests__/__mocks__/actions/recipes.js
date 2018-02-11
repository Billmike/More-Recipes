const recipe = {
  name: 'Amazing fried rice',
  description: 'A really amazing fried rice',
  img_url: 'https://somereallycoolimage.ly',
  category: 'Lunch',
  ingredients: 'Bread\nSamolina\nBeancake',
  instructions: 'Cook it really well\nAvoid mixing with water'
};

export const mockFavoriteRecipes = {
  recipeData: {
    name: 'Amazing fried rice',
    description: 'A really amazing fried rice',
    img_url: 'https://somereallycoolimage.ly',
    category: 'Lunch',
    ingredients: 'Bread\nSamolina\nBeancake',
    instructions: 'Cook it really well\nAvoid mixing with water'
  },
  status: 'Success'
};

export const recipeResponse = {
  status: 'Success',
  recipeData: recipe
};

export const deleteRecipeResponse = {
  status: 'Success',
  recipeData: {}
};
