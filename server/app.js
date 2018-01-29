import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';


require('dotenv').config();

const app = express();
const appPath = path.join(__dirname, '..', 'dist/public');
console.log(appPath);

const swaggerDOCS = require('./api-doc/converted.json');


app.use(logger('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(appPath));
app.use(express.static('public'));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-access-token');

  next();
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDOCS));


app.set('json spaces', 4);

require('./routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(appPath, '/index.html'));
});

app.get('*', (req, res) => {
  res.status(404).send('The route you are trying to access does not exist');
});

module.exports = app;
