import reviews from '../models/review';

class Review {
  static addReview(req, res) {
    reviews.push({
      id: req.params.recipeId,
      content: req.body.content,
    });
    res.status(201).json({ status: 'Review success.', feed: reviews });
  }
}

export default Review;
