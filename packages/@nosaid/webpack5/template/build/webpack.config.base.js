const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const envConfig = (() => {
    const envfile = path.resolve(__dirname, '../env', `${process.env.NODE_ENV}.env`);
    dotenv.config({
        path: envfile
    });
    return dotenv.parse(fs.readFileSync(envfile));
})();

const [entryPath, entryName] = (() => {
    const entryPath = path.join(__dirname, '../', process.env.BUILD_ENTRY);
    const entryName = path.basename(entryPath).replace(/\.(js|ts)$/, '');
    return [entryPath, entryName];
})();

const ifProduction = ['production'].includes(process.env.NODE_ENV);

module.exports = {
    // 基础配置
    target: 'web',

    entry: {
        [entryName]: entryPath
    },

    output: {
        clean: true,
        filename: '[name].js',
        path: path.join(__dirname, '../dist'),
        publicPath: process.env.PUBLIC_PATH,
        library: entryName,
        libraryExport: 'default',
        libraryTarget: ifProduction ? 'umd' : undefined
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // 将 JS 字符串生成为 style 节点
                    'style-loader',
                    // 将 CSS 转化成 CommonJS 模块
                    'css-loader',
                    // postcss 调用相关插件
                    'postcss-loader',
                    // 将 Sass 编译成 CSS
                    'sass-loader'
                ]
            }
        ]
    },

    plugins: [
        new webpack.EnvironmentPlugin(Object.keys(envConfig)),
        new HtmlWebpackPlugin({
            title: entryName,
            template: path.join(__dirname, '../index.html')
        })
    ],

    resolve: {
        extensions: ['.ts', '.js', '.scss', '.html']
    }
};
