'use strict'

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

const RuleTester = require('eslint').RuleTester
const rule = require('../../../lib/rules/valid-s-input')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})

tester.run('valid-s-input', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: ''
    },
    {
      filename: 'test.vue',
      code: '<template><div><s-input /></div></template>'
    },
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: '<template><div><a-input placeholder="xxx"/></div></template>',
      errors: ["用s-xx"]
    },
    {
      filename: 'test.vue',
      code: '<template><div><a-input></a-input></div></template>',
      errors: ["用s-xx222"]
    },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-else></div></div></template>',
    //   errors: ["'v-else' directives require being preceded by the element which has a 'v-if' or 'v-else' directive."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div></div><div v-else></div></div></template>',
    //   errors: ["'v-else' directives require being preceded by the element which has a 'v-if' or 'v-else' directive."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div if="foo"></div><div v-else></div></div></template>',
    //   errors: ["'v-else' directives require being preceded by the element which has a 'v-if' or 'v-else' directive."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-if="foo"></div><div></div><div v-else></div></div></template>',
    //   errors: ["'v-else' directives require being preceded by the element which has a 'v-if' or 'v-else' directive."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-if="foo"></div><div v-else v-if="bar"></div></div></template>',
    //   errors: ["'v-else' and 'v-if' directives can't exist on the same element. You may want 'v-else-if' directives."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-if="foo"></div><div v-else v-else-if="foo"></div></div></template>',
    //   errors: ["'v-else' and 'v-else-if' directives can't exist on the same element."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-if="foo"></div><div v-else:aaa></div></div></template>',
    //   errors: ["'v-else' directives require no argument."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-if="foo"></div><div v-else.aaa></div></div></template>',
    //   errors: ["'v-else' directives require no modifier."]
    // },
    // {
    //   filename: 'test.vue',
    //   code: '<template><div><div v-if="foo"></div><div v-else="foo"></div></div></template>',
    //   errors: ["'v-else' directives require no attribute value."]
    // }
  ]
})