"use strict";

// module.exports = {
//   root: true,
//   extends: [
//     // "eslint:recommended",
//     // "plugin:eslint-plugin/recommended",
//     // "plugin:node/recommended",
//     'plugin:vue/vue3-recommended',
//   ],
//   parser: "vue-eslint-parser",
//   env: {
//     node: true,
//   },
//   overrides: [
//     {
//       files: ["tests/**/*.js"],
//       env: { mocha: true },
//     },
//   ],
//   parserOptions: {
//     sourceType: 'module',
//     ecmaVersion: 2018,
//     ecmaFeatures: {
//         globalReturn: false,
//         impliedStrict: false,
//         jsx: false
//     },
//     vueFeatures: {
//         filter: true,
//         interpolationAsNonHTML: false,
//         styleCSSVariableInjection: true,
//     },
//   },
// };
module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6
  },
  env: {
    node: true,
    mocha: true
  },
  extends: [
    'plugin:eslint-plugin/recommended',
    'plugin:vue-libs/recommended'
  ],
  plugins: [
    'eslint-plugin'
  ],
  rules: {
    'eslint-plugin/report-message-format': ['error', '^[A-Z].*\\.$'],
    'eslint-plugin/prefer-placeholders': 'error',
    'eslint-plugin/consistent-output': 'error'
  }
}