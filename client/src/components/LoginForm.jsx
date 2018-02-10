import React, { Component } from 'react';
import validateInput from '../../../server/validators/validatesignin';
import '../assets/css/signup.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  };

  onEmailChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {}, isLoading: true });
    if(this.isValid()) {
      this.props.signinRequest(this.state)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch((error) => {
          this.setState({ isLoading: false });
          if (error === 'Invalid email or password.') {
            return toastr.error('Invalid login details');
          }
        });
    }
  }

  isValid() {
    const { errors, valid } = validateInput(this.state);

    if(!valid) {
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
            <h1>Sign In</h1>
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
              {errors.password && <span className="help-block red-errors">{errors.password}</span>}
            </div>
            <input
              disabled={this.state.isLoading}
              type="submit"
              name="signup_submit"
              value="Sign In"
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

export default LoginForm;
