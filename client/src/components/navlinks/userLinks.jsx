import React from 'react';
import { Link } from 'react-router-dom';

const userLinks = props => (
  <ul className="nav navbar-nav ml-auto">
    <li className="nav-item active">
      <Link
        id="home-button"
        to="/"
        className="nav-link custom-link">
        Home
      <span className="sr-only">
          (current)</span>
      </Link>
    </li>
    <li className="nav-item">
      <Link
        to="/dashboard"
        className="nav-link custom-link">
        My Recipes
      </Link>
    </li>
    <li className="nav-item">
      <Link
        id="addRecipeID"
        to="/add"
        className="nav-link custom-link">
        Add Recipe
      </Link>
    </li>
    <li>
      <Link
        id="favoritesButton"
        to="/favorites"
        className="nav-link custom-link">
        My Favorites
      </Link>
    </li>
    <li className="nav-item">
      <Link
        id="profileID"
        to="/profile"
        className="nav-link custom-link">
        My Profile
      </Link>
    </li>
    <li className="nav-item">
      <Link
        id="logoutButton"
        to="/"
        className="nav-link logout btn-primary"
        onClick={props.logout}>
        Logout
      </Link>
    </li>
  </ul>
);

export default userLinks;
