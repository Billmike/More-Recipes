import React from 'react';
import { shallow } from 'enzyme';
import Emoji from 'react-emoji-render';
import { Link } from 'react-router-dom';
import NotFoundPage from '../../components/NotFoundPage';

test('Should render the 404 page correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper.find('div').length).toBe(2);
  expect(wrapper.find('p').text()).toBe(
    "You've gone too far in search of a dessert, init?<Emoji /> <Link />"
  );
  expect(wrapper).toMatchSnapshot();
});
