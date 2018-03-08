import React from 'react';
import { shallow } from 'enzyme';
import { Favorites } from '../../components/Favorites';
import auth from '../fixtures/authUser';

describe('<Favorites />', () => {
  it('Should render the Favorites component', () => {
    const GetUserFavoritesAction = jest.fn();
    const getUserinfo = jest.fn();
    const wrapper = shallow(<Favorites
      userDetails={auth}
      getUserinfo={() => Promise.resolve()}
      GetUserFavoritesAction={() => Promise.resolve()}
    />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(3);
  });
});
