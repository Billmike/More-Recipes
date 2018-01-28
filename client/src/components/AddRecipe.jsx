import React, { Component } from 'react';
import RecipesForm from './RecipesForm';
import { connect } from 'react-redux';
import { addRecipe } from '../actions/recipes';

export class AddRecipe extends Component {
  onSubmit = (recipe) => {
    this.props.addRecipe(recipe);
    this.props.history.push('/dashboard');
  };

  render() {
    return (
      <div>
        <h1 className="container"> Add Recipe </h1>
        <RecipesForm
          onSubmit={this.onSubmit}
        />
      </div>
      );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addRecipe: (recipe) => dispatch(addRecipe(recipe))
  }
}

// const AddRecipe = (props) => {
//     console.log(props)
// 	return (
// 	   <div>
//        <h1 className="container">Add Recipe</h1>
//         <RecipesForm onSubmit={(recipe) => {
//             props.dispatch(addRecipe(recipe));
//             props.history.push('/')
//         }} />
//        </div>	
// 	)
// }

export default connect(undefined, mapDispatchToProps)(AddRecipe);
