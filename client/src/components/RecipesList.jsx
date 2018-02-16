import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pizza from '../assets/img/pizzza.jpg';
import { startAddFavoriteRecipes } from '../actions/recipes';

export class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  };

  favoriteRecipes(event) {
    event.preventDefault();
    this.props.startAddFavoriteRecipes(this.props.id);
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
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded">45 <i className="fa fa-eye" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded" onClick={this.favoriteRecipes}> { this.props.favorites.length }<i className="fa fa-heart" aria-hidden="true" /></Link>
          <Link to={`/recipe/${this.props.id}`} className="btn border border-secondary rounded"> 6 <i className="fa fa-comments" aria-hidden="true" /></Link>
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


export default connect(null, { startAddFavoriteRecipes })(RecipeList);
