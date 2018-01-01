import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../assets/css/signup.css';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
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
    this.props.signupRequest(this.state).then(
      () => {},
      ({ data }) => this.setState({ errors: data }),
    );
    console.log(this.state);
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <div id="login-box">
          <div className="left">
            <h1>Sign up</h1>

            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.onUsernameChange}
              placeholder="Username"
            />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.onEmailChange}
              placeholder="E-mail"
            />
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              placeholder="Password"
            />

            <input type="submit" name="signup_submit" value="Sign up" />
          </div>

          <div className="right">
            <span className="loginwith">Sign in with<br />social network</span>

            <button className="social-signin facebook">Log in with facebook</button>
            <button className="social-signin twitter">Log in with Twitter</button>
            <button className="social-signin google">Log in with Google+</button>
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
