var webpack = require('webpack');
var config = require('../webpack.config.js')
//压缩
config.plugins = [
  new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
  })
];
module.exports = config;