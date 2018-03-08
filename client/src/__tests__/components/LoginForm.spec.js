import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../components/LoginForm';

describe('<LoginForm />', () => {
  it('Should render the form correctly', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
  });
});
