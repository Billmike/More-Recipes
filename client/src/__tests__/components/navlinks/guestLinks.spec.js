import React from 'react';
import { shallow } from 'enzyme';
import GuestLinks from '../../../components/navlinks/guestLinks';

describe('<guestLinks />', () => {
  it('Should mount the guestlink component properly', () => {
    const wrapper = shallow(<GuestLinks />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('ul').length).toBe(1);
    expect(wrapper.find('li').length).toBe(3);
  });
});
