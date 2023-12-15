const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

module.exports = {
  context: path.resolve(__dirname, 'source'),
  mode: 'development',
  entry: {
    main: './js/main.js',
    vendor: './js/vendor.js',
    about: './js/about.js',
    archive: './js/archive.js',
    gifts: './js/gifts.js',
    menufood: './js/menu-food.js',
    reviews: './js/reviews.js',
    server: './js/server.js',
    serverartistsolo: './js/server-artist_solo.js',
    serverbeverages: './js/server-beverages.js',
    servercontact: './js/server-contacts.js',
    servermain: './js/server-main.js',
    schema: './js/schema.js',
    serverpartners: './js/server-partners.js',
    serverphotos: './js/server-photos.js',
    serverartist: './js/server_artist.js',
    servershow: './js/server_show.js',
    tickets: './js/tickets.js',
    template: './js/template.js',
  },
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'build/js'),
  },
  optimization: {
    minimize: !isDev,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      }
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DuplicatePackageCheckerPlugin(),
    new CircularDependencyPlugin()
  ],
};
