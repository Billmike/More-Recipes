import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Emoji from 'react-emoji-render';
import Footer from './Footer';
import ReviewForm from './ReviewForm';
import Review from './Review';
import {
  startGetOneRecipe,
  startUpvoteRecipe,
  startDownVoteRecipe,
  startAddReview,
  startAddFavoriteRecipes
} from '../actions/recipes';
import pizza from '../assets/img/pancakes.jpeg';
import hearty from '../assets/img/giphy.gif';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: '',
      reviews: []
    };
    this.upVoteRecipe = this.upVoteRecipe.bind(this);
    this.downVoteRecipe = this.downVoteRecipe.bind(this);
    this.onReviewFormChange = this.onReviewFormChange.bind(this);
    this.reviewRecipe = this.reviewRecipe.bind(this);
    this.favoriteRecipes = this.favoriteRecipes.bind(this);
  }

  componentWillMount() {
    this.props.startGetOneRecipe(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.startGetOneRecipe(this.props.match.params.id);
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
    let upvotes;
    let downvotes;
    if (this.props.recipe) {
      splitIngredients = this.props.recipe[0].ingredients
        .split('\n')
        .map((splitIng, index) => {
          return (
            <ul>
              <li className="indie-key" key={index}>
                {splitIng}
              </li>
            </ul>
          );
        });

      splitInstructions = this.props.recipe[0].instructions
        .split('\n')
        .map((splitInstrut, index) => {
          return (
            <ul>
              <li className="indie-key" key={index}>
                {splitInstrut}
              </li>
            </ul>
          );
        });

      reviews =
        this.props.recipe[0].reviews.length > 0 ? (
          this.props.recipe[0].reviews.map(review => {
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

      upvotes = this.props.recipe[0].upVote;
      downvotes = this.props.recipe[0].downVote;
    }
    return (
      <div>
        <div>
          This is the details of Recipe with name of {this.props.recipe.name}
          <div className="row container image-name">
            <div className="col-md-6">
              <img src={pizza} />
            </div>
            <div className="col-md-6">
              <div>
                <h4 className="detail-title"> Recipe Title </h4>
                <Link to="/" onClick={this.favoriteRecipes}>
                  <i className="fa fa-heart my-heart" aria-hidden="true" />
                </Link>
                <p>{this.props.recipe.name}</p>
              </div>
              <div>
                <h4 className="detail-title"> Description </h4>
                <p>{this.props.recipe.description}</p>
              </div>
              <div>
                <h4 className="detail-title"> Category </h4>
                <p>{this.props.recipe.category}</p>
              </div>
            </div>
          </div>
          <div className="row container">
            <div className="col-sm ingredients-div">
              <h4 className="detail-title"> Ingredients </h4>
              {splitIngredients}
            </div>
            <div className="col-sm ingredients-div">
              <span>
                <Link
                  to="/"
                  className="btn border border-secondary rounded brown-thumb"
                  onClick={this.upVoteRecipe}
                >
                  {upvotes}{' '}
                  <i className="fa fa-thumbs-up fa" aria-hidden="true" />
                </Link>
                <Link
                  to="/"
                  className="btn border border-secondary rounded brown-thumb"
                  onClick={this.downVoteRecipe}
                >
                  {' '}
                  {downvotes}{' '}
                  <i className="fa fa-thumbs-down fa" aria-hidden="true" />
                </Link>
              </span>
            </div>
            <div className="col-sm ingredients-div">
              <h4 className="detail-title"> Instructions </h4>
              {splitInstructions}
            </div>
          </div>
          <div>
            <div>
              <ReviewForm
                onChange={this.onReviewFormChange}
                reviewText={this.state.reviewText}
                reviewRecipe={this.reviewRecipe}
              />
            </div>
          </div>
          <br />
          <div>
            <h6 className="text-center form-h6">
              What people are saying about this recipe
            </h6>
          </div>
          <div className="review-back">{reviews}</div>
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  console.log('primary state', state);
  return {
    recipe: state.recipes.singleRecipe,
    user: state.auth.user
  };
};

export default connect(mapStateToProps, {
  startGetOneRecipe,
  startUpvoteRecipe,
  startDownVoteRecipe,
  startAddReview,
  startAddFavoriteRecipes
})(RecipeDetail);
