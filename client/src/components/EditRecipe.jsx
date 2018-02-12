import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipesForm from './RecipesForm';
import { startEditRecipe } from '../actions/recipes';

export class EditRecipe extends Component {
  onSubmit = recipe => {
    this.props.startEditRecipe(this.props.recipe.id, recipe);
    this.props.history.push('/dashboard');
  };

  componentWillMount() {}

  render() {
    return (
      <div>
        <h1 className="container add-h1"> Add Recipe </h1>
        <RecipesForm recipe={this.props.recipe} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    recipe: state.recipes.userRecipe.find(recipe => {
      return recipe.id == props.match.params.id;
    })
  };
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startEditRecipe: (id, recipe) => dispatch(startEditRecipe(id, recipe))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
