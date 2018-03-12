import React from 'react';
import { shallow } from 'enzyme';
import { Homepage, mapStateToProps } from '../../components/Hompage';
import { RecipeList } from '../../components/RecipesList';
import recipes, { FavoritesRecipeProps } from '../fixtures/recipes';
import state from '../fixtures/state';

describe('<Homepage />', () => {
  it('Should render the homepage component correctly', () => {
    const GetAllRecipesAction = jest.fn();
    const GetPopularRecipes = jest.fn();
    const SearchRecipesAction = jest.fn();
    const wrapper = shallow(<Homepage
      GetAllRecipesAction={() => Promise.resolve()}
      GetPopularRecipes={() => Promise.resolve()}
      SearchRecipesAction={() => Promise.resolve()}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(13);
  });

  it('Should render RecipesList as a child element', () => {
    const wrapper = shallow(<Homepage
      recipes={FavoritesRecipeProps}
      popularRecipes={FavoritesRecipeProps}
      GetAllRecipesAction={() => Promise.resolve()}
      GetPopularRecipes={() => Promise.resolve()}
      SearchRecipesAction={() => Promise.resolve()}
    >
      <div>
        <h2 className="homepage-h2"> Popular Recipes of the week</h2>
        <div className="row">
          <RecipeList recipe={recipes[0]} />
        </div>
      </div>
    </Homepage>);
  });
  it('Should set the value of the search parameter', () => {
    const value = 'Fried rice';
    const wrapper = shallow(<Homepage
      recipes={FavoritesRecipeProps}
      popularRecipes={FavoritesRecipeProps}
      GetAllRecipesAction={() => Promise.resolve()}
      GetPopularRecipes={() => Promise.resolve()}
      SearchRecipesAction={() => Promise.resolve()}
    />);
    wrapper.find('#searchParamId').simulate('change', {
      target: { name: 'searchQuery', value }
    });
    expect(wrapper.state('searchQuery')).toEqual(value);
  })

  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
