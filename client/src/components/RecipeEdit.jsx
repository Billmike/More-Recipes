import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startRemoveRecipe } from '../actions/recipes';
import pizza from '../assets/img/pizzza.jpg';

class RecipeEdit extends Component {
  constructor(props) {
    super(props);
    this.onDeleteRecipe = this.onDeleteRecipe.bind(this);
  };

  onDeleteRecipe() {
    console.log('On delete recipe', this.props)
    this.props.startRemoveRecipe(this.props.id);
  }
  render() {
    return (
<div className="col-md-4">
<div className="card">
  <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" alt="Pizza" src={ pizza } /></Link>
  <div className="card-body">
    <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
    <p className="card-text">{this.props.description}</p>
    <div className="group-btn">
    <div className="container action-btn" style={{ textAlign : 'justify' }}>
    <Link to={`/edit/${this.props.id}`} className="btn border border-secondary rounded" role="button">Edit <i className="far fa-edit"></i></Link>
    <button onClick={this.onDeleteRecipe} className="btn btn-danger" role="button">Delete <i className="fas fa-trash-alt"></i></button>
    </div>
    </div>
  </div>
  <div className="card-footer pad-footer">
    <small className="text-muted small-text">Recipe Category - {this.props.category}</small>
  </div>
</div>
</div>
    );
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    startRemoveRecipe: (recipeData) => dispatch(startRemoveRecipe(recipeData))
  }
}

export default connect(null, mapDispatchToProps)(RecipeEdit);
