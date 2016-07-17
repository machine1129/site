var path = require('path');
module.exports = {
    module: {
        // 加载器
        loaders: [
            { test: /\.vue$/, loader: 'vue' },
            { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'style!css!autoprefixer'},
            { test: /\.(png|jpg|gif|svg|eot|ttf|woff)$/, loader: 'url-loader'},
            { test: /\.(html|tpl)$/, loader: 'html-loader' },
            // { test: /\.(svg|eot|ttf|woff)$/, loader: 'file-loader?name=./[path][name].[ext]?v=[md5:hash:base64:7]' },
        ]
    },
    vue: {
        loaders: {
            css: 'style!css!autoprefixer'
        }
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        // require时省略的扩展名，如：require('module') 不需要module.js
        extensions: ['', '.js', '.vue'],
        // 别名
        alias: {
            filter: path.join(__dirname, './src/filters'),
            component: path.join(__dirname, './component'),
            service:path.join(__dirname, './service'),
            api:path.join(__dirname, './api'),
            images:path.join(__dirname, './images'),
            views:path.join(__dirname, './views'),
            modules:path.join(__dirname, './modules'),
        }
    },
    // 开启source-map，webpack有多种source-map，在官网文档可以查到
    // devtool: '#source-map'
};
