import React from 'react';
import { Link } from 'react-router-dom';

const userLinks = (props) => (
  <ul className="nav navbar-nav ml-auto">
    <li className="nav-item active">
      <Link to="/" className="nav-link">Home <span className="sr-only">(current)</span></Link>
    </li>
    <li className="nav-item">
      <Link to="/add" className="nav-link">Add Recipe</Link>
    </li>
    <li className="nav-item">
      <Link to="/login" className="nav-link">My Profile</Link>
    </li>
    <li className="nav-item">
      <Link to="/" className="nav-link" onClick={props.logout}>Logout</Link>
    </li>
  </ul>
);

export default userLinks;
