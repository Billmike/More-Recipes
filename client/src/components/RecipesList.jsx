import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import pizza from '../assets/img/pizzza.jpg';
import { AddFavoriteRecipesAction } from '../actions/recipes';

export class RecipeList extends Component {
  constructor(props) {
    super(props);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  }

  favoriteRecipes(event) {
    event.preventDefault();
    this.props.AddFavoriteRecipesAction(this.props.recipe.id);
  }

  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <Link to={`/recipe/${this.props.recipe.id}`}>
            <img
              className="card-img-top"
              alt="Pizza"
              src={this.props.recipe.imageUrl}
            />
          </Link>
          <div className="card-body">
            <Link
              to={`/recipe/${this.props.recipe.id}`}
            >
              <h4 className="card-title">{this.props.recipe.name}</h4>
            </Link>
            <p className="card-text">{this.props.recipe.description}</p>
            <div className="group-btn">
              <Link
                id="viewButton"
                to={`/recipe/${this.props.recipe.id}`}
                className="btn border border-secondary rounded"
              >
                {this.props.recipe.views}
                <i className="fa fa-eye" aria-hidden="true" />
              </Link>
              <Link
                to={`/recipe/${this.props.recipe.id}`}
                className="btn border border-secondary rounded"
                onClick={this.favoriteRecipes}
                id="favbutton"
              >
                {' '}
                {this.props.recipe.favorites.length}
                <i className="fa fa-heart" aria-hidden="true" />
              </Link>
              <Link
                to={`/recipe/${this.props.recipe.id}`}
                className="btn border border-secondary rounded"
              >
                {' '}
                {this.props.recipe.reviews.length}{' '}
                <i className="fa fa-comments" aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className="card-footer pad-footer">
            <small className="text-muted small-text category-text">
              Recipe Category - {this.props.recipe.category}
            </small>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { AddFavoriteRecipesAction })(RecipeList);
