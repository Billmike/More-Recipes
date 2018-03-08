import React from 'react';
import { shallow } from 'enzyme';
import { RecipeDetail } from '../../components/RecipeDetails';
import recipes from '../fixtures/recipes';

describe('<RecipeDetails Component', () => {
  it('Should render the recipe details component properly', () => {
    const GetOneRecipeAction = jest.fn();
    const match = {
      params: {
        id: 1
      }
    };
    const wrapper = shallow(<RecipeDetail
      GetOneRecipeAction={() => Promise.resolve()}
      match={match} recipe={recipes[2]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
