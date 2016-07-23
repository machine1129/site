var webpack = require('webpack');
var config = require('./webpack.base.config.js')
//测试代码压缩后会报错 暂时注释
config.plugins = (config.plugins || [] ).concat([
	// new webpack.optimize.UglifyJsPlugin({
	// 	compress: {
	// 	    warnings: false
	// 	}
	// })
]);
module.exports = config;