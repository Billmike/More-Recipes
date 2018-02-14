import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Footer from './Footer';
import SignupForm from './SignupForm';
import { signupRequest } from '../actions/userSignupAction';

class RegistrationPage extends Component {
  render() {
    const { signupRequest } = this.props;
    return (
      <div>
        <SignupForm signupRequest={signupRequest} {...this.props} />
        <Footer />
      </div>
    );
  }
}

RegistrationPage.propTypes = {
  signupRequest: PropTypes.func.isRequired
};

export default connect(null, { signupRequest })(RegistrationPage);
