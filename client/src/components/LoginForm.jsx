import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import validateInput from '../../../server/validators/validatesignin';


/**
 * Component that renders the Login Form
 *
 * @class LoginForm
 *
 * @extends Component
 */

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onFormValuesChange = this.onFormValuesChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onFormValuesChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
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
                  onChange={this.onFormValuesChange}
                  className={classNames(
                    'form-control form-control-lg',
                    { 'has-errors': errors.email }
                  )}
                  placeholder="Email Address" />
                {errors.email && (
                  <span
                    className="help-block has-errors"
                  >{errors.email}
                  </span>)
                }
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  value={this.state.password}
                  onChange={this.onFormValuesChange}
                  className={classNames('form-control form-control-lg',
                    { 'has-errors': errors.password }
                  )}
                  placeholder="Password" />
                {errors.password && (
                  <span
                    className="help-block has-errors"
                  >{errors.password}
                  </span>
                )}
              </div>
              <div>
              </div>
              <input
                type="submit"
                value="Submit"
                className="btn submit-btn size-bt btn-block"
              />
            </form>
            <p
              className="signin-pad"
            > Not yet registered?
            <Link
                className="account"
                to="/register"
              >
                Let's hook you up with an account.
            </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
