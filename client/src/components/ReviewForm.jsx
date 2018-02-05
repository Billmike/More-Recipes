import React from 'react';

const ReviewForm = props => {
  return (
    <form className="form-group container form-container" onSubmit={props.reviewRecipe} id="form" >
      <textarea className="form-control review-form" value={props.reviewText} onChange={props.onChange} placeholder="Enter a review for this recipe" />
      <button className="btn btn-primary btn-lg btn-block form-button" >Submit review </button>
    </form>
  )
}

export default ReviewForm;
