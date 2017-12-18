import path from 'path';
import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';


require('dotenv').config();

const app = express();
const appPath = path.join(__dirname, '..', 'dist/public');
console.log(appPath);


app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(appPath));
app.use(express.static('public'));

app.set('json spaces', 4);

require('./routes')(app);

app.get('*', (req, res) => {
  res.sendFile(path.join(appPath, '/index.html'));
});

app.get('*', (req, res) => {
  res.status(404).send('The route you are trying to access does not exist');
});

module.exports = app;
