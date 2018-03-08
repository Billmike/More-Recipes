import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Review from '../../components/Review';
import reviews from '../fixtures/reviews';

test('Should render review component correctly', () => {
  const wrapper = shallow(<Review review={reviews} />);
  expect(wrapper.find('div').length).toBe(2);
  expect(toJSON(wrapper)).toMatchSnapshot();
});
