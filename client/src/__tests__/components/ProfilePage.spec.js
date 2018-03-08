import React from 'react';
import { shallow } from 'enzyme';
import { ProfilePage } from '../../components/ProfilePage';
import authuser from '../fixtures/authUser';

describe('<ProfilePage />', () => {
  it('Should render the profile page correctly', () => {
    const getUserinfo = jest.fn();
    const wrapper = shallow(<ProfilePage
      getUserinfo={() => Promise.resolve()}
      currentUserInfo={authuser} />);
    expect(wrapper).toMatchSnapshot();
  });
});
