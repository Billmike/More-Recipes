import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Footer from '../../components/Footer';

test('Should render footer correctly', () => {
  const wrapper = shallow(<Footer />);
  expect(wrapper.find('div').length).toBe(2);
  expect(wrapper.find('span').length).toBe(1);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
