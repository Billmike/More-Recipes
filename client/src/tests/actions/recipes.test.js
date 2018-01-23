import { addRecipe, editRecipe, removeRecipe } from '../../actions/recipes';

test('Should setup edit recipe action object', () => {
  const action = editRecipe('1234acb', 'New Recipe description');
  expect(action).toEqual({
    type: 'EDIT_RECIPE',
    id: '1234acb',
    updates: 'New Recipe description',
  });
});

test('Should setup remove recipe action object', () => {
  const action = removeRecipe({ id: '1234abc' });
  expect(action).toEqual({
    type: 'REMOVE_RECIPE',
    id: '1234abc',
  });
});

test('Should setup add recipe action object', () => {
  const recipeData = {
    name: 'Awesome Fried Rice',
    description: 'Amazing Fried Rice',
    img_url: 'http://some_img_here',
    category: 'Lunch',
    ingredients: ['Monkey balls', 'Salamanda'],
    instructions: ['Cook me well', 'Fry the damn chow properly']
  };
  const action = addRecipe(recipeData);
  expect(action).toEqual({
    type: 'ADD_RECIPE',
    recipe: {
      ...recipeData,
      id: expect.any(String),
    },
  });
});

test('Should setup add recipe action object with default value', () => {
	const action = addRecipe();
	expect(action).toEqual({
		type: 'ADD_RECIPE',
		recipe: {
			id: expect.any(String),
			name: '',
			description: '',
			img_url: 'no-img-here',
			category: '',
			ingredients: [],
			instructions: []
		}
	});
});
