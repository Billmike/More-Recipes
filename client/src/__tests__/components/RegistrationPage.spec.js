import React from 'react';
import { shallow } from 'enzyme';
import { RegistrationPage } from '../../components/RegistrationPage';

describe('<RegistrationPage />', () => {
  it('Should render the registration page correctly', () => {
    const wrapper = shallow(<RegistrationPage />);
    expect(wrapper).toMatchSnapshot();
  });
});
