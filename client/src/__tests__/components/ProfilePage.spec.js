import React from 'react';
import { shallow } from 'enzyme';
import { ProfilePage, mapStateToProps } from '../../components/ProfilePage';
import authuser from '../fixtures/authUser';
import state from '../fixtures/state';

describe('<ProfilePage />', () => {
  it('Should render the profile page correctly', () => {
    const getUserinfo = jest.fn();
    const wrapper = shallow(<ProfilePage
      getUserinfo={() => Promise.resolve()}
      currentUserInfo={authuser} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
