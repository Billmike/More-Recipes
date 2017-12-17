const path = require('path');

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.join(__dirname, 'client/public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      loaders: ['babel-loader?presets[]=react,presets[]=env,presets[]=stage-0'],
      test: /\.jsx?$/,
      exclude: /node_modules/,
    }, {
      test: /\.(png|jpg|jpeg|gif)$/,
      use: [
        {
          loader: 'file-loader',
          options: {},
        },
      ],
    }, {
      test: /\.s?css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'client/public'),
    historyApiFallback: true,
  },
};

// module.exports = (env) => {
//   const isProduction = env === 'production';
//   return {
//     entry: './client/src/index.js',
//     output: {
//       path: path.join(__dirname, 'server/build'),
//       filename: 'bundle.js',
//     },
//     module: {
//       rules: [{
//         loader: 'babel-loader',
//         test: /\.js$/,
//         exclude: /node_modules/,
//       },
//       {
//         test: /\.s?css$/,
//         use: [
//           'style-loader',
//           'css-loader',
//           'sass-loader',
//         ],
//       },
//       ],
//     },
//     devtool: isProduction ? 'source-map' : 'inline-source-map',
//     devServer: {
//       contentBase: path.join(__dirname, 'build'),
//       historyApiFallback: true,
//     },
//   };
// };

