import React from 'react';
import classNames from 'classnames';
import Loader from './Loader';

const ReviewForm = (props) => {
  if (props.isLoading) {
    return <Loader />;
  }
  return (
    <form
      className="form-group container form-container"
      onSubmit={props.reviewRecipe}
      id="form"
    >
      <div>
        <textarea
          id="reviewFormId"
          className={classNames('form-control review-form', {
            'has-errors': props.errors.name
          })}
          value={props.reviewText}
          onChange={props.onChange}
          placeholder="Enter a review for this recipe"
        />
        {props.errors.name && (
          <span className="help-block has-errors">{props.errors.name}</span>
        )}
      </div>
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
