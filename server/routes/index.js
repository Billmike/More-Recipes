module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the lamest API for now',
  }));
  app.get('/api/v1/recipes', (req, res) => {
    res.status(200).json({
      recipes: [
        {
          id: 1,
          name: 'Shrimp Fried rice',
          description: 'An italian Dish with the best taste in the world.',
          category: 'Lunch',
          ingredients: ['rice', 'shrimp', 'onions', 'olive oil'],
          instructions: ['Perboil Boil rice', 'Wash shrimp properly', 'Steam for 1 - 3 hrs', 'Fry meat'],
        },
      ],
    });
  });
  app.post('/api/v1/recipes', (req, res) => {
    res.status(200).json({
      recipes: [
        {
          id: 1,
          name: 'Banana milk shake',
          description: 'Probably the best milk shake you ever had in your entire life',
          category: 'Dessert',
          ingredients: ['Milk', 'Banana', 'Olive oil'],
          instructions: ['Blend the banana properly', 'Filter and shake'],
        },
      ],
    });
  });
  app.put('/api/v1/recipes/:recipeId', (req, res) => {
    res.status(201).json({
      recipes: [
        {
          id: 1,
          name: 'Something different here',
          description: 'This resource has been modified recently',
          category: 'This has probably changed too.',
          ingredients: ['Modified', 'We modified this too'],
          instructions: ['Something awesome is cooking and I can feel it in my bones.'],
        },
      ],
    });
  });
  app.delete('/api/v1/recipes/:recipeId', (req, res) => {
    res.status(201).json({
      message: 'Recipe has been deleted successfully, so there is nothing for us to return to you',
    });
  });
  app.post('/api/v1/recipes/:recipeId/reviews', (req, res) => {
    res.status(200).json({
      reviews: {
        id: 1,
        content: 'Amazing recipe. I can\'t wait to try it out with my family members!',
      },
    });
  });
  app.get('/api/v1/recipes/sort/votes', (req, res) => {
    res.status(201).json({
      recipes: [
        {
          id: 1,
          name: 'Shrimp Fried rice',
          description: 'An italian Dish with the best taste in the world.',
          category: 'Lunch',
          ingredients: ['rice', 'shrimp', 'onions', 'olive oil'],
          instructions: ['Perboil Boil rice', 'Wash shrimp properly', 'Steam for 1 - 3 hrs', 'Fry meat'],
        },
      ],
      votes: [
        {
          voteCount: 24,
        },
      ],
      recipe: [
        {
          id: 1,
          name: 'Shrimp Fried rice',
          description: 'An italian Dish with the best taste in the world.',
          category: 'Lunch',
          ingredients: ['rice', 'shrimp', 'onions', 'olive oil'],
          instructions: ['Perboil Boil rice', 'Wash shrimp properly', 'Steam for 1 - 3 hrs', 'Fry meat'],
        },
      ],
      vote: [
        {
          voteCount: 20,
        },
      ],
      recip: [
        {
          id: 1,
          name: 'Shrimp Fried rice',
          description: 'An italian Dish with the best taste in the world.',
          category: 'Lunch',
          ingredients: ['rice', 'shrimp', 'onions', 'olive oil'],
          instructions: ['Perboil Boil rice', 'Wash shrimp properly', 'Steam for 1 - 3 hrs', 'Fry meat'],
        },
      ],
      vot: [
        {
          voteCount: 10,
        },
      ],
    });
  });
};
