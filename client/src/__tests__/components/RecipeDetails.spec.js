import React from 'react';
import { shallow } from 'enzyme';
import { RecipeDetail, mapStateToProps } from '../../components/RecipeDetails';
import recipes, { singleRecipe, recipesLoading } from '../fixtures/recipes';
import { auth } from '../fixtures/authUser';
import ReviewForm from '../../components/ReviewForm';
import state from '../fixtures/state';
import Loader from '../../components/Loader';

describe('<RecipeDetails Component', () => {
  const GetOneRecipeAction = jest.fn();
  const match = {
    params: {
      id: 1
    }
  };
  it('Should render the recipe details component properly', () => {
    const wrapper = shallow(<RecipeDetail
      singleRecipe={singleRecipe}
      GetOneRecipeAction={() => Promise.resolve()}
      match={match} recipe={recipes[2]} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should call the favorites method handler', () => {
    const AddFavoriteRecipesAction = jest.fn();
    const wrapper = shallow(<RecipeDetail
      singleRecipe={singleRecipe}
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
      singleRecipe={singleRecipe}
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
      singleRecipe={singleRecipe}
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
  it('Should render the loader with the right props passed', () => {
    const wrapper = shallow(<RecipeDetail
      singleRecipe={!singleRecipe}
      GetOneRecipeAction={() => Promise.resolve()}
      AddFavoriteRecipesAction={() => Promise.resolve()}
      DownVoteRecipeAction={() => Promise.resolve()}
      match={match}
      recipe={recipes[2]}
    >
      <Loader />
    </RecipeDetail>);
  });
  it('Should render ReviewForm as a child component', () => {
    const auth = {
      isAuthenticated: true
    };
    const reviewRecipe = jest.fn();
    const wrapper = shallow(<RecipeDetail
      singleRecipe={singleRecipe}
      auth={auth}
      match={match}
      recipe={recipes[2]}
      GetOneRecipeAction={() => Promise.resolve()}
      AddFavoriteRecipesAction={() => Promise.resolve()}
    >
      <ReviewForm
        reviewRecipe={reviewRecipe}
      />
    </RecipeDetail>);
  });
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
