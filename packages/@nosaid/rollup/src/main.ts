import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolvePlugin from '@rollup/plugin-node-resolve';
import commonjsPlugin from '@rollup/plugin-commonjs';
import babelPlugin from '@rollup/plugin-babel';
import { uglify as uglifyPlugin } from 'rollup-plugin-uglify';
import RollupOption from './RollupOption';

/**
 * 配置生成器
 *
 * @export
 * @param {RollupOption[]} options
 * @returns
 */
export function rollupGenerator(options: RollupOption[]) {
    return options.map(({ input, output, typescript, polyfill, uglify }) => {
        return {
            input,
            output,
            plugins: [
                resolvePlugin(),
                commonjsPlugin(),
                // eslint-disable-next-line
                typescript ? require('rollup-plugin-typescript2')() : null,
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
                    plugins: typescript
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
                uglify ? uglifyPlugin() : null
            ].filter(n => !!n)
        };
    });
}
