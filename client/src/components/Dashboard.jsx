import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import Footer from './Footer';
import RecipeEdit from './RecipeEdit';
import { startGetUserRecipes } from '../actions/recipes';
import { getUserinfo } from '../actions/signinRequest';

class Dashboard extends Component {
  componentWillMount() {
    this.props.startGetUserRecipes();
    this.props.getUserinfo();
  }

  render() {
    let availableRecipes;
    if (this.props.recipes) {
      availableRecipes =
        this.props.recipes.length > 0 ? (
          this.props.recipes.map(recipe => {
            return <RecipeEdit key={recipe.id} {...recipe} />;
          })
        ) : (
          <p className="no-recipes-p">
            {this.props.user.username}, you do not have any recipes yet.{' '}
            <Link to="/add">Create one now.</Link>
            <Emoji text=":)" />
          </p>
        );
    }
    return (
      <div>
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

const mapStateToProps = (state, props) => {
  console.log('our state', state);
  return {
    recipes: state.recipes.userRecipe,
    user: state.auth.userDetails
  };
};

export default connect(mapStateToProps, { getUserinfo, startGetUserRecipes })(Dashboard);
