import React from 'react';
import { shallow } from 'enzyme';
import { Homepage, mapStateToProps } from '../../components/Hompage';
import { RecipeList } from '../../components/RecipesList';
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
      GetAllRecipesAction={() => Promise.resolve()}
      GetPopularRecipes={() => Promise.resolve()}
      SearchRecipesAction={() => Promise.resolve()}
    >
      <div>
        <h2 className="homepage-h2"> Popular Recipes of the week</h2>
        <div className="row">
          <RecipeList />
        </div>
      </div>
    </Homepage>);
  });

  it('Should call mapStateToProps', (done) => {
    mapStateToProps(state);
    done();
  });
});
