import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipesForm from './RecipesForm';
import { editRecipe } from '../actions/recipes';

export class EditRecipe extends Component {
    onSubmit = (recipe) => {
        this.props.editRecipe(this.props.recipe.id, recipe);
        this.props.history.push('/dashboard');
    };

    render() {
        return (
            <div>
  <RecipesForm
    recipe={this.props.recipe}
    onSubmit={this.onSubmit}
            />
        </div>
            )
    }
}

const mapStateToProps = (state, props) => {
    return {
        recipe: state.recipes.find((recipe) => {
            return recipe.id === props.match.params.id;
        }),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        editRecipe: (id, recipe) => dispatch(editRecipe(id, recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
