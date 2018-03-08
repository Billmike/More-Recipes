import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../components/Modal';

describe('<Modal />', () => {
  it('Should render the Modal correctly', () => {
    const wrapper = shallow(<Modal />);
    expect(wrapper).toMatchSnapshot();
  });
});
