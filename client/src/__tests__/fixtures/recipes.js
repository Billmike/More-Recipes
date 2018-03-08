const recipes = [{
  id: 1,
  name: 'Amazing fried rice',
  description: 'A really amazing fried rice',
  img_url: 'https://somereallycoolimage.ly',
  category: 'Lunch',
  ingredients: 'Bread\nSamolina\nBeancake',
  instructions: 'Cook it really well\nAvoid mixing with water'
}, {
  id: 2,
  name: 'Amazing fried rice',
  description: 'A really amazing fried rice',
  img_url: 'https://somereallycoolimage.ly',
  category: 'Lunch',
  ingredients: 'Bread\nSamolina\nBeancake',
  instructions: 'Cook it really well\nAvoid mixing with water',
}, {
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
}];

export default recipes;
