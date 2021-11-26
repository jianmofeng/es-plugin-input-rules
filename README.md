# eslint-plugin-test

miaoshu

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `eslint-plugin-input-rule`:

```sh
yarn eslint-plugin-input-rule
```

## Usage

Add `test` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "test"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "test/rule-name": 2
    }
}
```

## Supported Rules

* Fill in provided rules here


