import nodemailer from 'nodemailer';
import db from '../models/index';

const reviews = db.Review;
const recipes = db.Recipe;
const Users = db.User;

/**
  * @class { Object } Review
  *
  *
  */

class Review {
/**
  * @returns { Object } addRecipe
  *@param { String } req takes in the request
  *@param { String } res takes in the response
  */

  static addReviews(req, res) {
    return recipes
      .findById(req.params.recipeId)
      .then((recipe) => {
        if (!recipe) {
          return res.status(404).send({ status: 'Not found.', message: 'The recipe you are looking for does not exist.' });
        }
        Users.findById(recipe.owner)
          .then(user => reviews.create({
            content: req.body.content,
            recipeId: req.params.recipeId,
            userId: req.userId,
          })
            .then((review) => {
              const smtpTransport = nodemailer.createTransport({
                service: 'Gmail',
                host: 'smtp.gmail.com',
                port: 587,
                secure: false,
                requireTLS: true,
                auth: {
                  user: 'testingemailapi92@gmail.com',
                  pass: '_testingemail!@#',
                },
              });
              const mailOptions = {
                from: 'testingemailapi92@gmail.com',
                to: user.email,
                subject: 'Your recipe has been reviewed.',
              };
              console.log(mailOptions);
              smtpTransport.sendMail(mailOptions, (err, response) => {
                if (err) {
                  console.log(err);
                  res.status(400).send({ message: err.message });
                } else {
                  console.log(`Sent message ${response.message}`);
                  res.status(201).send({ status: 'sent', message: response.message });
                }
              });
              res.status(201).send({ status: 'sent', feed: review });
            }))
          .catch(error => res.status(400).send({ message: error.message }));
      })
      .catch(error => res.status(500).send({ status: 'Something went wrong.', message: error.message }));
  }
}

export default Review;
