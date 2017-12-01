import recipesReducers from '../../reducers/recipes';
import recipes from '../fixtures/recipes';

test('Should set default state for reducers', () => {
	const state = recipesReducers(undefined, { type: '@@INIT' });
	expect(state).toEqual([]);
});

test('Should remove a recipe from the application', () => {
	const action = {
		type: 'REMOVE_RECIPE',
		id: recipes[1].id
	};
	const state = recipesReducers(recipes, action);
	expect(state).toEqual([ recipes[0] ]);
});

test('Should not remove recipe with wrong ID', () => {
	const action = {
		type: 'REMOVE_RECIPE',
		id: '234'
	};
	const state = recipesReducers(recipes, action);
	expect(state).toEqual(recipes);
});

test('Should add a recipe to the application', () => {
	const action = {
		type: 'ADD_RECIPE',
		recipe: {
			id: '1',
			name: 'Fried Rice',
			description: 'Awesome fried rice',
			img_url: 'no-img-here',
			category: 'Lunch',
			ingredients: ['Peppr', 'Tomatoes', 'Onions'],
			instructions: ['COok the food well', 'Make no assumptions'],
		}
	};
	const state = recipesReducers(recipes, action);
	expect(state).toEqual([...recipes, action.recipe]);
});

test('Should edit a recipe in the application', () => {
	const name = 'New Fried Rice';
	const action = {
		type: 'EDIT_RECIPE',
		id: recipes[0].id,
		updates: {
			name
		}
	};
	const state = recipesReducers(recipes, action);
	expect(state[0].name).toBe(name);
});

test('Should not edit a recipe with an invalid id', () => {
	const description = 'Amaze balls';
	const action = {
		type: 'EDIT_RECIPE',
		id: '-1',
		updates: {
			description
		}
	};
	const state = recipesReducers(recipes, action);
	expect(state).toEqual(recipes);
});
