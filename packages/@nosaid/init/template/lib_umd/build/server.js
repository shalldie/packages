const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../env', `${process.env.ENV_CONFIG}.env`)
});

const open = require('open');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfigs = require('./webpack.config.dev');

const serverConfig = {
    host: '127.0.0.1',
    // host: 'localhost',
    port: '3' + (Math.random() + '').slice(-3)
};

const link = `http://${serverConfig.host}:${serverConfig.port}`;
// webpackConfig.entry.push(`webpack-dev-server/client?${link}`);

const options = {
    publicPath: webpackConfigs[0].output.publicPath,
    hot: true,
    stats: {
        colors: true
    },
    ...serverConfig
};

WebpackDevServer.addDevServerEntrypoints(webpackConfigs, options);

const compiler = webpack(webpackConfigs);

const server = new WebpackDevServer(compiler, options);

server.listen(serverConfig.port, serverConfig.host, err => {
    if (err) {
        return console.log(err);
    }
    console.log(`Starting server on ${link}`);
    open(link);
});
