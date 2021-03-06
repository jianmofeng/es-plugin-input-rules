var assert = require('assert');

var invalidChars = /[^a-zA-Z0-9:]+/g;
/**
 * Convert text to kebab-case
 * @param {string} str Text to be converted
 * @return {string}
 */

function kebabCase(str) {
  return str.replace(/([a-z])([A-Z])/g, function (match) {
    return match[0] + '-' + match[1];
  }).replace(invalidChars, '-').toLowerCase();
}
/**
 * Convert text to camelCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */


function camelCase(str) {
  return str.replace(/_/g, function (_, index) {
    return index === 0 ? _ : '-';
  }).replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(invalidChars, '');
}
/**
 * Convert text to PascalCase
 * @param {string} str Text to be converted
 * @return {string} Converted string
 */


function pascalCase(str) {
  return str.replace(/_/g, function (_, index) {
    return index === 0 ? _ : '-';
  }).replace(/(?:^\w|[A-Z]|\b\w)/g, function (letter, index) {
    return letter.toUpperCase();
  }).replace(invalidChars, '');
}

var convertersMap = {
  'kebab-case': kebabCase,
  'camelCase': camelCase,
  'PascalCase': pascalCase
};
module.exports = {
  allowedCaseOptions: ['camelCase', 'kebab-case', 'PascalCase'],

  /**
   * Return case converter
   * @param {string} name type of converter to return ('camelCase', 'kebab-case', 'PascalCase')
   * @return {kebabCase|camelCase|pascalCase}
   */
  getConverter: function getConverter(name) {
    assert(typeof name === 'string');
    return convertersMap[name] || pascalCase;
  }
};