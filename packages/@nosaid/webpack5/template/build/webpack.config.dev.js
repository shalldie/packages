const path = require('path');
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');

module.exports = merge(webpackBaseConfig, {
    mode: 'development',

    devtool: 'inline-source-map',

    devServer: {
        // contentBase: path.join(__dirname, '../dist'),
        hot: true,
        open: true,
        host: process.env.HOST || '0.0.0.0',
        port: process.env.PORT || 8080
    }
});
