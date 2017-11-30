import React from 'react';
import { connect } from 'react-redux';
import RecipesForm from './RecipesForm';
import { editRecipe } from '../actions/recipes';

const EditRecipe = (props) => {
    // console.log(props);
	return (
		<div>
  <RecipesForm
    recipe={props.recipe}
    onSubmit={(recipe) => {
    props.dispatch(editRecipe(props.recipe.id, recipe));
    props.history.push('/');
                }}
            />
		</div>
		)
}

const mapStateToProps = (state, props) => {
    return {
        recipe: state.recipes.find((recipe) => {
            return recipe.id === props.match.params.id;
        }),
    }
}

export default connect(mapStateToProps)(EditRecipe);
