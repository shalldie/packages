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
        input: 'src/main.js',         // 入口文件
        output: {
            name: 'LibUMD',           // library 名称
            file: 'dist/lib-umd.js',  // 产出文件名
            format: 'umd'             // umd 格式
        },
        typescript: false,            // 是否使用 typescript，默认 false
        polyfill: false,              // 是否需要 polyfill，默认 false
        uglify: false                 // 是否需要压缩，默认 false
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
        "build": "rollup -c"
    }
}
```
