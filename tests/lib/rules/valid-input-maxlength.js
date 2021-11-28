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
const rule = require('../../../lib/rules/valid-input-maxlength.js')

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const tester = new RuleTester({
  parser: require.resolve('vue-eslint-parser'),
  parserOptions: { ecmaVersion: 2015 }
})
return
// console.log(`(╯‵□′)╯︵┻━┻`, require.resolve('vue-eslint-parser'))
// console.log(`(╯‵□′)╯︵┻━┻`, rule)
tester.run('valid-input-maxlength', rule, {
  valid: [
    {
      filename: 'test.vue',
      code: `<template>
                <div>
                  <div v-if="foo">
                    <s-input maxlength="100"/>
                  </div>
                </div>
            </template>`
    },
    {
      filename: 'test.vue',
      code: `<template>
                <div>
                  <div v-if="foo">
                    <s-input m="100" :maxlength="111"/>
                  </div>
                </div>
            </template>`,
    },
    
  ],
  invalid: [
    {
      filename: 'test.vue',
      code: `<template>
                <div>
                  <div v-if="foo">
                    <s-input m="100" :maxlength=""/>
                  </div>
                </div>
            </template>`,
      errors: ["maxlength需要有"]
    },
    
    {
      filename: 'test.vue',
      code: `<template>
                <div>
                  <div v-if="foo">
                    <s-input m="100"/>
                  </div>
                </div>
            </template>`,
      errors: ["maxlength需要有"]
    },
    {
      filename: 'test.vue',
      code: `<template>
                <div>
                  <div v-if="foo">
                    <s-input m="100" maxlength=""/>
                  </div>
                </div>
            </template>`,
      errors: ["maxlength需要有"]
    },
  ]
})