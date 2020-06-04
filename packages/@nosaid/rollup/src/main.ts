import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import babelPlugin from '@rollup/plugin-babel';
import jsonPlugin from '@rollup/plugin-json';

import { uglify as uglifyPlugin } from 'rollup-plugin-uglify';
import servePlugin from 'rollup-plugin-serve';
import filesizePlugin from 'rollup-plugin-filesize';

import { DEFAULT_EXTENSIONS } from '@babel/core';
import postcssPlugin from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';

import RollupOption from './RollupOption';

/**
 * 配置生成器
 *
 * @export
 * @param {RollupOption[]} options
 * @returns
 */
export function rollupGenerator(options: RollupOption[]) {
    return options.map(({ input, output, serve, typescript, polyfill, uglify, postcssExtract }) => {
        const useTypescript = /\.ts$/.test(input);

        // serve 的参数需要传入 contentBase
        if (typeof serve === 'object') {
            serve = {
                contentBase: [],
                ...serve
            };
        }

        return {
            input,
            output,
            plugins: [
                jsonPlugin(),
                resolvePlugin(),
                commonjsPlugin(),
                postcssPlugin({
                    extract: postcssExtract,
                    minimize: true,
                    plugins: [autoprefixer]
                }),
                serve != null ? servePlugin(serve) : null,
                // eslint-disable-next-line
                useTypescript ? require('rollup-plugin-typescript2')(typescript || {}) : null,
                babelPlugin({
                    babelrc: false,
                    babelHelpers: 'bundled',
                    presets: [
                        [
                            '@babel/preset-env',
                            polyfill
                                ? {
                                      useBuiltIns: 'usage',
                                      modules: false,
                                      corejs: 3
                                  }
                                : {}
                        ]
                    ],
                    plugins: useTypescript
                        ? []
                        : [
                              '@babel/plugin-proposal-object-rest-spread',
                              ['@babel/plugin-proposal-decorators', { legacy: true }],
                              ['@babel/plugin-proposal-class-properties', { loose: true }]
                          ],
                    include: ['src/**'],
                    extensions: [...DEFAULT_EXTENSIONS, 'ts']
                }),
                // 压缩代码
                uglify ? uglifyPlugin() : null,
                filesizePlugin()
            ].filter(n => !!n)
        };
    });
}
