import React from 'react';
import { shallow } from 'enzyme';
import { Favorites, mapStateToProps } from '../../components/Favorites';
import FavoriteModal from '../../components/FavoriteModal';
import auth from '../fixtures/authUser';
import { FavoritesRecipeProps } from '../fixtures/recipes';
import state from '../fixtures/state';

const GetUserFavoritesAction = jest.fn();
const getUserinfo = jest.fn();

describe('<Favorites />', () => {
  it('Should render the Favorites component', () => {
    const wrapper = shallow(<Favorites
      userDetails={auth}
      getUserinfo={() => Promise.resolve()}
      GetUserFavoritesAction={() => Promise.resolve()}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(3);
  });
  it('Should call the selectFavorite method handler', () => {
    const wrapper = shallow(<Favorites
      recipes={FavoritesRecipeProps}
      getUserinfo={() => Promise.resolve()}
      GetUserFavoritesAction={() => Promise.resolve()}
      userDetails={auth}
    />);
    wrapper.find('#selectFavoriteButton').simulate('click');
  });
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});