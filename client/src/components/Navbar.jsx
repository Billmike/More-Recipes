import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => (
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
    </div>
  </nav>
);

export default Navbar;
