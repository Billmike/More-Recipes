import React from 'react';
import { shallow } from 'enzyme';
import { RecipeEdit } from '../../components/RecipeEdit';
import recipes from '../fixtures/recipes';

describe('<RecipeEdit />', () => {
  it('Should render the Edit recipe component correctly', () => {
    const wrapper = shallow(<RecipeEdit recipe={recipes[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
