const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // Entry point for your game's JavaScript file
  entry: './src/index.js', 

  // Output configuration for your bundled code
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'game.bundle.js',
    publicPath: '/',
  },

  // Define rules for how to handle different types of modules
  module: {
    rules: [
      {
        test: /\.js$|jsx/, // All JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Use babel-loader to transpile JS
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'] // Presets for ES6 and React JSX
          }
        },
      },
      {
        test: /\.css$/, // All CSS files
        use: ['style-loader', 'css-loader'], // Use these loaders to handle CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/, // Image assets
        type: 'asset/resource',
      },
      {
        test: /\.(mp3|wav)$/, // Sound assets
        type: 'asset/resource',
      },
    ],
  },
  // Plugins to extend Webpack's functionality
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // The HTML template for your game
      filename: 'index.html', // The output HTML file name
    }),
  ],

  // Development server configuration
  devServer: {
    magicHtml: true,
    historyApiFallback: true,
    static: './',
    static: {
      directory: path.join(__dirname, './'),
    },
    compress: true,
    port: 9000,
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },
};
