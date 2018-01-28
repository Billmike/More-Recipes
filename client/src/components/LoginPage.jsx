import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signinRequest } from '../actions/signinRequest';
import LoginForm from './LoginForm.jsx';

class LoginPage extends Component {
  render() {
    const { signinRequest } = this.props;
    return (
      <div>
        <LoginForm signinRequest={signinRequest} {...this.props}/>
      </div>
    );
  }
};

export default connect(null, { signinRequest })(LoginPage);
