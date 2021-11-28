/**
 * @fileoverview input应该有maxlength
 * @author valid-input-maxlength
 */
"use strict";

// import { AST } from "vue-eslint-parser"
//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const utils = require('../utils')
module.exports = {
  meta: {
    type: 'suggestion', // `problem`, `suggestion`, or `layout`
    docs: {
      description: "s-input应该有maxlength",
      category: "Fill me in",
      recommended: false,
      url: 'https://github.com/jianmofeng/es-plugin-demo', // URL to the documentation page for this rule
    },
    // fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      placeholderMethod: 's-input应该有maxlength'
    },
  },

  create(context) {
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='s-input']"(node) {
        const maxlength = 'maxlength'
        if (!utils.hasAttribute(node, maxlength)) {
          return context.report({
            node,
            loc: node.loc,
            message: "s-input需要有maxlength"
          })
        }
        // :maxlength 这种
        if (node.type === 'VAttribute') {
          if (!utils.hasAttributeValue(node, maxlength)) {
            context.report({
              node,
              loc: node.loc,
              message: "maxlength=????, 写值啊大兄弟"
            })
          }
        } else if (node.type === 'VElement') {
          const attr = utils.getAttribute(node, maxlength)
          if (!attr.key.value) {
            context.report({
              node,
              loc: node.loc,
              message: "maxlength=????, 写值啊大兄弟"
            })
          }
        }
      }
    })
  },
};
// conditionals
// render ModifierFlags
