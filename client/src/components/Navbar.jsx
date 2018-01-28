import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { logout } from '../actions/signinRequest';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
    this.props.history.push('/');
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    const userLink = (
      <ul className="nav navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Add Recipe</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">My Profile</Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={this.logout}>Logout</Link>
          </li>
      </ul>
    );

    const guestLinks = (
      <ul className="nav navbar-nav ml-auto">
          <li className="nav-item active">
            <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Login</Link>
          </li>
      </ul>
    );

    return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light navbar-fixed-top">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#startupNavbar"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <Link
        to="/"
        className="navbar-brand"
      >
        <img src="img/logo.png" alt="More-Recipes" height="26" />
      </Link>
      <div className="collapse navbar-collapse navbar-expand" id="startupNavbar">
        { isAuthenticated ? userLink : guestLinks }
      </div>
    </nav>
    )
  }
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logout })(Navbar);
