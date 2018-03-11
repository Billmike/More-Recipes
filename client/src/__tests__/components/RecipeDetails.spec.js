import React from 'react';
import { shallow } from 'enzyme';
import { RecipeDetail, mapStateToProps } from '../../components/RecipeDetails';
import recipes from '../fixtures/recipes';
import state from '../fixtures/state';

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
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
