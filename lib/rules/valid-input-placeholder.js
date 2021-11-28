/**
 * @fileoverview input应该有placeholder
 * @author valid-input-placeholder
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
      description: "s-input应该有placeholder",
      category: "Fill me in",
      recommended: false,
      url: 'https://github.com/jianmofeng/es-plugin-demo', // URL to the documentation page for this rule
    },
    // fixable: 'code', // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      placeholderMethod: 's-input应该有默认值(placeholder)'
    },
  },

  create(context) {
    // variables should be defined here
    // console.log(`(╯‵□′)╯︵┻━┻`, vueEslintParser)
    // console.log(`(╯‵□′)╯︵┻━┻`, utils.defineTemplateBodyVisitor)
    
    
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------
    // context.parserServices.defineTemplateBodyVisitor
    
    return utils.defineTemplateBodyVisitor(context, {
      "VElement[name='s-input']"(node) {
        const placeholder = 'placeholder'
        if (!utils.hasAttribute(node, placeholder)) {
          context.report({
            node,
            loc: node.loc,
            message: "s-input需要有placeholder"
          })
          return
        }
        // :placeholder 这种写法时
        if (node.type === 'VAttribute') {
          if (!utils.hasAttributeValue(node, placeholder)) {
            context.report({
              node,
              loc: node.loc,
              message: "placeholder=????, 写值啊大兄弟"
            })
          }
        } else if (node.type === 'VElement') {
          const attr = utils.getAttribute(node, placeholder)
          if (!attr.key.value) {
            context.report({
              node,
              loc: node.loc,
              message: "placeholder=????, 写值啊大兄弟"
            })
          }
        }
      },
    })
  },
};
// conditionals
// render ModifierFlags
