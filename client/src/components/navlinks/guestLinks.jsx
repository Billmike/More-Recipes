import React from 'react';
import { Link } from 'react-router-dom';

const guestLinks = props => (
  <ul className="nav navbar-nav ml-auto">
    <li className="nav-item active">
      <Link
        to="/"
        className="nav-link custom-link">
        Home
        <span
          className="sr-only"
        >(current)
        </span>
      </Link>
    </li>
    <li className="nav-item">
      <Link
        id="signupID"
        to="/register"
        className="nav-link custom-link">
        Register
      </Link>
    </li>
    <li className="nav-item">
      <Link
        id="signinID"
        to="/login"
        className="nav-link custom-link logout">
        Login
      </Link>
    </li>
  </ul>
);

export default guestLinks;
