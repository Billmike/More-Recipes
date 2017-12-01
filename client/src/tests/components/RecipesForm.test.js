import React from 'react';
import { shallow } from 'enzyme';
import RecipesForm from '../../components/RecipesForm';
import recipes from '../fixtures/recipes';

test('Should render the RecipesForm to the screen', () => {
	const wrapper = shallow(<RecipesForm />);
	expect(wrapper).toMatchSnapshot();
});

test('Should render the form with recipes data', () => {
	const wrapper = shallow(<RecipesForm recipe={recipes[0]} />);
	expect(wrapper).toMatchSnapshot();
});

test('Should set Recipe name on Input change', () => {
	const value = 'Fried Chicken';
	const wrapper = shallow(<RecipesForm />);
	wrapper.find('input').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('name')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('Should set recipe description on input change', () => {
	const value = 'Amazing Fried Chicken';
	const wrapper = shallow(<RecipesForm />);
	wrapper.find('textarea').at(0).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('description')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('Should set recipe category on input change', () => {
	const value = 'Lunch';
	const wrapper = shallow(<RecipesForm />);
	wrapper.find('input').at(2).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('category')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('Should set the recipe ingredients on input change', () => {
	const value = ['Curry', 'Thyme', 'Maggi', 'Salt'];
	const wrapper = shallow(<RecipesForm />);
	wrapper.find('input').at(3).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('ingredients')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('Should set the instructions on input change', () => {
	const value = ['Parboil the rice for 20mins', 'Boil the yam for 1hr.', 'Do not set the kitchen on fire.'];
	const wrapper = shallow(<RecipesForm />);
	wrapper.find('textarea').at(1).simulate('change', {
		target: { value }
	});
	expect(wrapper.state('instructions')).toBe(value);
	expect(wrapper).toMatchSnapshot();
});

test('Should call onSubmit prop for valid form submission', () => {
	const onSubmitSpy = jest.fn();
	const wrapper = shallow(<RecipesForm recipe={recipes[0]} onSubmit={onSubmitSpy} />);
	wrapper.find('form').simulate('submit', {
		preventDefault: () => { }
	});
	expect(onSubmitSpy).toHaveBeenLastCalledWith({
		name: recipes[0].name,
		description: recipes[0].description,
		category: recipes[0].category,
		img_url: recipes[0].img_url,
		ingredients: recipes[0].ingredients,
		instructions: recipes[0].instructions,
	});
});
