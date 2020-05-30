# @nosaid/eslint-config-for-typescript

Easy to lint, for typescript

## Installation

    npm install @nosaid/eslint-config-for-typescript --save-dev

## Usage

    & vim .eslintrc.js

```js
module.exports = {
    extends: '@nosaid/eslint-config-for-typescript',
    rules: {
        ...
    }
};

```

    & vim .prettierrc

```json
{
    "singleQuote": true,
    "trailingComma": "none",
    "tabWidth": 4,
    "endOfLine": "auto",
    "printWidth": 120,
    "bracketSpacing": true,
    "arrowParens": "avoid"
}
```

    & vim package.json

```json
{
    "scripts": {
        ...,
        "lint": "eslint --ext .js,.ts,.vue .",
        "fix": "eslint --fix --ext .js,.ts,.vue .",
        "format": "prettier --write \"**/*.@(ts|js|vue)\" --ignore-path .gitignore"
    }
}
```
