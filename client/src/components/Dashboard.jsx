import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import Footer from './Footer';
import Loader from './Loader';
import RecipeEdit from './RecipeEdit';
import { getUserRecipesAction } from '../actions/recipes';
import { getUserInformation } from '../actions/signinRequest';

/**
 * Component that renders the Dashboard page
 *
 * @class Dashboard
 *
 * @extends Component
 */
export class Dashboard extends Component {
  componentDidMount() {
    this.props.getUserRecipesAction();
    this.props.getUserInformation();
  }

  render() {
    let availableRecipes;
    if (this.props.isLoading) {
      return <Loader />;
    }
    if (this.props.recipes.length > 0) {
      availableRecipes = this.props.recipes.map((recipe) => {
        return <RecipeEdit key={recipe.id} recipe={recipe} />;
      });
    } else {
      availableRecipes = (
        <p className="no-recipes-p">
          {this.props.user.username}, you do not have any recipes yet.{' '}
          <Link to="/add">Create one now.</Link>
          <Emoji text=":)" />
        </p>
      );
    }
    return (
      <div id="dashbordBody">
        <div className="container">
          <h2 className="dashboard-h2">
            {' '}
            Welcome to your Dashboard, {this.props.user.username}!
          </h2>
          <h4 className="dashboard-h4"> My Recipes </h4>
          <div className="row">{availableRecipes}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.userRecipe,
    user: state.auth.userDetails,
    isLoading: state.recipes.isLoading
  };
};

export default connect(mapStateToProps, {
  getUserInformation,
  getUserRecipesAction
})(Dashboard);
