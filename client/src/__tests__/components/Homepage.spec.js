import React from 'react';
import { shallow } from 'enzyme';
import { Homepage, mapStateToProps } from '../../components/Hompage';
import { RecipeList } from '../../components/RecipesList';
import recipes, {
  FavoritesRecipeProps,
  recipesLoading
} from '../fixtures/recipes';
import state from '../fixtures/state';
import Loader from '../../components/Loader';

describe('<Homepage />', () => {
  it('Should render the homepage component correctly', () => {
    const getAllRecipesAction = jest.fn();
    const getPopularRecipes = jest.fn();
    const searchRecipesAction = jest.fn();
    const wrapper = shallow(<Homepage
        getAllRecipesAction={() => Promise.resolve()}
        getPopularRecipes={() => Promise.resolve()}
        searchRecipesAction={() => Promise.resolve()}
      />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(13);
  });

  it('Should render RecipesList as a child element', () => {
    const wrapper = shallow(<Homepage
        recipes={FavoritesRecipeProps}
        popularRecipes={FavoritesRecipeProps}
        getAllRecipesAction={() => Promise.resolve()}
        getPopularRecipes={() => Promise.resolve()}
        searchRecipesAction={() => Promise.resolve()}
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
        getAllRecipesAction={() => Promise.resolve()}
        getPopularRecipes={() => Promise.resolve()}
        searchRecipesAction={() => Promise.resolve()}
      />);
    wrapper.find('#searchParamId').simulate('change', {
      target: { name: 'searchQuery', value }
    });
    expect(wrapper.state('searchQuery')).toEqual(value);
  });

  it('Should render the loader', () => {
    const wrapper = shallow(<Homepage
        isLoading={recipesLoading}
        recipes={FavoritesRecipeProps}
        popularRecipes={FavoritesRecipeProps}
        getAllRecipesAction={() => Promise.resolve()}
        getPopularRecipes={() => Promise.resolve()}
        searchRecipesAction={() => Promise.resolve()}
      >
        <Loader />
      </Homepage>);
  });

  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
