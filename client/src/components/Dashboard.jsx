import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeEdit from './RecipeEdit';
import { startGetUserRecipes } from '../actions/recipes';

class Dashboard extends Component {
  componentWillMount() {
    this.props.startGetUserRecipes();
  };

  render() {
    return (
      <div className="container-fluid">
      <h2> Welcom to your Dashboard</h2>
      <h4 style={{ textAlign: 'center' }}> My Recipes </h4>
        {this.props.recipes === undefined ? <p> You do not have any recipes yet. Create one now.</p> : this.props.recipes.map((recipe) => {
            console.log(recipe)
            return (
              <div className="container">
                <RecipeEdit key={recipe.id} {...recipe} />
              </div>
              );
          }) }
      </div>
    );
  }
};

const mapStateToProps = state => {
  console.log('Dashboard state<<<<<<<', state);
  return {
    recipes: state.recipes.userRecipe
  }
}


export default connect(mapStateToProps, { startGetUserRecipes })(Dashboard);
