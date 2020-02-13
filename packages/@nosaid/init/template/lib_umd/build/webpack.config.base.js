const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const ifProduction = ['production', 'analyze'].includes(process.env.NODE_ENV);

const DIST_PATH = path.join(__dirname, '../dist');
const PUBLIC_PATH = process.env.PUBLIC_PATH;

const BASE_CONFIG = { // 基础配置

    output: {
        filename: '[name].js',
        path: DIST_PATH,
        publicPath: PUBLIC_PATH
    },

    module: {
        rules: [
            {
                test: /\.html$/,
                use: ['html-loader']
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV', 'PUBLIC_PATH'
        ]),

        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].css'
            // chunkFilename: '[id].[hash].css'
        })
    ],

    resolve: {
        extensions: [
            '.ts', '.js', '.scss'
        ]
    }
};

module.exports = [
    // core
    {
        entry: {
            'lib-umd': path.join(
                __dirname,
                ifProduction
                    ? '../src/lib-umd.ts'
                    : '../src/dev.ts'
            )
        },

        output: {
            library: 'LIB_UMD',
            libraryExport: 'default',
            libraryTarget: ifProduction ? 'umd' : undefined
        },

        module: {
            rules: [
                {
                    test: /\.s?css$/,
                    use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
                }
            ]
        }
    }
].map(config => merge(BASE_CONFIG, config));
