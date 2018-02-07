import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import pizza from '../assets/img/pizzza.jpg';
import { startGetUserFavorites, startAddFavoriteRecipes } from '../actions/recipes';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  }
  componentDidMount() {
    this.props.startGetUserFavorites(this.props.user.id)
  }

  componentDidUpdate() {
    this.props.startGetUserFavorites(this.props.user.id);
  }

  favoriteRecipes(event) {
    event.preventDefault();
    console.log('Props called here', this.props);
    this.props.startAddFavoriteRecipes(this.props.recipes[0].id);
  }

  render() {
    let favRecipes;
    if (this.props.recipes) {
      favRecipes = this.props.recipes.map((recipe, index) => {
        return (
          <div className="col-md-4">
            <div className="card">
              <Link to={`/recipe/${recipe.id}`}><img className="card-img-top" alt="Pizza" src={ pizza } /></Link>
              <div className="card-body">
                <Link to={`/recipe/${recipe.id}`}><h4 className="card-title">{recipe.name}</h4></Link>
                <p className="card-text">{recipe.description}</p>
                <div className="container action-btn" style={{ textAlign : 'justify' }}>
              <button onClick={this.favoriteRecipes} className="btn btn-danger" role="button">Remove from favs <i className="fa fa-heart"></i></button>
              </div>
              </div>
              <div className="card-footer pad-footer">
                <small className="text-muted small-text">Recipe Category - {recipe.category}</small>
              </div>
            </div>
          </div>
        )
      });
    }
    return (
      <div className="container">
      <h2 className="dashboard-h2"> Welcome to your Dashboard, { this.props.user.username }!</h2>
        <h4 className="dashboard-h4"> My favorites </h4>
        <div className="row">
        { this.props.recipes !== null ? favRecipes : <p className="no-recipes-p"> You currently have no <Emoji text="<3" />. Checkout some recipes <Link to='/'>here.</Link></p> }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  console.log('Favorites state', state);
  console.log('Favortites props', props);
  return {
    user: state.auth.user,
    recipes: state.recipes.favoriteRecipes
  }
}

export default connect(mapStateToProps, { startGetUserFavorites, startAddFavoriteRecipes })(Favorites);
