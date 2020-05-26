const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../env', `${process.env.ENV_CONFIG}.env`)
});

const webpackConfigs = require('./webpack.config.pro');
const webpack = require('webpack');

webpackConfigs.forEach(config => {

    webpack(config, function (err, stats) {
        if (err) {
            throw err;
        }

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n');

        console.log('----- build complete >_<#@! -----');
    });

});
