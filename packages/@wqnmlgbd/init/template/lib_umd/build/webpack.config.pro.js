const merge = require('webpack-merge');
const webpackConfigs = require('./webpack.config.base.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function getPlugins(config) {
    const name = Object.keys(config.entry)[0];
    return process.env.ANALYZE === 'ANALYZE' ? [
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            reportFilename: `report-${name}.html`
        })
    ] : [];
}

module.exports = webpackConfigs.map(config => merge(config, {

    mode: 'production',

    plugins: getPlugins(config)

}));
