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
      url: null, // URL to the documentation page for this rule
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
        console.log(`(╯‵□′)╯︵┻━┻`, node)
        if (node.startTag.attributes.length === 0) {
          return context.report({
            node,
            loc: node.loc,
            message: "s-input需要有maxlength和placeholder"
          })
        }
        node.startTag.attributes.forEach(item => {
          if (utils.hasAttributeValue(item)) {
            const maxLengthList = []
            item.parent.attributes.map(opt => {
              if (utils.hasAttributeValue(opt)) {
                maxLengthList.push(opt.key.argument?.name)
              }
            })
            let isMaxLength = maxLengthList.find(opt => opt === 'maxlength')
            if (!isMaxLength) {
              context.report({
                node,
                loc: node.loc,
                message: "s-input需要有maxlength"
              })
            }
          }
        })

      }
    })
  },
};
// conditionals
// render ModifierFlags
