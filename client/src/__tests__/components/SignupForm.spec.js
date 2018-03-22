import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';
import { SignupForm, mapStateToProps } from '../../components/SignupForm';
import { auth } from '../fixtures/authUser';
import state from '../fixtures/state';

describe('<SignupForm component />', () => {
  it('Should render the sign-up form correctly', () => {
    const wrapper = shallow(<SignupForm />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Should render errors for an invalid form submission', () => {
    const wrapper = shallow(<SignupForm />);
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state('errors')).toBeTruthy();
  });
  it('Should handle input change', () => {
    const value = 'usernameunique';
    const wrapper = shallow(<SignupForm />);
    wrapper.find('#username').simulate('change', {
      target: { name: 'username', value }
    });
    expect(wrapper.state('username')).toBe(value);
  });
  it('Should handle input change for email', () => {
    const value = 'someemail@gmail.com';
    const wrapper = shallow(<SignupForm />);
    wrapper.find('#email').simulate('change', {
      target: { name: 'email', value }
    });
    expect(wrapper.state('email')).toBe(value);
  });
  it('Should populate the form field and update the state', () => {
    const signupRequest = jest.fn();
    const wrapper = shallow(<SignupForm
      signupRequest={() => Promise.resolve()} />);
    wrapper.instance().setState({
      username: 'testusername',
      email: 'email@gmail.com',
      password: 'qwertyuiop',
      errors: {}
    });
    wrapper.update();
    wrapper.find('form').simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.instance().state).toEqual({
      username: 'testusername',
      email: 'email@gmail.com',
      password: 'qwertyuiop',
      errors: {}
    });
  });
  it('Should call componentDidUpdate when it receives new props', () => {
    const history = { push: jest.fn() };
    const nextProps = {
      isAuthenticated: false
    };
    const wrapper = shallow(<SignupForm
      isAuthenticated={auth}
      history={history} />);
    wrapper.instance().componentDidUpdate(nextProps);
    expect(wrapper.instance().props
      .isAuthenticated).toEqual(nextProps);
  });
  it('Should call mapStateToProps', () => {
    mapStateToProps(state);
  });
});

