import React from 'react';
import { shallow } from 'enzyme';
import FavoriteModal from '../../components/FavoriteModal';

describe('<Modal />', () => {
  it('Should render the Modal correctly', () => {
    const wrapper = shallow(<FavoriteModal />);
    expect(wrapper).toMatchSnapshot();
  });
});
