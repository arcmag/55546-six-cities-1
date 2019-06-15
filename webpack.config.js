/* eslint-disable */

const path = require(`path`);
const webpack = require(`webpack`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    historyApiFallback: true,
    hot: true,

    contentBase: path.join(__dirname, `./public`),
    compress: false,
    port: 1337,
  },
  devtool: `source-map`,
  resolve: {
    extensions: [`.js`, `.jsx`, `.ts`, `.tsx`, `json`]
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.(tsx|ts)?$/,
        loader: `ts-loader`
      }
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      'React': 'react',
      'ReactDOM': 'react-dom',
      'propTypes': 'prop-types'
    })
  ]
};
