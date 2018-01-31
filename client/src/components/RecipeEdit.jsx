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
<div className="card-group">
    <div className="card index-card">
      <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" src={ pizza } alt="Pizza" /></Link>
      <div className="card-body">
        <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
        <p className="card-text">{this.props.description}</p>
        <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
        <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
        <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
      </div>
      <div className="container" style={{ textAlign : 'justify' }}>
        <Link to={`/edit/${this.props.id}`} className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></Link>
        <button onClick={this.onDeleteRecipe} className="btn btn-danger" role="button">Delete <i className="fa fa-pencil-square-o"></i></button>
      </div>
      <div className="card-footer">
        <small className="text-muted">Recipe Category - {this.props.category}</small>
      </div>
    </div>
    <div className="card index-card">
      <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" src={ pizza } alt="Pizza" /></Link>
      <div className="card-body">
        <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
        <p className="card-text">{this.props.description}</p>
        <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
        <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
        <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
      </div>
      <div className="container" style={{ textAlign : 'justify' }}>
        <Link to={`/edit/${this.props.id}`} className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></Link>
        <Link to={`/edit/${this.props.id}`} className="btn btn-danger" role="button">Delete <i className="fa fa-pencil-square-o"></i></Link>
      </div>
      <div className="card-footer">
        <small className="text-muted">Recipe Category - {this.props.category}</small>
      </div>
    </div>
    <div className="card index-card">
      <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" src={ pizza } alt="Pizza" /></Link>
      <div className="card-body">
        <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
        <p className="card-text">{this.props.description}</p>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
      </div>
      <div className="container" style={{ textAlign : 'justify' }}>
        <Link to={`/edit/${this.props.id}`} className="btn btn-outline-success" role="button">Edit <i className="fa fa-pencil-square-o"></i></Link>
        <Link to={`/edit/${this.props.id}`} className="btn btn-danger" role="button">Delete <i className="fa fa-pencil-square-o"></i></Link>
      </div>
      <div className="card-footer">
        <small className="text-muted">Recipe Category - {this.props.category}</small>
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
