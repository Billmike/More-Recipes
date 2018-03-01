const mockReducers = {
  name: 'Amazing recipe',
  description: 'Amazing recipe here',
  img_url: 'https://someimagehereforall',
  category: 'Lunch',
  ingredients: 'Amala\nEwedu',
  instructions: 'Cook the meal well\nTurn properly',
  owner: 1,
  favorites: [{ userId: 1 }],
  reviews: [
    'Amazing recipe you got bruv!'
  ]
};

export const mockFavorites = {
  name: 'Amazing recipe',
  description: 'Amazing recipe here',
  img_url: 'https://someimagehereforall',
  category: 'Lunch',
  ingredients: 'Amala\nEwedu',
  instructions: 'Cook the meal well\nTurn properly',
  owner: 1,
  favorites: [{}],
  reviews: [
    {
      reviewData: 'Amazing recipe you got bruv!'
    }
  ]
};

export const recipeMock = [{
  name: 'Amazing recipe',
  description: 'Amazing recipe here',
  img_url: 'https://someimagehereforall',
  category: 'Lunch',
  ingredients: 'Amala\nEwedu',
  instructions: 'Cook the meal well\nTurn properly',
  owner: 1,
  favorites: [{ userId: 1 }],
  reviews: []
}];

export const favoritesRecipeMock = [{
  name: 'Amazing recipe',
  description: 'Amazing recipe here',
  img_url: 'https://someimagehereforall',
  category: 'Lunch',
  ingredients: 'Amala\nEwedu',
  instructions: 'Cook the meal well\nTurn properly',
  owner: 1,
  favorites: [{ }],
  reviews: []
}];

export const removeRecipeMock = [{
  id: 1,
  name: 'Amazing recipe',
  description: 'Amazing recipe here',
  img_url: 'https://someimagehereforall',
  category: 'Lunch',
  ingredients: 'Amala\nEwedu',
  instructions: 'Cook the meal well\nTurn properly',
  owner: 1,
  favorites: [{ userId: 1 }],
  reviews: []
}];

export const singleRecipes = {
  recipeData: {
    name: 'Amazing recipe',
    description: 'Amazing recipe here',
    img_url: 'https://someimagehereforall',
    category: 'Lunch',
    ingredients: 'Amala\nEwedu',
    instructions: 'Cook the meal well\nTurn properly',
    owner: 1,
    favorites: [{ userId: 1 }],
    reviews: []
  }
};

export const reviews = {
  reviewData: 'Amazing recipe you got bruv!'
};

export default mockReducers;
