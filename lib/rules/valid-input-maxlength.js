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
        const node_attrs = node.startTag.attributes
        // console.log(`node_attrs>>>>>`, node_attrs)
        let isMaxFlag = false, isMaxValFlag = false;
        // v-bind集合
        const node_directives = (() => {
          return node.startTag.attributes.filter(a =>
            a.directive
          )
        })()
        let hasD = node_directives.find(o => o.key.argument.name === maxlength)

        if (hasD) {
          isMaxFlag = true
          if (hasD.value.expression && hasD.value.expression.value) {
            
            isMaxValFlag = true
          }
        }
        node_attrs.forEach((n) => {
          if (n.key.name === maxlength) {
            isMaxFlag = true
            if (n.value && n.value.value) {
              isMaxValFlag = true
            }
          }
        })
        
        if (!isMaxFlag) {
          return context.report({
            node,
            loc: node.loc,
            message: "s-input需要有maxlength"
          })
        }
        if (!isMaxValFlag) {
          return context.report({
            node,
            loc: node.loc,
            message: "maxlength=????, 写值啊大兄弟"
          })
        }
      }
    })
  },
};
// conditionals
// render ModifierFlags
