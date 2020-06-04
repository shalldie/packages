/**
 * rollup 配置
 *
 * @export
 * @class RollupOption
 */
export default class RollupOption {
    /**
     * 入口
     *
     * @type {string}
     * @memberof RollupOption
     */
    input!: string;

    /**
     * 打包产出
     *
     * @type {{
     *         name: string;
     *         file: string;
     *         format: 'umd';
     *     }}
     * @memberof RollupOption
     */
    output!: {
        /**
         * 产出文件名
         *
         * @type {string}
         */
        file: string;
        /**
         * 输出的模块类型
         *
         * @type {('umd' | 'cjs' | 'esm' | 'amd' | 'iife')}
         */
        format: 'umd' | 'cjs' | 'esm' | 'amd' | 'iife';
        /**
         * library 名称，如果 `format: 'umd'` 的时候用到
         *
         * @type {string}
         */
        name?: string;
    };
    /**
     * typescript 的额外配置
     *
     * https://www.npmjs.com/package/rollup-plugin-typescript2
     *
     * @memberof RollupOption
     */
    typescript?: any;
    /**
     * 是否需要 polyfill
     *
     * @type {boolean}
     * @memberof RollupOption
     */
    polyfill?: boolean;
    /**
     * 是否压缩
     *
     * @type {boolean}
     * @memberof RollupOption
     */
    uglify?: boolean;
    /**
     * css 文件是否 extract
     *
     * `false`：不 extract；
     * `true`： extract，默认和 output.file 同名
     * `string`：自定义 extract 名称
     *
     * @type {(boolean | string)}
     * @memberof RollupOption
     */
    postcssExtract?: boolean | string;
}
