var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var definePlugin = new webpack.DefinePlugin({
  __DEVELOPMENT__: JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'development')),
  __DEBUG__:       JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'debug')),
  __BUILD__:       JSON.stringify(JSON.parse(process.env.WEBPACK_ENV === 'build')),
  __VERSION__:     (new Date().getTime().toString())
});



var siteConfig = {
  entry: {
    main: [
      './source/assets/styles/main.scss',
      './source/assets/scripts/main.js'
    ],
  },

  output: {
    filename: 'assets/scripts/[name].bundle.js',
    path: path.resolve(__dirname, '.tmp', 'dist')
  },

  module: {
    loaders: [
      // Load JS
      {
        test: /source\/assets\/scripts\/.*\.js$/,
        exclude: /node_modules|\.tmp|vendor/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0']
        },
      },

      { test: require.resolve('jquery'), loader: 'expose?$' },

      // Load SCSS
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          loader: [{
            loader: "css-loader"
          }, {
            loader: "sass-loader",
            options: {
              includePaths: [
                require('path').dirname(require.resolve('normalize-scss')),
                path.resolve(__dirname, 'node_modules')
              ]
            }
          }],
          // use style-loader in development
          fallbackLoader: "style-loader"
        })
      },

      { test: /\.css$/, loaders: ['style', 'css'] },

      // Embed small pngs as data uri
      // url-loader falls back to file-loader when image is too big
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'url-loader?limit=100000&name=../images/[name].[ext]'
      },
    ],
  },

  node: {
    console: true
  },

  plugins: [
    definePlugin,
    new ExtractTextPlugin('assets/styles/main.bundle.css'),
    new webpack.optimize.CommonsChunkPlugin({
        names: ['main']
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    }),
  ],
};

module.exports = siteConfig;
