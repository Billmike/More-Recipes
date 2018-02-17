const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        }),
      }],
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
    ],
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    node: {
      dns: 'empty',
      net: 'empty',
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'client/public'),
      historyApiFallback: true,
    },
  };
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

