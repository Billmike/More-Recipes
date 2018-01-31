import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeEdit from './RecipeEdit';
import { startGetUserRecipes } from '../actions/recipes';

class Dashboard extends Component {
  componentWillMount() {
    console.log('Dashboard props^^^^^^^^', this.props);
    this.props.startGetUserRecipes();
  };

  render() {
    return (
      <div className="container-fluid">
      <h2 className="dashboard-h2"> Welcome to your Dashboard</h2>
      <h4 className="dashboard-h4"> My Recipes </h4>
        {this.props.recipes !== undefined ? this.props.recipes.map((recipe) => {
            console.log(recipe)
            return (
              <div className="container">
                <RecipeEdit key={recipe.id} {...recipe} />
              </div>
              );
          }) : <p> You do not have any recipes yet. Create one now.</p>}
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
