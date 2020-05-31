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
         * library 名称
         *
         * @type {string}
         */
        name: string;
        /**
         * 产出文件名
         *
         * @type {string}
         */
        file: string;
        /**
         * 默认 umd 格式
         *
         * @type {'umd'}
         */
        format: 'umd';
    };
    /**
     * 是否使用 typescript
     *
     * @memberof RollupOption
     */
    typescript? = false;
    /**
     * 是否需要 polyfill
     *
     * @memberof RollupOption
     */
    polyfill? = false;
    /**
     * 是否压缩
     *
     * @memberof RollupOption
     */
    uglify? = false;
}
