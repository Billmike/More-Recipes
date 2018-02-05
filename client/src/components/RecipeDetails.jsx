import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ReviewForm from './ReviewForm';
import Review from './Review';
import { startGetOneRecipe, startUpvoteRecipe, startDownVoteRecipe, startAddReview } from '../actions/recipes';
import pizza from '../assets/img/pancakes.jpeg';

class RecipeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewText: '',
      reviews: []
    }
    this.upVoteRecipe = this.upVoteRecipe.bind(this);
    this.downVoteRecipe = this.downVoteRecipe.bind(this);
    this.onReviewFormChange = this.onReviewFormChange.bind(this);
    this.reviewRecipe = this.reviewRecipe.bind(this);
  };

  componentWillMount() {
    console.log('detials props', this.props);
    this.props.startGetOneRecipe(this.props.match.params.id);
  }

  onReviewFormChange(event) {
    event.preventDefault();
    this.setState({
      reviewText: event.target.value
    });
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
    console.log('Ingredients type', typeof this.props.recipe.ingredients);
    let reviews;
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
      });

      reviews = this.props.recipe.reviews.map((review) => {
        return (
          <Review key={review.id} review={review} />
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
          <div className="col-sm">
              <h4 className="detail-title"> Ingredients </h4>
              { splitIngredients }
          </div>
          <div className="col-sm">
            <span>
            <Link to='/' className="btn border border-secondary rounded" onClick={this.upVoteRecipe}> <i className="fa fa-thumbs-up fa-3x" aria-hidden="true" /></Link>
            <Link to='/' className="btn border border-secondary rounded" onClick={this.downVoteRecipe}> <i className="fa fa-thumbs-down fa-3x" aria-hidden="true" /></Link>
            </span>
          </div>
          <div className="col-sm">
            <h4 className="detail-title"> Instructions </h4>
            { splitInstructions }
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <ReviewForm
              onChange={this.onReviewFormChange}
              reviewText={this.state.reviewText}
              reviewRecipe={this.reviewRecipe}
            />
          </div>
          <div className="col-md-6" />
              </div><br />
              <div>
                <h6 style={{ color: 'orange', margin: '5 0 10 0', fontSize: 16 }} className="text-center">Users Reviews</h6>
              </div>
              { reviews }
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

export default connect(mapStateToProps, { startGetOneRecipe, startUpvoteRecipe, startDownVoteRecipe, startAddReview })(RecipeDetail);
