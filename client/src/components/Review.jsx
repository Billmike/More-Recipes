import React from 'react';
import moment from 'moment';

const Review = (props) => {
  return (
    <div className="row custom-div">
      <div className="col-md-1">
        <img className="review-image" />
      </div>
      <div className="col-md-11 review-box">
        <p className="reviewer-name inline-p">{props.user}</p>
        <span
          className="review-time">
          {moment(props.review.createdAt, 'YYYY-MM-DD HH:mm Z').fromNow()}
        </span>
        <hr />
        <p className="review-content">{props.review.content}</p>
      </div>
    </div>
  );
};

export default Review;
