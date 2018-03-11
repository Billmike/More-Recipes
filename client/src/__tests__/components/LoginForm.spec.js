import React from 'react';
import { shallow } from 'enzyme';
import LoginForm from '../../components/LoginForm';

describe('<LoginForm />', () => {
  it('Should render the form correctly', () => {
    const wrapper = shallow(<LoginForm />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('div').length).toBe(6);
  });
  it('Should handle input change', () => {
    const value = 'randomemail@gmail.com';
    const wrapper = shallow(<LoginForm />);
    wrapper.find('#email').simulate('change', {
      target: { name: 'email', value }
    });
    expect(wrapper.state('email')).toBe(value);
  });
  it('Should populate the form field and update the state', () => {
    const signinRequest = jest.fn();
    const wrapper = shallow(<LoginForm signinRequest={() => Promise.resolve()} />);
    wrapper.instance().setState({
      email: 'randomemail@gmail.com',
      password: 'qwertyuiop',
      errors: {}
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.instance().state).toEqual({
      email: 'randomemail@gmail.com',
      password: 'qwertyuiop',
      errors: {}
    });
  });
  it('Should render errors on invalid form submission', () => {
    const wrapper = shallow(<LoginForm />);
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state('errors')).toBeTruthy();
  });
});
