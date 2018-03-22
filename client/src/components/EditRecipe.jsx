import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipesForm from './RecipesForm';
import { editRecipeAction } from '../actions/recipes';

/**
 * Component that renders the Edit recipe page
 *
 * @class EditRecipe
 *
 * @extends Component
 */

export class EditRecipe extends Component {
  onSubmit = (recipe) => {
    this.props.editRecipeAction(this.props.recipe.id, recipe).then(() => {
      this.props.history.push('/dashboard');
    });
  };

  render() {
    return (
      <div id="editRecipeID">
        <h1 className="container add-h1"> Edit Recipe </h1>
        <RecipesForm recipe={this.props.recipe} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

export const mapStateToProps = (state, props) => {
  return {
    recipe: state.recipes.userRecipe.find((recipe) => {
      return recipe.id == props.match.params.id;
    })
  };
};

export default connect(mapStateToProps, { editRecipeAction })(EditRecipe);
