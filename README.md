# eslint-plugin-input-rule

这是一个规范input的插件

## 安装

首先需要安装该eslint插件 [Input-rule](https://www.npmjs.com/package/eslint-plugin-input-rule):

```sh
npm i eslint-plugin-input-rule --save-dev
```

Next, install `eslint-plugin-input-rule`:

```sh
yarn eslint-plugin-input-rule
```

## Usage

Add `input-rule` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "extends":["plugin:eslint-plugin-input-rule/recommended"],
    "plugins": [
        "input-rule"
    ]
}
```

如果需要单独关闭，在下面rules中，将对应规则设置为false

```json
{
    "rules": {
        "input-rule/valid-s-input": false,
    }
}
```

## 支持规则

* Fill in provided rules here


