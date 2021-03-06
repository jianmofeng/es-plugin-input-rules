/**
 * @author Toru Nagashima
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/valid-input-placeholder.js')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

return false;
tester.run('valid-input-placeholder', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: '<template><div><div v-if="foo"><s-input placeholder="1"/></div></template>',
    },
    {
      filename: 'test.vue',
      code: '<template><div><div v-if="foo"><s-input :placeholder="1"/></div></template>',
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div><div v-if="foo"><s-input/></div></template>',
      errors: ["placeholder需要有"]
    },
    {
      filename: 'test.vue',
      code: '<template><div><div v-if="foo"><s-input placeholder=""/></div></template>',
      errors: ["placeholder需要有值"]
    },
    {
      filename: 'test.vue',
      code: '<template><div><div v-if="foo"><s-input :placeholder=""/></div></template>',
      errors: ["v-placeholder需要有值"]
    },
    
  ]
})