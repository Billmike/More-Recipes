import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipesForm from './RecipesForm';
import { startEditRecipe } from '../actions/recipes';

export class EditRecipe extends Component {
    onSubmit = (recipe) => {
        console.log('||||||||||||EditRecipe', this.props);
        this.props.startEditRecipe(this.props.recipe.id, recipe);
        this.props.history.push('/dashboard');
    };

    componentWillMount() {
        console.log('-------------', this.props.recipe);
    }

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
    console.log('props here', props);
    console.log('state here', state)
    return {
        recipe: state.recipes.userRecipe.find((recipe) => {
            return recipe.id == props.match.params.id;
        }),
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        startEditRecipe: (id, recipe) => dispatch(startEditRecipe(id, recipe))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRecipe);
