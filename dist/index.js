'use strict';

module.exports.processors = {};
module.exports = {
  rules: {
    'valid-input-placeholder': require('./rules/valid-input-placeholder'),
    'valid-input-maxlength': require('./rules/valid-input-maxlength'),
    'valid-s-input': require('./rules/valid-s-input')
  },
  configs: {
    recommended: {
      rules: {
        'input-rule/valid-input-placeholder': 2,
        'input-rule/valid-input-maxlength': 2,
        'input-rule/valid-s-input': 2
      }
    }
  }
};
