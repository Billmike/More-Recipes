import React from 'react';
import { shallow } from 'enzyme';
import { RecipeEdit } from '../../components/RecipeEdit';
import Modal from '../../components/Modal';
import recipes from '../fixtures/recipes';

describe('<RecipeEdit />', () => {
  it('Should render the Edit recipe component correctly', () => {
    const wrapper = shallow(<RecipeEdit recipe={recipes[0]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should call the onSelected method handler', () => {
    const wrapper = shallow(<RecipeEdit recipe={recipes[0]} />);
    wrapper.find('#selectRecipe').simulate('click');
  });
  it('Should handle onRemove recipe method', () => {
    const wrapper = shallow(<RecipeEdit recipe={recipes[0]} />);
    wrapper.find('#editRecipeLink').simulate('click');
  });
});
