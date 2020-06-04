# @nosaid/rollup

集成了 `rollup` 打包依赖和相关配置。

## Installation

```shell
$ npm install @nosaid/rollup --save-dev

# 如果需要打包 typescript，需要额外安装
$ npm install typescript --save-dev
```

## Usage

```shell
& vim rollup.config.js
```

```js
import { rollupGenerator } from '@nosaid/rollup';

export default rollupGenerator([
    {
        input: 'src/main.js',        // 入口文件，支持 `js|ts` 文件
        output: {
            name: 'LibUMD',          // library 名称
            file: 'dist/lib-umd.js', // 产出文件名
            format: 'umd'            // umd 格式
        },
        typescript: {},              // 可选，额外的 typescript 配置： https://www.npmjs.com/package/rollup-plugin-typescript2
        polyfill: false,             // 可选，是否需要 polyfill，默认 false
        uglify: false,               // 可选，是否需要压缩，默认 false
        postcssExtract: false        // 可选，`boolean|string`，css 是否需要 extract，默认 false
    },
    ...
]);
```

```shell
& vim package.json
```

```json
{
    "scripts": {
        ...,
        "dev": "rollup -c -w",
        "build": "rollup -c"
    }
}
```

```shell
# 如果有css，且需要使用 autoprefixer 转化
# 默认支持 `scss`、`postcss`，如果需要其它包可以直接安装，比如 `npm i less --save-dev`
$ vim .browserslistrc
```

```shell
last 2 version
> 1%
IE 10
```
