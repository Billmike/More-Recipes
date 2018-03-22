import React, { Component } from 'react';
import MDSpinner from 'react-md-spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import { v4 } from 'uuid';
import Footer from './Footer';
import Loader from './Loader';
import ReviewForm from './ReviewForm';
import Review from './Review';
import validateReview from '../utils/validateReview';
import {
  getOneRecipeAction,
  upvoteRecipeAction,
  downVoteRecipeAction,
  addReviewAction,
  addFavoriteRecipesAction
} from '../actions/recipes';

export class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: '',
      reviews: [],
      recipe: {},
      upVotes: 0,
      errors: {}
    };
    this.upVoteRecipe = this.upVoteRecipe.bind(this);
    this.downVoteRecipe = this.downVoteRecipe.bind(this);
    this.onReviewFormChange = this.onReviewFormChange.bind(this);
    this.reviewRecipe = this.reviewRecipe.bind(this);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  }

  componentDidMount() {
    this.props.getOneRecipeAction(this.props.match.params.id);
  }

  onReviewFormChange(event) {
    event.preventDefault();
    this.setState({
      reviewText: event.target.value
    });
  }

  favoriteRecipes(event) {
    event.preventDefault();
    this.props.addFavoriteRecipesAction(this.props.match.params.id);
  }

  reviewRecipe(event) {
    event.preventDefault();
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.addReviewAction(this.props.match.params.id, {
        content: this.state.reviewText
      });
      document.getElementById('form').reset();
    }
  }

  isValid() {
    const { errors, valid } = validateReview(this.state.reviewText);
    if (!valid) {
      this.setState({ errors });
    }
    return valid;
  }

  upVoteRecipe(event) {
    event.preventDefault();
    this.props.upvoteRecipeAction(this.props.match.params.id);
  }

  downVoteRecipe(event) {
    event.preventDefault();
    this.props.downVoteRecipeAction(this.props.match.params.id);
  }

  render() {
    let reviews;
    let splitIngredients;
    let splitInstructions;
    if (!this.props.singleRecipe.singleRecipe) {
      return <Loader />;
    }
    const { errors } = this.state;
    if (this.props.recipe) {
      splitIngredients = this.props.recipe.ingredients
        .trim('\n')
        .split('\n')
        .map((ingredient) => {
          return (
            <li className="split-items" key={v4()}>
              {ingredient}
            </li>
          );
        });

      splitInstructions = this.props.recipe.instructions
        .trim('\n')
        .split('\n')
        .map((instruction) => {
          return (
            <li className="split-items" key={v4()}>
              {instruction}
            </li>
          );
        });

      reviews =
        this.props.recipe.reviews.length > 0 ? (
          this.props.recipe.reviews.map((review) => {
            return (
              <div className="review-div">
                <Review key={review.id} review={review} user={review.user} />
              </div>
            );
          })
        ) : (
          <p className="center-emoji">
            {' '}
            No reviews for this recipe yet. Want to be the first to review this?<Emoji text="B-)" />
          </p>
        );
    }
    return (
      <div id="recipe-detail-ID">
        <div>
          <h4 className="recipe-detail-name">{this.props.recipe.name}</h4>
          <div className="recipe-detail-category">
            Category: {this.props.recipe.category}
          </div>
          <div className="container image-name">
            <div className="img-fluid center-image">
              <img
                src={this.props.recipe.imageUrl}
                className="rounded recipe-detail-image"
              />
            </div>
            <div className="recipe-detials-btn">
              <Link
                to="/"
                id="upvoteid"
                className="btn details-action-button thumbs-up brown-thumb"
                onClick={this.upVoteRecipe}
              >
                {this.props.recipe.upVote}{' '}
                <i className="fa fa-thumbs-up fa" aria-hidden="true" />
              </Link>
              <Link
                to="/"
                id="downvoteid"
                className="btn details-action-button thumbs-down"
                onClick={this.downVoteRecipe}
              >
                {' '}
                {this.props.recipe.downVote}{' '}
                <i className="fa fa-thumbs-down fa" aria-hidden="true" />
              </Link>
              <Link
                to="/"
                id="favoriteid"
                onClick={this.favoriteRecipes}
                className="btn details-action-button heart-button"
              >
                <i className="fa fa-heart my-heart" aria-hidden="true" />
              </Link>
            </div>
            <div className="">
              <div>
                <h4 className="recipe-detail-description">Description</h4>
                <p className="recipe-description-paragraph">
                  {this.props.recipe.description}
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="container">
              <div className="ingredients-div">
                <h4 className="detail-title"> Ingredients </h4>
                <hr />
                {splitIngredients}
              </div>
              <div className="ingredients-div">
                <h4 className="detail-title"> Instructions </h4>
                <hr />
                {splitInstructions}
              </div>
            </div>
          </div>
          <div>
            {this.props.auth ? (
              <div>
                <ReviewForm
                  onChange={this.onReviewFormChange}
                  reviewText={this.state.reviewText}
                  reviewRecipe={this.reviewRecipe}
                  isLoading={this.props.isLoading}
                  errors={errors}
                />
              </div>
            ) : (
              <p className="auth-review">
                You have to be Logged in to post a review
              </p>
            )}
          </div>
          <br />
          <div>
            <h6 className="text-center form-h6">Reviews</h6>
          </div>
          <div className="review-back">{reviews}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

export const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
    singleRecipe: state.recipes,
    recipe: state.recipes.singleRecipe,
    upVote: state.recipes.singleRecipe.upVote,
    isLoading: state.recipes.isLoading
  };
};

export default connect(mapStateToProps, {
  getOneRecipeAction,
  upvoteRecipeAction,
  downVoteRecipeAction,
  addReviewAction,
  addFavoriteRecipesAction
})(RecipeDetail);
