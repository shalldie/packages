import { DEFAULT_EXTENSIONS } from '@babel/core';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import RollupOption from './RollupOption';

/**
 * 配置生成器
 *
 * @export
 * @param {RollupOption[]} options
 * @returns
 */
export function rollupGenerator(options: RollupOption[]) {
    return options.map(({ input, output, typescript, polyfill, uglify: ifUglify }) => {
        const tsPreset = typescript
            ? [
                  '@babel/preset-typescript',
                  {
                      allExtensions: true
                  }
              ]
            : null;

        const envPreset = [
            '@babel/preset-env',
            polyfill
                ? {
                      useBuiltIns: 'usage',
                      modules: false,
                      corejs: 3
                  }
                : {}
        ];

        const uglifyPlugin = ifUglify ? uglify() : null;

        return {
            input,
            output,
            plugins: [
                resolve(),
                commonjs(),
                babel({
                    babelrc: false,
                    babelHelpers: 'bundled',
                    presets: [tsPreset, envPreset].filter(n => !!n),
                    plugins: [
                        '@babel/plugin-proposal-object-rest-spread',
                        ['@babel/plugin-proposal-decorators', { legacy: true }],
                        ['@babel/plugin-proposal-class-properties', { loose: true }]
                    ],
                    include: ['src/**'],
                    extensions: [...DEFAULT_EXTENSIONS, 'ts']
                }),
                uglifyPlugin
            ].filter(n => !!n)
        };
    });
}
