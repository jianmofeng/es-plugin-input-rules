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
      url: null, // URL to the documentation page for this rule
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
        node.startTag.attributes.forEach(item => {
          if (utils.hasAttributeValue(item)) {
            const inPlaceholder = item.parent.attributes.find(el => el.key.name && el.key.name === 'placeholder')
            if (!inPlaceholder) {
              context.report({
                node,
                loc: node.loc,
                message: "s-input需要有placeholder"
              })
            }
          }
        })
      },
    })
  },
};
// conditionals
// render ModifierFlags
