import React, { Component } from 'react';
import { connect } from 'react-redux';
import Reviews from './Reviews';
import { startGetOneRecipe } from '../actions/recipes';
import pizza from '../assets/img/pancakes.jpeg';

class RecipeDetail extends Component {
  componentDidMount() {
    console.log(this.props);
    this.props.startGetOneRecipe(this.props.match.params.id);
  }
  render() {
    console.log('Ingredients type', typeof this.props.recipe.ingredients)
    let splitIngredients;
    let splitInstructions;
    if (this.props.recipe) {
      splitIngredients = this.props.recipe.ingredients.split('\n').map((splitIng, index) => {
        return (
          <ul>
            <li key={index}>{splitIng}</li>
          </ul>
        );
      });
      
      splitInstructions = this.props.recipe.instructions.split('\n').map((splitInstrut, index) => {
        return (
          <ul>
            <li key={index}>{splitInstrut}</li>
          </ul>
        )
      })
    };
    return (
      <div>
        This is the details of Recipe with name of { this.props.recipe.name }
        <div className="row container">
          <div className="col-md-6">
            <img src={pizza}/>
          </div>
          <div className="col-md-6">
            <div>
              <h4 className="detail-title"> Recipe Title </h4>
              <p>{ this.props.recipe.name }</p>
            </div>
            <div>
              <h4 className="detail-title"> Description </h4>
              <p>{ this.props.recipe.description }</p>
            </div>
            <div>
              <h4 className="detail-title"> Category </h4>
              <p>{ this.props.recipe.category }</p>
            </div>
          </div>
        </div>
        <div className="row container">
          <div className="col-md-6">
              <h4 className="detail-title"> Ingredients </h4>
              { splitIngredients }
          </div>
          <div className="col-md-6">
            <h4 className="detail-title"> Instructions </h4>
            { splitInstructions }
          </div>
        </div>
        <Reviews />
      </div>
    );
  }
};

const mapStateToProps = (state, props) => {
  console.log('Recipe details props', props);
  console.log('Recipe details state', state);
  return {
    recipe: state.recipes.singleRecipe
  }
}

export default connect(mapStateToProps, { startGetOneRecipe })(RecipeDetail);
