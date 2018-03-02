import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import Footer from './Footer';
import ReviewForm from './ReviewForm';
import Review from './Review';
import { getUserinfo } from '../actions/signinRequest';
import {
  startGetOneRecipe,
  startUpvoteRecipe,
  startDownVoteRecipe,
  startAddReview,
  startAddFavoriteRecipes
} from '../actions/recipes';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: '',
      reviews: [],
      recipe: {},
      upVotes: 0
    };
    this.upVoteRecipe = this.upVoteRecipe.bind(this);
    this.downVoteRecipe = this.downVoteRecipe.bind(this);
    this.onReviewFormChange = this.onReviewFormChange.bind(this);
    this.reviewRecipe = this.reviewRecipe.bind(this);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  }

  componentDidMount() {
    this.props.startGetOneRecipe(this.props.match.params.id);
    this.props.getUserinfo();
  }

  onReviewFormChange(event) {
    event.preventDefault();
    this.setState({
      reviewText: event.target.value
    });
  }

  favoriteRecipes(event) {
    event.preventDefault();
    this.props.startAddFavoriteRecipes(this.props.match.params.id);
  }

  reviewRecipe(event) {
    event.preventDefault();
    this.props.startAddReview(this.props.match.params.id, {
      content: this.state.reviewText
    });
    document.getElementById('form').reset();
  }

  upVoteRecipe(event) {
    event.preventDefault();
    this.props.startUpvoteRecipe(this.props.match.params.id);
  }

  downVoteRecipe(event) {
    event.preventDefault();
    this.props.startDownVoteRecipe(this.props.match.params.id);
  }

  render() {
    let reviews;
    let splitIngredients;
    let splitInstructions;
    if (this.props.recipe) {
      splitIngredients = this.props.recipe.ingredients
        .split('\n')
        .map((ingredient, index) => {
          return (
              <li className="indie-key" key={index}>
                {ingredient}
              </li>
          );
        });

      splitInstructions = this.props.recipe.instructions
        .split('\n')
        .map((instruction, index) => {
          return (
              <li className="indie-key" key={index}>
                {instruction}
              </li>
          );
        });

      reviews =
        this.props.recipe.reviews.length > 0 ? (
          this.props.recipe.reviews.map((review) => {
            return (
              <div className="review-div">
                <Review
                  key={review.id}
                  review={review}
                  user={this.props.user.username}
                />
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
      <div>
        <div>
        <h4 className="recipe-detail-name">
          {this.props.recipe.name}
          </h4>
          <div className="recipe-detail-category">
            Category: {this.props.recipe.category}
          </div>
          <div className="container image-name">
            <div className="img-fluid center-image">
              <img src={this.props.recipe.imageUrl} className="rounded recipe-detail-image" />
            </div>
            <div className="recipe-detials-btn">
                <Link
                  to="/"
                  className="btn details-action-button thumbs-up brown-thumb"
                  onClick={this.upVoteRecipe}
                >
                  {this.props.recipe.upVote}{' '}
                  <i className="fa fa-thumbs-up fa" aria-hidden="true" />
                </Link>
                <Link
                  to="/"
                  className="btn details-action-button thumbs-down"
                  onClick={this.downVoteRecipe}
                >
                  {' '}
                  {this.props.recipe.downVote}{' '}
                  <i className="fa fa-thumbs-down fa" aria-hidden="true" />
                </Link>
                <Link
                  to="/"
                  onClick={this.favoriteRecipes}
                  className="btn details-action-button heart-button"
                >
                  <i className="fa fa-heart my-heart" aria-hidden="true" />
                </Link>
              </div>
            <div className="">
              <div>
                <h4 className="recipe-detail-description"> Description </h4>
                <p className="recipe-description-paragraph">{this.props.recipe.description}</p>
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
          {this.props.auth ? <div>
              <ReviewForm
                onChange={this.onReviewFormChange}
                reviewText={this.state.reviewText}
                reviewRecipe={this.reviewRecipe}
              />
            </div> : <p className="auth-review"> You have to be Logged in to post a review </p>}
          </div>
          <br />
          <div>
            <h6 className="text-center form-h6">
              Reviews
            </h6>
          </div>
          <div className="review-back">{reviews}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth.isAuthenticated,
    recipe: state.recipes.singleRecipe,
    upVote: state.recipes.singleRecipe.upVote,
    user: state.auth.userDetails
  };
};

export default connect(mapStateToProps, {
  getUserinfo,
  startGetOneRecipe,
  startUpvoteRecipe,
  startDownVoteRecipe,
  startAddReview,
  startAddFavoriteRecipes
})(RecipeDetail);
