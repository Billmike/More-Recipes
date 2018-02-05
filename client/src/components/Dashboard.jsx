import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import RecipeEdit from './RecipeEdit';
import { startGetUserRecipes } from '../actions/recipes';

class Dashboard extends Component {
  componentWillMount() {
    console.log('Dashboard props^^^^^^^^', this.props);
    this.props.startGetUserRecipes();
  };

  componentDidUpdate() {
    this.props.startGetUserRecipes();
  }

  render() {
    return (
      <div className="container">
      <h2 className="dashboard-h2"> Welcome to your Dashboard, { this.props.user.username }!</h2>
      <h4 className="dashboard-h4"> My Recipes </h4>
      <div className="row">
        {this.props.recipes !== undefined ? this.props.recipes.map((recipe) => {
            console.log(recipe)
            return (
                <RecipeEdit key={recipe.id} {...recipe} />
              );
          }) :
          <div>
          <p className="no-recipes-p">{ this.props.user.username }, you do not have any recipes yet. <Link to="/add">Create one now.</Link><Emoji text=":)" /></p>
          </div>
          }
      </div>
      </div>
    );
  }
};

const mapStateToProps = state => {
  console.log('Dashboard state<<<<<<<', state);
  return {
    recipes: state.recipes.userRecipe,
    user: state.auth.user
  }
}


export default connect(mapStateToProps, { startGetUserRecipes })(Dashboard);
