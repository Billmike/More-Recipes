import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.set('json spaces', 4);

require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of awesomeness',
}));

module.exports = app;
