import React from 'react';

const Review = props => {
  return (
    <div className="row">
      <div className="">
        <div className="col-md-1">
          <img className="review-box" />
        </div>
        <div className="col-md-11">
          <p>{props.review.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Review;
