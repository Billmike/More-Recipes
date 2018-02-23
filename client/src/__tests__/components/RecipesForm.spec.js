import React from 'react';
import { shallow } from 'enzyme';
import RecipesForm from '../../components/RecipesForm';
import recipes from '../fixtures/recipes';

test('Should render Recipes form properly', () => {
  const wrapper = shallow(<RecipesForm />);
  expect(wrapper).toMatchSnapshot();
});

test('Should render Recipes form properly with recipe data ', () => {
  const wrapper = shallow(<RecipesForm recipe={recipes[1]} />);
  expect(wrapper).toMatchSnapshot();
});

test('Should set name on input change', () => {
  const value = 'Fried rice';
  const wrapper = shallow(<RecipesForm />);
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('name')).toBe(value);
});

test('Should set description on input change', () => {
  const value = 'Amazing fried rice';
  const wrapper = shallow(<RecipesForm />);
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('Should set the category on input change', () => {
  const value = 'Lunch';
  const wrapper = shallow(<RecipesForm />);
  wrapper.find('select').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('category')).toBe(value);
});

test('Should set the ingredients on input change', () => {
  const value = 'Mocasin\nBlueberries\nCambodian nuts';
  const wrapper = shallow(<RecipesForm />);
  wrapper.find('textarea').at(0).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('ingredients')).toBe(value);
});

test('Should set the instructions on input change', () => {
  const value = 'Cook well for 10mins\nServe with relatives\nEnjoy!';
  const wrapper = shallow(<RecipesForm />);
  wrapper.find('textarea').at(1).simulate('change', {
    target: { value }
  });
  expect(wrapper.state('instructions')).toBe(value);
});

test('Should call onSubmit for valid form submission', () => {
  const onSubmitSpy = jest.fn();
  const wrapper = shallow(<RecipesForm recipe={recipes[0]} onSubmit={onSubmitSpy} />);
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    name: recipes[0].name,
    description: recipes[0].description,
    category: recipes[0].category,
    img_url: 'no-img-here',
    ingredients: recipes[0].ingredients,
    instructions: recipes[0].instructions
  });
})
