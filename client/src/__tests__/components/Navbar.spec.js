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
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});
