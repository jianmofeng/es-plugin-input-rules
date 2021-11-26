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
// console.log(`(╯‵□′)╯︵┻━┻`, require.resolve('vue-eslint-parser'))
// console.log(`(╯‵□′)╯︵┻━┻`, rule)
// tester.run('valid-input-maxlength', rule, {
//   valid: [
//     {
//       filename: 'test.vue',
//       code: `<template>
//                 <div>
//                   <div v-if="foo">
//                     <s-input/>
//                   </div>
//                 </div>
//             </template>`
//     },
    
//   ],
//   invalid: [
//     {
//       filename: 'test.vue',
//       code: `<template>
//                 <div>
//                   <div v-if="foo">
//                     <s-input/>
//                   </div>
//                 </div>
//             </template>`,
//       errors: ["maxlength需要有"]
//     },
//     // {
//     //   filename: 'test.vue',
//     //   code: '<template><div><div v-if="foo"><s-input :value="22"/><template><s-input placeholder="11" :maxlength="100"/></template></div><div v-else></div></div></template>',
//     //   errors: ["maxlength需要有"]
//     // }
//   ]
// })