import React from 'react';
import { shallow } from 'enzyme';
import { Navbar } from '../../components/Navbar';
import { auth } from '../fixtures/authUser';

describe('<Navbar />', () => {
  it('Should render the Navbar component correctly', () => {
    const wrapper = shallow(<Navbar auth={auth} />);
    expect(wrapper).toMatchSnapshot();
  });
});
