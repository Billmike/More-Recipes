import React from 'react';

const ReviewForm = props => {
  return (
    <form className="form-group" onSubmit={props.reviewRecipe} id="form" >
      <textarea className="form-control" value={props.reviewText} onChange={props.onChange} placeholder="Enter a review for this recipe" />
      <button className="btn btn-primary" >Submit review </button>
    </form>
  )
}

export default ReviewForm;
