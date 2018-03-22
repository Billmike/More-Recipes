import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import Review from '../../components/Review';
import reviews from '../fixtures/reviews';

describe('<Review />', () => {
  it('Should render the review form successfully', () => {
    const wrapper = shallow(<Review review={reviews} />);
    expect(wrapper.find('div').length).toBe(2);
    expect(toJSON(wrapper)).toMatchSnapshot();
  });
});

