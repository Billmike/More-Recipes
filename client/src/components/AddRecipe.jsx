import React, { Component } from 'react';
import RecipesForm from './RecipesForm';
import { connect } from 'react-redux';
import { startAddRecipe } from '../actions/recipes';

export class AddRecipe extends Component {
  onSubmit = (recipe) => {
    this.props.startAddRecipe(recipe);
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <h1 className="container add-h1"> Add Recipe </h1>
        <RecipesForm
          onSubmit={this.onSubmit}
        />
      </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startAddRecipe: (recipe) => dispatch(startAddRecipe(recipe))
  }
}

export default connect(undefined, mapDispatchToProps)(AddRecipe);
