import React, { Component } from 'react';

class Reviews extends Component {
  render() {
    return (
      <div>
      <form className="form-group container">
        <h4> Post a review </h4>
        <textarea
          placeholder="Enter a review for this recipe"
          className="form-control review-text"
        />
        <button className="btn btn-primary">
          Submit Review
        </button>
        </form>
      </div>
    );
  }
};

export default Reviews;
