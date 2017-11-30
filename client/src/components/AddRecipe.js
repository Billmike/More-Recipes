import React from 'react';
import RecipesForm from './RecipesForm';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipes';

const AddRecipe = (props) => {
    console.log(props)
	return (
	   <div>
       <h1 className="container">Add Recipe</h1>
        <RecipesForm onSubmit={(recipe) => {
            props.dispatch(addRecipe(recipe));
            props.history.push('/')
        }} />
       </div>	
	)
}

export default connect()(AddRecipe);
