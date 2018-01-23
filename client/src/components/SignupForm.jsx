import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import InputFieldGroup from './InputFieldGroup';
import validateInput from '../../../server/validators/validatesignup';
import '../assets/css/signup.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onUsernameChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onEmailChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }


  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props
        .signupRequest(this.state)
        .then((response) => {
          console.log(response);
        })
        .catch((errors) => {
          console.log(errors.response);
          this.setState({
            errors: errors.response.data,
            isLoading: false,
          });
        });
    }
  }

  isValid() {
    const { errors, valid } = validateInput(this.state);

    if (!valid) {
      this.setState({ errors });
    }

    return valid;
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <div id="login-box">
          <div className="left">
            <h1>Sign up</h1>

            <InputFieldGroup
              errors={errors.username}
              placeholder="Username"
              onChange={this.onUsernameChange}
              value={this.state.username}
              field="username"
            />

            <InputFieldGroup
              errors={errors.email}
              placeholder="Email Address"
              onChange={this.onEmailChange}
              value={this.state.email}
              field="email"
            />

            <InputFieldGroup
              errors={errors.password}
              placeholder="Password"
              onChange={this.onPasswordChange}
              value={this.state.password}
              field="password"
            />
            <input
              disabled={this.state.isLoading}
              type="submit"
              name="signup_submit"
              value="Sign up"
            />
          </div>

          <div className="right">
            <span className="loginwith">
              Sign in with<br />social network
            </span>

            <button className="social-signin facebook">
              Log in with facebook
            </button>
            <button className="social-signin twitter">
              Log in with Twitter
            </button>
            <button className="social-signin google">
              Log in with Google+
            </button>
          </div>
          <div className="or">OR</div>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  signupRequest: PropTypes.func.isRequired,
};

export default SignupForm;
