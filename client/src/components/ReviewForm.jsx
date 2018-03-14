import React from 'react';
import Loader from './Loader';

const ReviewForm = (props) => {
  if (props.isLoading) {
    return (<Loader />);
  }
  return (
    <form
      className="form-group container form-container"
      onSubmit={props.reviewRecipe}
      id="form"
    >
      <textarea
        id="reviewFormId"
        className="form-control review-form"
        value={props.reviewText} onChange={props.onChange}
        placeholder="Enter a review for this recipe"
      />
      <button
        id="submit-review"
        className="btn btn-primary btn-lg btn-block form-button"
      >
        Submit review
      </button>
    </form>
  );
};

export default ReviewForm;
