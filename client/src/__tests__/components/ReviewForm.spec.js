import React from 'react';
import { shallow } from 'enzyme';
import ReviewForm from '../../components/ReviewForm';

describe('<ReviewForm />', () => {
  it('Should render the review form correctly', () => {
    const wrapper = shallow(<ReviewForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
