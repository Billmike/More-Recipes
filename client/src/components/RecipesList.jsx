import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { startAddFavoriteRecipes } from '../actions/recipes';

export class RecipeList extends Component {
  constructor(props) {
    super(props);
    console.log('mu props', this.props);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  };

  favoriteRecipes(event) {
    event.preventDefault();
    this.props.startAddFavoriteRecipes(this.props.id);
  }

  render() {
    return (
<div className="card-group">
      <div className="card index-card">
        <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" alt="Pizza" /></Link>
        <div className="card-body">
          <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
          <p className="card-text">{this.props.description}</p>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded" onClick={this.favoriteRecipes}>  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
        </div>
        <div className="card-footer">
          <small className="text-muted">Recipe Category - {this.props.category}</small>
        </div>
      </div>
      <div className="card index-card">
        <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" alt="Pizza" /></Link>
        <div className="card-body">
          <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
          <p className="card-text">{this.props.description}</p>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
        </div>
        <div className="card-footer">
          <small className="text-muted">Recipe Category - {this.props.category}</small>
        </div>
      </div>
      <div className="card index-card">
        <Link to={`/recipe/${this.props.id}`}><img className="card-img-top" alt="Pizza" /></Link>
        <div className="card-body">
          <Link to={`/recipe/${this.props.id}`}><h4 className="card-title">{this.props.name}</h4></Link>
          <p className="card-text">{this.props.description}</p>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">  89 <i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
        </div>
        <div className="card-footer">
          <small className="text-muted">Recipe Category - {this.props.category}</small>
        </div>
      </div>
  </div>
    );
  }
};

export default connect(null, { startAddFavoriteRecipes })(RecipeList);
