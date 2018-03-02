import React, { Component } from 'react';
import classNames from 'classnames';
import validateInput from '../../../server/validators/validatesignin';
import '../assets/css/signup.css';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onEmailChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onPasswordChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    if (this.isValid()) {
      this.props
        .signinRequest(this.state)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch((error) => {
          if (error === 'Invalid email or password.') {
            return toastr.error('Invalid login details');
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
      <div className="container">
      <div className="card text-center card-form has-feedback">
      <div className="card-body">
      <form onSubmit={this.onSubmit}>
            <h1 className="sign-up-h3">Login</h1>

            <div className="form-group">
              <input
              type="email"
              name="email"
              autoComplete="email"
              value={this.state.email}
              onChange={this.onEmailChange}
              className={classNames('form-control form-control-lg', { 'has-errors': errors.email })}
              placeholder="Email Address" />
              {errors.email && (
                <span className="help-block has-errors">{errors.email}</span>)}
            </div>
            <div className="form-group">
              <input
              type="password"
              name="password"
              autoComplete="current-password"
              value={this.state.password}
              onChange={this.onPasswordChange}
              className={classNames('form-control form-control-lg', { 'has-errors': errors.password })}
              placeholder="Password" />
              {errors.password && (
                <span className="help-block has-errors">{errors.password}</span>
              )}
            </div>
            <div>
            </div>
            <input type="submit" value="Submit" className="btn submit-btn size-bt btn-block" />
      </form>
      <p className="signin-pad"> Not yet registered? <a className="account" href="/register"> Let's hook you up with an account. </a> </p>
      </div>
      </div>
      </div>
    );
  }
}

export default LoginForm;
