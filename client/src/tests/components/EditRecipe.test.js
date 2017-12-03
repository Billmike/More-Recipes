import React from 'react';
import { shallow } from 'enzyme';
import { EditRecipe } from '../../components/EditRecipe';
import recipes from '../fixtures/recipes';

let editRecipe, history, wrapper;

beforeEach(() => {
	editRecipe = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(
		<EditRecipe
			editRecipe={editRecipe}
			history={history}
			recipe={recipes[0]}
		/>
		);
});

test('Should render EditRecipe page to the screen', () => {
	expect(wrapper).toMatchSnapshot();
});

test('Should handle the editing of recipes in the application', () => {
	wrapper.find('RecipesForm').prop('onSubmit')(recipes[0]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(editRecipe).toHaveBeenLastCalledWith(recipes[0].id, recipes[0]);
});
