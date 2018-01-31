import React from 'react';
import { Link } from 'react-router-dom';

const guestLinks = (props) => (
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

export default guestLinks;