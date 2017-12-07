const path = require('path');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
  entry: './client/src/index.js',
  output: {
    path: path.join(__dirname, 'server/build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
    },
    {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
    },
  ],
  },
  devtool: isProduction ? 'source-map' : 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'build'),
    historyApiFallback: true,
  },
};
};

