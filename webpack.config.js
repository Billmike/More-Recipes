const path = require('path');

module.exports = {
  entry: './client/app.jsx',
  output: {
    path: path.join(__dirname, 'client'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.jsx$/,
      exclude: /node_modules/,
    }],
  },
};
