const path = require('path');
const Dotenv = require('dotenv-webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = (env) => {
  const isProduction = env === 'production';
  return {
    entry: ['babel-polyfill', './client/src/index.jsx'],
    output: {
      path: path.join(__dirname, 'client/public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          loaders: [
            'babel-loader?presets[]=react,presets[]=env,presets[]=stage-0'
          ],
          test: /\.jsx?$/,
          exclude: /node_modules/
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: [
            {
              loader: 'file-loader',
              options: {}
            }
          ]
        },
        {
          test: /\.s?css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  sourceMap: true
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: true
                }
              }
            ]
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin('style.css'),
      new Dotenv({
        systemvars: true
      })
    ],
    resolve: {
      extensions: ['.js', '.jsx']
    },
    node: {
      dns: 'empty',
      net: 'empty'
    },
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
      contentBase: path.join(__dirname, 'client/public'),
      historyApiFallback: true
    }
  };
};
