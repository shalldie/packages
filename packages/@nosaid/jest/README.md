# @nosaid/jest

集成了 `typescript` 的单元测试相关包。

## Installation

    npm install @nosaid/jest --save-dev

## Usage

```shell
& vim jest.config.js
```

```js
// eslint-disable-next-line
module.exports = {
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1',
        '^vue$': 'vue/dist/vue.common.js',
        '^~/(.*)$': '<rootDir>/client/$1'
    },
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    transform: {
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest',
        '^.+\\.tsx?$': 'ts-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: ['<rootDir>/client/components/**/*.vue', '<rootDir>/client/pages/**/*.vue']
};
```

```shell
& vim package.json
```

```json
{
    "scripts": {
        ...,
        "test": "jest"
    }
}
```
