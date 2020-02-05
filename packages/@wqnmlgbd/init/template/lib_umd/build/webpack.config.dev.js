const webpack = require('webpack');
const merge = require('webpack-merge');
const webpackConfigs = require('./webpack.config.base.js');

module.exports = webpackConfigs.map(config => merge(config, {

    mode: 'development',

    devtool: 'inline-source-map',

    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ]

}));
