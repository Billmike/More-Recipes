import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from '../../components/RecipesList';
import recipes from '../fixtures/recipes';

test('Should display the list of recipes in the application', () => {
	const wrapper = shallow(<RecipeList {...recipes[0]} />);
	expect(wrapper).toMatchSnapshot();
});
