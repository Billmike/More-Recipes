import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipesForm from './RecipesForm';
import Footer from './Footer';
import { AddRecipeAction } from '../actions/recipes';

/**
 * Component that renders the Add recipe form
 *
 * @class AddRecipe
 *
 * @extends Component
 */
export class AddRecipe extends Component {
  /**
   * @param { object } recipe - The recipe object to be added
   *
   * @memberof AddRecipe
   *
   * @returns { void } void
   */
  onSubmit = (recipe) => {
    this.props.AddRecipeAction(recipe).then(() => {
      this.props.history.push('/dashboard');
    });
  };

  /**
   * @memberof AddRecipe
   *
   * @returns { jsx } JSX
   *
  */
  render() {
    if (this.props.isLoading) {
      return (<div className="ring">
        <p className="loader-text">Loading</p>
        <span className="loader-span"></span>
      </div>);
    }
    return (
      <div id="AddRecipeDiv">
        <h1 className="container add-h1"> Add Recipe </h1>
        <RecipesForm onSubmit={this.onSubmit} />
        <Footer />
      </div>
    );
  }
}

export default connect(undefined, { AddRecipeAction })(AddRecipe);
