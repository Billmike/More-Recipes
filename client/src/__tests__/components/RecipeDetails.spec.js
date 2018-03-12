import React from 'react';
import { shallow } from 'enzyme';
import { RecipeDetail, mapStateToProps } from '../../components/RecipeDetails';
import recipes from '../fixtures/recipes';
import { auth } from '../fixtures/authUser';
import ReviewForm from '../../components/ReviewForm';
import state from '../fixtures/state';

describe('<RecipeDetails Component', () => {
  const GetOneRecipeAction = jest.fn();
  const match = {
    params: {
      id: 1
    }
  };
  it('Should render the recipe details component properly', () => {
    const wrapper = shallow(<RecipeDetail
      GetOneRecipeAction={() => Promise.resolve()}
      match={match} recipe={recipes[2]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should call the favorites method handler', () => {
    const AddFavoriteRecipesAction = jest.fn();
    const wrapper = shallow(<RecipeDetail
      GetOneRecipeAction={() => Promise.resolve()}
      AddFavoriteRecipesAction={() => Promise.resolve()}
      match={match}
      recipe={recipes[2]}
    />);
    wrapper.find('#favoriteid').simulate('click', {
      preventDefault: jest.fn()
    });
  });
  it('Should call the down-vote method handler', () => {
    const DownVoteRecipeAction = jest.fn();
    const wrapper = shallow(<RecipeDetail
      GetOneRecipeAction={() => Promise.resolve()}
      AddFavoriteRecipesAction={() => Promise.resolve()}
      DownVoteRecipeAction={() => Promise.resolve()}
      match={match}
      recipe={recipes[2]}
    />);
    wrapper.find('#downvoteid').simulate('click', {
      preventDefault: jest.fn()
    });
  });
  it('Should call the up-vote method handler', () => {
    const UpvoteRecipeAction = jest.fn();
    const wrapper = shallow(<RecipeDetail
      GetOneRecipeAction={() => Promise.resolve()}
      AddFavoriteRecipesAction={() => Promise.resolve()}
      DownVoteRecipeAction={() => Promise.resolve()}
      UpvoteRecipeAction={() => Promise.resolve()}
      match={match}
      recipe={recipes[2]}
    />);
    wrapper.find('#upvoteid').simulate('click', {
      preventDefault: jest.fn()
    });
  });
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
