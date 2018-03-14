import React from 'react';
import { shallow } from 'enzyme';
import { Navbar, mapStateToProps } from '../../components/Navbar';
import UserLinks from '../../components/navlinks/userLinks';
import { auth } from '../fixtures/authUser';
import state from '../fixtures/state';

describe('<Navbar />', () => {
  it('Should render the Navbar component correctly', () => {
    const wrapper = shallow(<Navbar auth={auth} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render the GuestLinks if signed in', () => {
    const auth = {
      isAuthenticated: true
    };
    const logout = jest.fn();
    const wrapper = shallow(<Navbar auth={auth} logout={logout} />);
    wrapper.find('#userLinkID').simulate('click', {
      preventDefault: jest.fn()
    });
  })
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
