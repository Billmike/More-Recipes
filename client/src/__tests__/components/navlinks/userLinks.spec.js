import React from 'react';
import { shallow } from 'enzyme';
import UserLinks from '../../../components/navlinks/userLinks';

describe('<UserLinks />', () => {
  it('Should render the UserLinks component correctly', () => {
    const wrapper = shallow(<UserLinks />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(6);
  });
});
