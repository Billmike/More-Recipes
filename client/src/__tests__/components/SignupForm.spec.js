import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SignupForm } from '../../components/SignupForm';

test('Should render Signup Form correctly', () => {
  const wrapper = shallow(<SignupForm />);
  expect(wrapper).toMatchSnapshot();
});

