import { authUser } from '../fixtures/authUser';

const recipe = {
  id: 3,
  name: 'Amazing fried rice',
  description: 'A really amazing fried rice',
  img_url: 'https://somereallycoolimage.ly',
  category: 'Lunch',
  ingredients: 'Bread\nSamolina\nBeancake',
  instructions: 'Cook it really well\nAvoid mixing with water',
  favorites: [{
    userId: 1
  }],
  reviews: [{
    id: 1,
    content: 'Amazing recipe you got',
    createdAt: '19th-Jan-2018',
    updatedAt: '19th-Jan-2018'
  }]
};

const userRecipes = [
  {
    id: 3,
    name: 'Amazing fried rice',
    description: 'A really amazing fried rice',
    img_url: 'https://somereallycoolimage.ly',
    category: 'Lunch',
    ingredients: 'Bread\nSamolina\nBeancake',
    instructions: 'Cook it really well\nAvoid mixing with water',
    favorites: [{
      userId: 1
    }],
    reviews: [{
      id: 1,
      content: 'Amazing recipe you got',
      createdAt: '19th-Jan-2018',
      updatedAt: '19th-Jan-2018'
    }]
  }
];

const state = {
  auth: {
    userDetails: {
      authUser
    }
  },
  recipes: {
    singleRecipe: recipe,
    userRecipe: userRecipes,
    recipes: recipe,
    favoriteRecipes: recipe
  }
};

export default state;
