import React from 'react';
import { shallow } from 'enzyme';
import Loader from '../../components/Loader';

describe('<Loader />', () => {
  it('Should mount the loader component', () => {
    const wrapper = shallow(<Loader />);
    expect(wrapper).toMatchSnapshot();
  });
});
