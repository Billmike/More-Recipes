import React from 'react';
import { shallow } from 'enzyme';
import Pagination from '../../components/Pagination';

describe('<Pagination />', () => {
  it('Should render the Pagination component correctly', () => {
    const wrapper = shallow(<Pagination />);
    expect(wrapper).toMatchSnapshot();
  });
});
