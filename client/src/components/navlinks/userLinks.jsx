import React from 'react';
import { Link } from 'react-router-dom';

const userLinks = (props) => (
  <ul className="nav navbar-nav ml-auto">
    <li className="nav-item active">
      <Link to="/" className="nav-link custom-link">Home <span className="sr-only">(current)</span></Link>
    </li>
    <li className="nav-item">
      <Link to="/dashboard" className="nav-link custom-link">My Recipes</Link>
    </li>
    <li className="nav-item">
      <Link to="/add" className="nav-link custom-link">Add Recipe</Link>
    </li>
    <li className="nav-item">
      <Link to="/profile" className="nav-link custom-link">My Profile</Link>
    </li>
    <li className="nav-item">
      <Link to="/" className="nav-link logout btn-primary" onClick={props.logout}>Logout</Link>
    </li>
  </ul>
);

export default userLinks;
