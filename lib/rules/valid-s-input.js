/**
 * @fileoverview 替换a-input为s-input
 * @author valid-s-input
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const utils = require('../utils')
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "替换a-input为s-input",
      category: "Fill me in",
      recommended: false,
      url: 'http://ibu-tech.xiaobaotech.com/ibu-business-component/#/components/s-input', // URL to the documentation page for this rule
    },
    fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      placeholderMethod: '要使用s-input'
    },
  },

  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='a-input']"(node) {
        context.report({
          node,
          loc: node.loc,
          message: "请替换a-input为s-input",
          fix: function (fixer) {
            console.log(`(╯‵□′)╯︵┻━┻`, fixer, node)
            
              return fixer.replaceText(node.name, "s-input");
          }
        })
      }
    })
  },
};
// conditionals
// render ModifierFlags
