import React from 'react';
import { shallow } from 'enzyme';
import { AddRecipe } from '../../components/AddRecipe';
import recipes from '../fixtures/recipes';

let addRecipe, history, wrapper;

beforeEach(() => {
	addRecipe = jest.fn();
	history = { push: jest.fn() };
	wrapper = shallow(<AddRecipe addRecipe={addRecipe} history={history} />);
});

test('Should render Add Recipe page correctly', () => {
	expect(wrapper).toMatchSnapshot();
});

test('Should handle onSubmit action for Addition of recipes', () => {
	wrapper.find('RecipesForm').prop('onSubmit')(recipes[0]);
	expect(history.push).toHaveBeenLastCalledWith('/');
	expect(addRecipe).toHaveBeenLastCalledWith(recipes[0]);
});
