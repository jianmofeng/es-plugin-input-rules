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
        const placeholder = 'placeholder';
        const node_attrs = node.startTag.attributes
        let isPlaceFlag = false, isPlaceValFlag = false;
        // v-bind集合
        const node_directives = (() => {
          return node.startTag.attributes.filter(a =>
            a.directive
          )
        })()
        let hasD = node_directives.find(o => o.key.argument.name === placeholder)

        if (hasD) {
          isPlaceFlag = true
          if (hasD.value.expression && hasD.value.expression.value) {
            
            isPlaceValFlag = true
          }
        }
        node_attrs.forEach((n) => {
          if (n.key.name === placeholder) {
            isPlaceFlag = true
            if (n.value && n.value.value) {
              isPlaceValFlag = true
            }
          }
        })
        
        if (!isPlaceFlag) {
          return context.report({
            node,
            loc: node.loc,
            message: "s-input需要有placeholder"
          })
        }
        if (!isPlaceValFlag) {
          return context.report({
            node,
            loc: node.loc,
            message: "placeholder=????, 写值啊大兄弟"
          })
        }
      }
    })
  },
};
// conditionals
// render ModifierFlags
