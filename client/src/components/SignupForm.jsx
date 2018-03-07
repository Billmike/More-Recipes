import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import validateInput from '../../../server/validators/validatesignup';

export class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      errors: {},
    };
    this.onFormValuesChange = this.onFormValuesChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(nextProps) {
    if (this.props.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  onFormValuesChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  }

  onSubmit(event) {
    event.preventDefault();

    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props
        .signupRequest(this.state)
        .then(() => {
          this.props.history.push('/dashboard');
        })
        .catch((errors) => {
          if (errors === 'Username must be unique.') {
            return toastr.error('This username is taken.');
          }
          return toastr.error('Invalid credentials.');
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
              <h1 className="sign-up-h3">Register</h1>

              <div className="form-group">
                <input
                  type="text"
                  name="username"
                  autoComplete="username"
                  value={this.state.username}
                  onChange={this.onFormValuesChange}
                  className={classNames('form-control form-control-lg',
                    { 'has-errors': errors.username })}
                  placeholder="Username" />
                {errors.username && (
                  <span
                    className="help-block has-errors"
                  >
                    {errors.username}
                  </span>
                )}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  value={this.state.email}
                  onChange={this.onFormValuesChange}
                  className={classNames(
                    'form-control form-control-lg',
                    { 'has-errors': errors.email }
                  )}
                  placeholder="Email Address" />
                {errors.email && (
                  <span
                    className="help-block has-errors"
                  >
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  autoComplete="new-password"
                  value={this.state.password}
                  onChange={this.onFormValuesChange}
                  className={classNames(
                    'form-control form-control-lg',
                    { 'has-errors': errors.password }
                  )}
                  placeholder="Password" />
                {errors.password && (
                  <span
                    className="help-block has-errors"
                  >
                    {errors.password}
                  </span>
                )}
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn submit-btn size-bt btn-block"
              />
            </form>
            <p> Have an account?
          <a
                className="account"
                href="/login"
              >
                Sign in
          </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

SignupForm.propTypes = {
  signupRequest: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(SignupForm);
