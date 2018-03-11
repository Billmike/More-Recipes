import React from 'react';
import { shallow } from 'enzyme';
import { RecipeList } from '../../components/RecipesList';
import recipes from '../fixtures/recipes';

describe('<RecipesList />', () => {
  it('Should mount the Recipe List component correctly', () => {
    const wrapper = shallow(<RecipeList recipe={recipes[2]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should handle the click event', () => {
    const AddFavoriteRecipesAction = jest.fn();
    const wrapper = shallow(<RecipeList
      recipe={recipes[2]}
      AddFavoriteRecipesAction={() => Promise.resolve()}
    />);
    wrapper.find('#favbutton').simulate('click', {
      preventDefault: jest.fn()
    });
    expect(AddFavoriteRecipesAction.mock.calls).toBeTruthy();
  });
});
