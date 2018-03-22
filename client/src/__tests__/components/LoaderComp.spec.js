import React from 'react';
import { shallow } from 'enzyme';
import LoaderComp from '../../components/LoaderComp';

describe('<Modal />', () => {
  it('Should render the Modal correctly', () => {
    const wrapper = shallow(<LoaderComp />);
    expect(wrapper).toMatchSnapshot();
  });
});
