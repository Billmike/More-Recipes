import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch((errors) => {
          this.setState({ isLoading: false });
          if (errors === 'Username must be unique.') {
            return toastr.error('This username is taken.');
          } else {
            return toastr.error('Invalid credentials.');
          }
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

            <div>
              <input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.onUsernameChange}
                placeholder="Username"
              />
              {errors.username && <span className="help-block red-errors">{errors.username}</span>}
            </div>
            <div>
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.onEmailChange}
                placeholder="E-mail"
              />
              {errors.email && <span className="help-block red-errors">{errors.email}</span>}
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.onPasswordChange}
                placeholder="Password"
              />
              {errors.password && <span className="help-block has-errors">{errors.password}</span>}
            </div>
            <input
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

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
}

export default connect(mapStateToProps)(SignupForm);
