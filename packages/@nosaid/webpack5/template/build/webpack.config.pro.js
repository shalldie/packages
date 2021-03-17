const {merge} = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base.js');

module.exports = merge(webpackBaseConfig, {
    mode: 'production'
});
