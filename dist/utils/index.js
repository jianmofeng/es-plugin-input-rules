/**
 * @author Toru Nagashima <https://github.com/mysticatea>
 * @copyright 2017 Toru Nagashima. All rights reserved.
 * See LICENSE file in root directory for full license.
 */
'use strict'; // ------------------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------------------

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var HTML_ELEMENT_NAMES = new Set(require('./html-elements.json'));
var VOID_ELEMENT_NAMES = new Set(require('./void-elements.json'));

var assert = require('assert');

var vueEslintParser = require('vue-eslint-parser'); // ------------------------------------------------------------------------------
// Exports
// ------------------------------------------------------------------------------


module.exports = {
  /**
   * Register the given visitor to parser services.
   * If the parser service of `vue-eslint-parser` was not found,
   * this generates a warning.
   *
   * @param {RuleContext} context The rule context to use parser services.
   * @param {Object} templateBodyVisitor The visitor to traverse the template body.
   * @param {Object} scriptVisitor The visitor to traverse the script.
   * @returns {Object} The merged visitor.
   */
  defineTemplateBodyVisitor: function defineTemplateBodyVisitor(context, templateBodyVisitor, scriptVisitor) {
    if (context.parserServices.defineTemplateBodyVisitor == null) {
      context.report({
        loc: {
          line: 1,
          column: 0
        },
        message: 'Use the latest vue-eslint-parser. See also https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error'
      });
      return {};
    }

    return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor);
  },

  /**
   * Check whether the given node is the root element or not.
   * @param {ASTNode} node The element node to check.
   * @returns {boolean} `true` if the node is the root element.
   */
  isRootElement: function isRootElement(node) {
    assert(node && node.type === 'VElement');
    return node.parent.type === 'VDocumentFragment' || node.parent.parent.type === 'VDocumentFragment';
  },

  /**
   * Get the previous sibling element of the given element.
   * @param {ASTNode} node The element node to get the previous sibling element.
   * @returns {ASTNode|null} The previous sibling element.
   */
  prevSibling: function prevSibling(node) {
    assert(node && node.type === 'VElement');
    var prevElement = null;

    var _iterator = _createForOfIteratorHelper(node.parent && node.parent.children || []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var siblingNode = _step.value;

        if (siblingNode === node) {
          return prevElement;
        }

        if (siblingNode.type === 'VElement') {
          prevElement = siblingNode;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return null;
  },

  /**
   * Check whether the given start tag has specific directive.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {boolean} `true` if the start tag has the directive.
   */
  hasAttribute: function hasAttribute(node, name, value) {
    assert(node && node.type === 'VElement');
    return node.startTag.attributes.some(function (a) {
      return !a.directive && a.key.name === name && (value === undefined || a.value != null && a.value.value === value);
    });
  },

  /**
   * Check whether the given start tag has specific directive.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {boolean} `true` if the start tag has the directive.
   */
  hasDirective: function hasDirective(node, name, argument) {
    assert(node && node.type === 'VElement');
    return node.startTag.attributes.some(function (a) {
      return a.directive && a.key.name === name && (argument === undefined || a.key.argument === argument);
    });
  },

  /**
   * Check whether the given attribute has their attribute value.
   * @param {ASTNode} node The attribute node to check.
   * @returns {boolean} `true` if the attribute has their value.
   */
  hasAttributeValue: function hasAttributeValue(node) {
    assert(node && node.type === 'VAttribute');
    return node.value != null && (node.value.expression != null || node.value.syntaxError != null);
  },

  /**
   * Get the attribute which has the given name.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The attribute name to check.
   * @param {string} [value] The attribute value to check.
   * @returns {ASTNode} The found attribute.
   */
  getAttribute: function getAttribute(node, name, value) {
    assert(node && node.type === 'VElement');
    return node.startTag.attributes.find(function (a) {
      return !a.directive && a.key.name === name && (value === undefined || a.value != null && a.value.value === value);
    });
  },

  /**
   * Get the directive which has the given name.
   * @param {ASTNode} node The start tag node to check.
   * @param {string} name The directive name to check.
   * @param {string} [argument] The directive argument to check.
   * @returns {ASTNode} The found directive.
   */
  getDirective: function getDirective(node, name, argument) {
    assert(node && node.type === 'VElement');
    return node.startTag.attributes.find(function (a) {
      return a.directive && a.key.name === name && (argument === undefined || a.key.argument === argument);
    });
  },

  /**
   * Check whether the previous sibling element has `if` or `else-if` directive.
   * @param {ASTNode} node The element node to check.
   * @returns {boolean} `true` if the previous sibling element has `if` or `else-if` directive.
   */
  prevElementHasIf: function prevElementHasIf(node) {
    assert(node && node.type === 'VElement');
    var prev = this.prevSibling(node);
    return prev != null && prev.startTag.attributes.some(function (a) {
      return a.directive && (a.key.name === 'if' || a.key.name === 'else-if');
    });
  },

  /**
   * Check whether the given node is a custom component or not.
   * @param {ASTNode} node The start tag node to check.
   * @returns {boolean} `true` if the node is a custom component.
   */
  isCustomComponent: function isCustomComponent(node) {
    assert(node && node.type === 'VElement');
    return this.isHtmlElementNode(node) && !this.isHtmlWellKnownElementName(node.name) || this.hasAttribute(node, 'is') || this.hasDirective(node, 'bind', 'is');
  },

  /**
   * Check whether the given node is a HTML element or not.
   * @param {ASTNode} node The node to check.
   * @returns {boolean} `true` if the node is a HTML element.
   */
  isHtmlElementNode: function isHtmlElementNode(node) {
    assert(node && node.type === 'VElement');
    return node.namespace === vueEslintParser.AST.NS.HTML;
  },

  /**
   * Check whether the given node is a SVG element or not.
   * @param {ASTNode} node The node to check.
   * @returns {boolean} `true` if the name is a SVG element.
   */
  isSvgElementNode: function isSvgElementNode(node) {
    assert(node && node.type === 'VElement');
    return node.namespace === vueEslintParser.AST.NS.SVG;
  },

  /**
   * Check whether the given name is a MathML element or not.
   * @param {ASTNode} name The node to check.
   * @returns {boolean} `true` if the node is a MathML element.
   */
  isMathMLElementNode: function isMathMLElementNode(node) {
    assert(node && node.type === 'VElement');
    return node.namespace === vueEslintParser.AST.NS.MathML;
  },

  /**
   * Check whether the given name is an well-known element or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is an well-known element name.
   */
  isHtmlWellKnownElementName: function isHtmlWellKnownElementName(name) {
    assert(typeof name === 'string');
    return HTML_ELEMENT_NAMES.has(name.toLowerCase());
  },

  /**
   * Check whether the given name is a void element name or not.
   * @param {string} name The name to check.
   * @returns {boolean} `true` if the name is a void element name.
   */
  isHtmlVoidElementName: function isHtmlVoidElementName(name) {
    assert(typeof name === 'string');
    return VOID_ELEMENT_NAMES.has(name.toLowerCase());
  },

  /**
   * Parse member expression node to get array with all of its parts
   * @param {ASTNode} MemberExpression
   * @returns {Array}
   */
  parseMemberExpression: function parseMemberExpression(node) {
    var members = [];
    var memberExpression;

    if (node.type === 'MemberExpression') {
      memberExpression = node;

      while (memberExpression.type === 'MemberExpression') {
        if (memberExpression.property.type === 'Identifier') {
          members.push(memberExpression.property.name);
        }

        memberExpression = memberExpression.object;
      }

      if (memberExpression.type === 'ThisExpression') {
        members.push('this');
      } else if (memberExpression.type === 'Identifier') {
        members.push(memberExpression.name);
      }
    }

    return members.reverse();
  },

  /**
   * Gets the property name of a given node.
   * @param {ASTNode} node - The node to get.
   * @return {string|null} The property name if static. Otherwise, null.
   */
  getStaticPropertyName: function getStaticPropertyName(node) {
    var prop;

    switch (node && node.type) {
      case 'Property':
      case 'MethodDefinition':
        prop = node.key;
        break;

      case 'MemberExpression':
        prop = node.property;
        break;

      case 'Literal':
      case 'TemplateLiteral':
      case 'Identifier':
        prop = node;
        break;
      // no default
    }

    switch (prop && prop.type) {
      case 'Literal':
        return String(prop.value);

      case 'TemplateLiteral':
        if (prop.expressions.length === 0 && prop.quasis.length === 1) {
          return prop.quasis[0].value.cooked;
        }

        break;

      case 'Identifier':
        if (!node.computed) {
          return prop.name;
        }

        break;
      // no default
    }

    return null;
  },

  /**
   * Get all computed properties by looking at all component's properties
   * @param {ObjectExpression} Object with component definition
   * @return {Array} Array of computed properties in format: [{key: String, value: ASTNode}]
   */
  getComputedProperties: function getComputedProperties(componentObject) {
    var computedPropertiesNode = componentObject.properties.find(function (p) {
      return p.type === 'Property' && p.key.type === 'Identifier' && p.key.name === 'computed' && p.value.type === 'ObjectExpression';
    });

    if (!computedPropertiesNode) {
      return [];
    }

    return computedPropertiesNode.value.properties.filter(function (cp) {
      return cp.type === 'Property';
    }).map(function (cp) {
      var key = cp.key.name;
      var value;

      if (cp.value.type === 'FunctionExpression') {
        value = cp.value.body;
      } else if (cp.value.type === 'ObjectExpression') {
        value = cp.value.properties.filter(function (p) {
          return p.key.type === 'Identifier' && p.key.name === 'get' && p.value.type === 'FunctionExpression';
        }).map(function (p) {
          return p.value.body;
        })[0];
      }

      return {
        key: key,
        value: value
      };
    });
  },

  /**
   * Check whether the given node is a Vue component based
   * on the filename and default export type
   * export default {} in .vue || .jsx
   * @param {ASTNode} node Node to check
   * @param {string} path File name with extension
   * @returns {boolean}
   */
  isVueComponentFile: function isVueComponentFile(node, path) {
    var isVueFile = path.endsWith('.vue') || path.endsWith('.jsx');
    return isVueFile && node.type === 'ExportDefaultDeclaration' && node.declaration.type === 'ObjectExpression';
  },

  /**
   * Check whether given node is Vue component
   * Vue.component('xxx', {}) || component('xxx', {})
   * @param {ASTNode} node Node to check
   * @returns {boolean}
   */
  isVueComponent: function isVueComponent(node) {
    var callee = node.callee;
    var isFullVueComponent = node.type === 'CallExpression' && callee.type === 'MemberExpression' && callee.object.type === 'Identifier' && callee.object.name === 'Vue' && callee.property.type === 'Identifier' && (callee.property.name === 'component' || callee.property.name === 'mixin') && node.arguments.length && node.arguments.slice(-1)[0].type === 'ObjectExpression';
    var isDestructedVueComponent = callee.type === 'Identifier' && callee.name === 'component';
    return isFullVueComponent || isDestructedVueComponent;
  },

  /**
   * Check whether given node is new Vue instance
   * new Vue({})
   * @param {ASTNode} node Node to check
   * @returns {boolean}
   */
  isVueInstance: function isVueInstance(node) {
    var callee = node.callee;
    return node.type === 'NewExpression' && callee.type === 'Identifier' && callee.name === 'Vue' && node.arguments.length && node.arguments[0].type === 'ObjectExpression';
  },

  /**
   * Check if current file is a Vue instance or component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param {Function} cb Callback function
   */
  executeOnVue: function executeOnVue(context, cb) {
    return Object.assign(this.executeOnVueComponent(context, cb), this.executeOnVueInstance(context, cb));
  },

  /**
   * Check if current file is a Vue instance (new Vue) and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param {Function} cb Callback function
   */
  executeOnVueInstance: function executeOnVueInstance(context, cb) {
    var _this = this;

    return {
      'NewExpression:exit': function NewExpressionExit(node) {
        // new Vue({})
        if (!_this.isVueInstance(node)) return;
        cb(node.arguments[0]);
      }
    };
  },

  /**
   * Check if current file is a Vue component and call callback
   * @param {RuleContext} context The ESLint rule context object.
   * @param {Function} cb Callback function
   */
  executeOnVueComponent: function executeOnVueComponent(context, cb) {
    var filePath = context.getFilename();
    var sourceCode = context.getSourceCode();

    var _this = this;

    var componentComments = sourceCode.getAllComments().filter(function (comment) {
      return /@vue\/component/g.test(comment.value);
    });
    var foundNodes = [];

    var isDuplicateNode = function isDuplicateNode(node) {
      if (foundNodes.some(function (el) {
        return el.loc.start.line === node.loc.start.line;
      })) return true;
      foundNodes.push(node);
      return false;
    };

    return {
      'ObjectExpression:exit': function ObjectExpressionExit(node) {
        if (!componentComments.some(function (el) {
          return el.loc.end.line === node.loc.start.line - 1;
        }) || isDuplicateNode(node)) return;
        cb(node);
      },
      'ExportDefaultDeclaration:exit': function ExportDefaultDeclarationExit(node) {
        // export default {} in .vue || .jsx
        if (!_this.isVueComponentFile(node, filePath) || isDuplicateNode(node.declaration)) return;
        cb(node.declaration);
      },
      'CallExpression:exit': function CallExpressionExit(node) {
        // Vue.component('xxx', {}) || component('xxx', {})
        if (!_this.isVueComponent(node) || isDuplicateNode(node.arguments.slice(-1)[0])) return;
        cb(node.arguments.slice(-1)[0]);
      }
    };
  },

  /**
   * Return generator with all properties
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  iterateProperties: /*#__PURE__*/regeneratorRuntime.mark(function iterateProperties(node, groups) {
    var _this2 = this;

    var nodes, _iterator2, _step2, item, name;

    return regeneratorRuntime.wrap(function iterateProperties$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            nodes = node.properties.filter(function (p) {
              return p.type === 'Property' && groups.has(_this2.getStaticPropertyName(p.key));
            });
            _iterator2 = _createForOfIteratorHelper(nodes);
            _context.prev = 2;

            _iterator2.s();

          case 4:
            if ((_step2 = _iterator2.n()).done) {
              _context.next = 21;
              break;
            }

            item = _step2.value;
            name = this.getStaticPropertyName(item.key);

            if (name) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("continue", 19);

          case 9:
            if (!(item.value.type === 'ArrayExpression')) {
              _context.next = 13;
              break;
            }

            return _context.delegateYield(this.iterateArrayExpression(item.value, name), "t0", 11);

          case 11:
            _context.next = 19;
            break;

          case 13:
            if (!(item.value.type === 'ObjectExpression')) {
              _context.next = 17;
              break;
            }

            return _context.delegateYield(this.iterateObjectExpression(item.value, name), "t1", 15);

          case 15:
            _context.next = 19;
            break;

          case 17:
            if (!(item.value.type === 'FunctionExpression')) {
              _context.next = 19;
              break;
            }

            return _context.delegateYield(this.iterateFunctionExpression(item.value, name), "t2", 19);

          case 19:
            _context.next = 4;
            break;

          case 21:
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t3 = _context["catch"](2);

            _iterator2.e(_context.t3);

          case 26:
            _context.prev = 26;

            _iterator2.f();

            return _context.finish(26);

          case 29:
          case "end":
            return _context.stop();
        }
      }
    }, iterateProperties, this, [[2, 23, 26, 29]]);
  }),

  /**
   * Return generator with all elements inside ArrayExpression
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  iterateArrayExpression: /*#__PURE__*/regeneratorRuntime.mark(function iterateArrayExpression(node, groupName) {
    var _iterator3, _step3, item, name, obj;

    return regeneratorRuntime.wrap(function iterateArrayExpression$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            assert(node.type === 'ArrayExpression');
            _iterator3 = _createForOfIteratorHelper(node.elements);
            _context2.prev = 2;

            _iterator3.s();

          case 4:
            if ((_step3 = _iterator3.n()).done) {
              _context2.next = 13;
              break;
            }

            item = _step3.value;
            name = this.getStaticPropertyName(item);

            if (!name) {
              _context2.next = 11;
              break;
            }

            obj = {
              name: name,
              groupName: groupName,
              node: item
            };
            _context2.next = 11;
            return obj;

          case 11:
            _context2.next = 4;
            break;

          case 13:
            _context2.next = 18;
            break;

          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](2);

            _iterator3.e(_context2.t0);

          case 18:
            _context2.prev = 18;

            _iterator3.f();

            return _context2.finish(18);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, iterateArrayExpression, this, [[2, 15, 18, 21]]);
  }),

  /**
   * Return generator with all elements inside ObjectExpression
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  iterateObjectExpression: /*#__PURE__*/regeneratorRuntime.mark(function iterateObjectExpression(node, groupName) {
    var _iterator4, _step4, item, name, obj;

    return regeneratorRuntime.wrap(function iterateObjectExpression$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            assert(node.type === 'ObjectExpression');
            _iterator4 = _createForOfIteratorHelper(node.properties);
            _context3.prev = 2;

            _iterator4.s();

          case 4:
            if ((_step4 = _iterator4.n()).done) {
              _context3.next = 13;
              break;
            }

            item = _step4.value;
            name = this.getStaticPropertyName(item);

            if (!name) {
              _context3.next = 11;
              break;
            }

            obj = {
              name: name,
              groupName: groupName,
              node: item.key
            };
            _context3.next = 11;
            return obj;

          case 11:
            _context3.next = 4;
            break;

          case 13:
            _context3.next = 18;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t0 = _context3["catch"](2);

            _iterator4.e(_context3.t0);

          case 18:
            _context3.prev = 18;

            _iterator4.f();

            return _context3.finish(18);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, iterateObjectExpression, this, [[2, 15, 18, 21]]);
  }),

  /**
   * Return generator with all elements inside FunctionExpression
   * @param {ASTNode} node Node to check
   * @param {string} groupName Name of parent group
   */
  iterateFunctionExpression: /*#__PURE__*/regeneratorRuntime.mark(function iterateFunctionExpression(node, groupName) {
    var _iterator5, _step5, item;

    return regeneratorRuntime.wrap(function iterateFunctionExpression$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            assert(node.type === 'FunctionExpression');

            if (!(node.body.type === 'BlockStatement')) {
              _context4.next = 19;
              break;
            }

            _iterator5 = _createForOfIteratorHelper(node.body.body);
            _context4.prev = 3;

            _iterator5.s();

          case 5:
            if ((_step5 = _iterator5.n()).done) {
              _context4.next = 11;
              break;
            }

            item = _step5.value;

            if (!(item.type === 'ReturnStatement' && item.argument && item.argument.type === 'ObjectExpression')) {
              _context4.next = 9;
              break;
            }

            return _context4.delegateYield(this.iterateObjectExpression(item.argument, groupName), "t0", 9);

          case 9:
            _context4.next = 5;
            break;

          case 11:
            _context4.next = 16;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t1 = _context4["catch"](3);

            _iterator5.e(_context4.t1);

          case 16:
            _context4.prev = 16;

            _iterator5.f();

            return _context4.finish(16);

          case 19:
          case "end":
            return _context4.stop();
        }
      }
    }, iterateFunctionExpression, this, [[3, 13, 16, 19]]);
  }),

  /**
   * Find all functions which do not always return values
   * @param {boolean} treatUndefinedAsUnspecified
   * @param {Function} cb Callback function
   */
  executeOnFunctionsWithoutReturn: function executeOnFunctionsWithoutReturn(treatUndefinedAsUnspecified, cb) {
    var funcInfo = {
      funcInfo: null,
      codePath: null,
      hasReturn: false,
      hasReturnValue: false,
      node: null
    };

    function isValidReturn() {
      if (!funcInfo.hasReturn) {
        return false;
      }

      return !treatUndefinedAsUnspecified || funcInfo.hasReturnValue;
    }

    return {
      onCodePathStart: function onCodePathStart(codePath, node) {
        funcInfo = {
          codePath: codePath,
          funcInfo: funcInfo,
          hasReturn: false,
          hasReturnValue: false,
          node: node
        };
      },
      onCodePathEnd: function onCodePathEnd() {
        funcInfo = funcInfo.funcInfo;
      },
      ReturnStatement: function ReturnStatement(node) {
        funcInfo.hasReturn = true;
        funcInfo.hasReturnValue = Boolean(node.argument);
      },
      'ArrowFunctionExpression:exit': function ArrowFunctionExpressionExit(node) {
        if (!isValidReturn() && !node.expression) {
          cb(funcInfo.node);
        }
      },
      'FunctionExpression:exit': function FunctionExpressionExit(node) {
        if (!isValidReturn()) {
          cb(funcInfo.node);
        }
      }
    };
  },

  /**
   * Check whether the component is declared in a single line or not.
   * @param {ASTNode} node
   * @returns {boolean}
   */
  isSingleLine: function isSingleLine(node) {
    return node.loc.start.line === node.loc.end.line;
  },

  /**
   * Check whether the templateBody of the program has invalid EOF or not.
   * @param {Program} node The program node to check.
   * @returns {boolean} `true` if it has invalid EOF.
   */
  hasInvalidEOF: function hasInvalidEOF(node) {
    var body = node.templateBody;

    if (body == null || body.errors == null) {
      return;
    }

    return body.errors.some(function (error) {
      return typeof error.code === 'string' && error.code.startsWith('eof-');
    });
  }
};