import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import http from 'http';

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('json spaces', 4);
const port = parseInt(process.env.PORT, 10) || 5000;
app.set('port', port);

require('./routes')(app);

app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to the beginning of aawesomeness',
}));

const server = http.createServer(app);
server.listen(port);

module.exports = app;
