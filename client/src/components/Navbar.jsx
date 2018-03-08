import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import UserLinks from '../components/navlinks/userLinks';
import GuestLinks from '../components/navlinks/guestLinks';
import { logout } from '../actions/signinRequest';
import logo from '../assets/img/more-recipes-logo.png';

export class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }

  logout(event) {
    event.preventDefault();
    this.props.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <nav
        className="navbar
        navbar-expand-lg navbar-light bg-light navbar-fixed-top">
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
          <img src={logo} alt="More-Recipes" height="80" width="120" />
        </Link>
        <div
          className="collapse navbar-collapse navbar-expand"
          id="startupNavbar"
        >
          {isAuthenticated ? <UserLinks
            logout={this.logout} />
            : <GuestLinks />}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { logout })(Navbar);
