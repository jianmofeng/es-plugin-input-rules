/**
 * @fileoverview miaoshu
 * @author plugin-demo
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

// const requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------


// import all rules in lib/rules
// module.exports.rules = requireIndex(__dirname + "/rules");



// import processors
module.exports.processors = {
  // add your processors here
};

module.exports = {
    rules: {
        'valid-input-placeholder': require('./rules/valid-input-placeholder'),
        'valid-input-maxlength': require('./rules/valid-input-maxlength'),
        'valid-s-input': require('./rules/valid-s-input'),
    },
    configs: {
        recommended: {
            rules: {
                'input-rule/valid-input-placeholder': 2, // 可以省略 eslint-plugin 前缀
                'input-rule/valid-input-maxlength': 2,
                'input-rule/valid-s-input': 2,
            },
        },
    },
};