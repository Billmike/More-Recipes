import React from 'react';

const Review = (props) => {
  return (
    <div className="row custom-div">
      <div className="">
        <div className="container">
        <p className="reviewer-name">{ props.user }</p>
          <p className="review-content">{ props.review.content }</p>
        </div>
      </div>
    </div>
  )
}

export default Review;
