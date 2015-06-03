(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["angularIoBarcode"] = factory(require("angular"));
	else
		root["angularIoBarcode"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict'
	
	var angular = __webpack_require__(1),
	    ioBarcode = __webpack_require__(2)
	
	module.exports =
	angular.module('angular-io-barcode', [])
	
	/**
	 * @ngdoc constant
	 * @name $ioBarcode
	 *
	 * @description
	 * Export of `io-barcode` module
	 *
	 */
	  .constant('$ioBarcode', ioBarcode)
	
	/**
	 * @ngdoc constant
	 * @name IO_BARCODE_TYPES
	 *
	 * @description
	 * Array of barcode types supported
	 *
	 */
	  .constant('IO_BARCODE_TYPES', [
	    'EAN',
	    'UPC',
	    'ITF',
	    'ITF14',
	    'CODE39',
	    'CODE128B',
	    'CODE128C',
	    'Pharmacode'
	  ])
	
	/**
	 * @ngdoc directive
	 * @name ioBarcode
	 * @restrict E
	 *
	 * @param {string} code The string to encode
	 * @param {string} type The type of barcode, can be: CODE128B, CODE128C, EAN, UPC, CODE39, ITF, ITF14, Pharmacode
	 * @param {object} options Additional formatting options. See io-barcode.
	 *
	 * @description
	 * Render a barcode using io-barcode
	 *
	 * @example
	   <io-barcode code="123456789999" type="UPC"></io-barcode>
	 *
	 */
	  .directive('ioBarcode', ['$ioBarcode', function ($ioBarcode) {
	    return {
	      restrict: 'E',
	      template: '<img />',
	      replace: true,
	      scope: {
	        code: '@',
	        type: '@',
	        options: '='
	      },
	      link: function (scope, element, attrs) {
	        scope.$watchGroup([
	          'code',
	          'type',
	          'options'
	        ], render)
	        scope.$watch('options', render, true)
	
	        function render () {
	          if (!ioBarcode[scope.type]) {
	            console.warn('Invalid barcode type: ' + scope.type)
	            return
	          }
	          if (!scope.code) {
	            console.warn('No code provided')
	            return
	          }
	
	          var canvas = $ioBarcode[scope.type](scope.code, scope.options)
	          element.attr('src', canvas.toDataURL('image/png'))
	        }
	      }
	    }
	  }])


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _assign = __webpack_require__(3);
	
	var _assign2 = _interopRequireWildcard(_assign);
	
	var _encodings = __webpack_require__(10);
	
	var _encodings2 = _interopRequireWildcard(_encodings);
	
	var _Canvas = __webpack_require__(23);
	
	var _Canvas2 = _interopRequireWildcard(_Canvas);
	
	var api = {};
	
	var _loop = function (_name) {
		api[_name] = function () {
			for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
				args[_key] = arguments[_key];
			}
	
			return generateBarcodeDataUri.apply(undefined, [_encodings2['default'][_name]].concat(args));
		};
	};
	
	/* eslint no-loop-func:0 */
	for (var _name in _encodings2['default']) {
		_loop(_name);
	}
	
	exports['default'] = api;
	
	var defaults = {
		width: 2,
		height: 100,
		quite: 10,
		displayValue: false,
		font: 'monospace',
		textAlign: 'center',
		fontSize: 12,
		backgroundColor: '',
		lineColor: '#000'
	};
	
	function _drawBarcodeText(text, canvas, opts) {
		var ctx = canvas.getContext('2d');
		var x = undefined,
		    y = undefined;
	
		y = opts.height;
	
		ctx.font = '' + opts.fontSize + 'px ' + opts.font;
		ctx.textBaseline = 'bottom';
		ctx.textBaseline = 'top';
	
		if (opts.textAlign === 'left') {
			x = opts.quite;
			ctx.textAlign = 'left';
		} else if (opts.textAlign === 'right') {
			x = canvas.width - opts.quite;
			ctx.textAlign = 'right';
		} else {
			x = canvas.width / 2;
			ctx.textAlign = 'center';
		}
	
		ctx.fillText(text, x, y);
	}
	
	function generateBarcodeDataUri(Encoding, code, opts) {
		/* eslint complexity:0 */
		opts = _assign2['default']({}, defaults, opts);
	
		var canvas = new _Canvas2['default']();
		var encoder = new Encoding(code);
	
		// Abort if the barcode format does not support the content
		if (!encoder.isValid()) {
			throw new Error('Content is not supported by the encoding');
		}
	
		// Encode the content
		var binaryString = encoder.encode();
	
		// Get the canvas context
		var ctx = canvas.getContext('2d');
	
		// Set the width and height of the barcode
		canvas.width = binaryString.length * opts.width + 2 * opts.quite;
	
		// Set extra height if the value is displayed under the barcode.
		canvas.height = opts.height + (opts.displayValue ? opts.fontSize * 1.3 : 0);
	
		// Paint the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	
		if (opts.backgroundColor) {
			ctx.fillStyle = opts.backgroundColor;
			ctx.fillRect(0, 0, canvas.width, canvas.height);
		}
	
		// Change to lineColor to paint the lines
		ctx.fillStyle = opts.lineColor;
	
		// Creates the barcode out of the binary string
		for (var i = 0; i < binaryString.length; i++) {
			var x = i * opts.width + opts.quite;
			if (binaryString[i] === '1') {
				ctx.fillRect(x, 0, opts.width, opts.height);
			}
		}
	
		// Add value below if enabled
		if (opts.displayValue) {
			_drawBarcodeText(code, canvas, opts);
		}
	
		return canvas;
	}
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(4);
	module.exports = __webpack_require__(6).core.Object.assign;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $def = __webpack_require__(5);
	$def($def.S, 'Object', {assign: __webpack_require__(8)});

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var $          = __webpack_require__(6)
	  , global     = $.g
	  , core       = $.core
	  , isFunction = $.isFunction;
	function ctx(fn, that){
	  return function(){
	    return fn.apply(that, arguments);
	  };
	}
	// type bitmap
	$def.F = 1;  // forced
	$def.G = 2;  // global
	$def.S = 4;  // static
	$def.P = 8;  // proto
	$def.B = 16; // bind
	$def.W = 32; // wrap
	function $def(type, name, source){
	  var key, own, out, exp
	    , isGlobal = type & $def.G
	    , isProto  = type & $def.P
	    , target   = isGlobal ? global : type & $def.S
	        ? global[name] : (global[name] || {}).prototype
	    , exports  = isGlobal ? core : core[name] || (core[name] = {});
	  if(isGlobal)source = name;
	  for(key in source){
	    // contains in native
	    own = !(type & $def.F) && target && key in target;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    if(isGlobal && !isFunction(target[key]))exp = source[key];
	    // bind timers to global for call from export context
	    else if(type & $def.B && own)exp = ctx(out, global);
	    // wrap global constructors for prevent change them in library
	    else if(type & $def.W && target[key] == out)!function(C){
	      exp = function(param){
	        return this instanceof C ? new C(param) : C(param);
	      };
	      exp.prototype = C.prototype;
	    }(out);
	    else exp = isProto && isFunction(out) ? ctx(Function.call, out) : out;
	    // export
	    exports[key] = exp;
	    if(isProto)(exports.prototype || (exports.prototype = {}))[key] = out;
	  }
	}
	module.exports = $def;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var global = typeof self != 'undefined' ? self : Function('return this')()
	  , core   = {}
	  , defineProperty = Object.defineProperty
	  , hasOwnProperty = {}.hasOwnProperty
	  , ceil  = Math.ceil
	  , floor = Math.floor
	  , max   = Math.max
	  , min   = Math.min;
	// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
	var DESC = !!function(){
	  try {
	    return defineProperty({}, 'a', {get: function(){ return 2; }}).a == 2;
	  } catch(e){ /* empty */ }
	}();
	var hide = createDefiner(1);
	// 7.1.4 ToInteger
	function toInteger(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	}
	function desc(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	}
	function simpleSet(object, key, value){
	  object[key] = value;
	  return object;
	}
	function createDefiner(bitmap){
	  return DESC ? function(object, key, value){
	    return $.setDesc(object, key, desc(bitmap, value));
	  } : simpleSet;
	}
	
	function isObject(it){
	  return it !== null && (typeof it == 'object' || typeof it == 'function');
	}
	function isFunction(it){
	  return typeof it == 'function';
	}
	function assertDefined(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	}
	
	var $ = module.exports = __webpack_require__(7)({
	  g: global,
	  core: core,
	  html: global.document && document.documentElement,
	  // http://jsperf.com/core-js-isobject
	  isObject:   isObject,
	  isFunction: isFunction,
	  that: function(){
	    return this;
	  },
	  // 7.1.4 ToInteger
	  toInteger: toInteger,
	  // 7.1.15 ToLength
	  toLength: function(it){
	    return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	  },
	  toIndex: function(index, length){
	    index = toInteger(index);
	    return index < 0 ? max(index + length, 0) : min(index, length);
	  },
	  has: function(it, key){
	    return hasOwnProperty.call(it, key);
	  },
	  create:     Object.create,
	  getProto:   Object.getPrototypeOf,
	  DESC:       DESC,
	  desc:       desc,
	  getDesc:    Object.getOwnPropertyDescriptor,
	  setDesc:    defineProperty,
	  setDescs:   Object.defineProperties,
	  getKeys:    Object.keys,
	  getNames:   Object.getOwnPropertyNames,
	  getSymbols: Object.getOwnPropertySymbols,
	  assertDefined: assertDefined,
	  // Dummy, fix for not array-like ES3 string in es5 module
	  ES5Object: Object,
	  toObject: function(it){
	    return $.ES5Object(assertDefined(it));
	  },
	  hide: hide,
	  def: createDefiner(0),
	  set: global.Symbol ? simpleSet : hide,
	  each: [].forEach
	});
	/* eslint-disable no-undef */
	if(typeof __e != 'undefined')__e = core;
	if(typeof __g != 'undefined')__g = global;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function($){
	  $.FW   = false;
	  $.path = $.core;
	  return $;
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var $        = __webpack_require__(6)
	  , enumKeys = __webpack_require__(9);
	// 19.1.2.1 Object.assign(target, source, ...)
	/* eslint-disable no-unused-vars */
	module.exports = Object.assign || function assign(target, source){
	/* eslint-enable no-unused-vars */
	  var T = Object($.assertDefined(target))
	    , l = arguments.length
	    , i = 1;
	  while(l > i){
	    var S      = $.ES5Object(arguments[i++])
	      , keys   = enumKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)T[key = keys[j++]] = S[key];
	  }
	  return T;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var $ = __webpack_require__(6);
	module.exports = function(it){
	  var keys       = $.getKeys(it)
	    , getDesc    = $.getDesc
	    , getSymbols = $.getSymbols;
	  if(getSymbols)$.each.call(getSymbols(it), function(key){
	    if(getDesc(it, key).enumerable)keys.push(key);
	  });
	  return keys;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _EAN = __webpack_require__(12);
	
	var _EAN2 = _interopRequireWildcard(_EAN);
	
	var _UPC = __webpack_require__(13);
	
	var _UPC2 = _interopRequireWildcard(_UPC);
	
	var _ITF = __webpack_require__(14);
	
	var _ITF2 = _interopRequireWildcard(_ITF);
	
	var _ITF14 = __webpack_require__(15);
	
	var _ITF142 = _interopRequireWildcard(_ITF14);
	
	var _CODE39 = __webpack_require__(11);
	
	var _CODE392 = _interopRequireWildcard(_CODE39);
	
	var _CODE128B = __webpack_require__(16);
	
	var _CODE128B2 = _interopRequireWildcard(_CODE128B);
	
	var _CODE128C = __webpack_require__(18);
	
	var _CODE128C2 = _interopRequireWildcard(_CODE128C);
	
	var _Pharmacode = __webpack_require__(19);
	
	var _Pharmacode2 = _interopRequireWildcard(_Pharmacode);
	
	exports['default'] = {
	  EAN: _EAN2['default'],
	  UPC: _UPC2['default'],
	  ITF: _ITF2['default'],
	  ITF14: _ITF142['default'],
	  CODE39: _CODE392['default'],
	  CODE128B: _CODE128B2['default'],
	  CODE128C: _CODE128C2['default'],
	  Pharmacode: _Pharmacode2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	var code39 = [[0, '0', '101000111011101'], [1, '1', '111010001010111'], [2, '2', '101110001010111'], [3, '3', '111011100010101'], [4, '4', '101000111010111'], [5, '5', '111010001110101'], [6, '6', '101110001110101'], [7, '7', '101000101110111'], [8, '8', '111010001011101'], [9, '9', '101110001011101'], [10, 'A', '111010100010111'], [11, 'B', '101110100010111'], [12, 'C', '111011101000101'], [13, 'D', '101011100010111'], [14, 'E', '111010111000101'], [15, 'F', '101110111000101'], [16, 'G', '101010001110111'], [17, 'H', '111010100011101'], [18, 'I', '101110100011101'], [19, 'J', '101011100011101'], [20, 'K', '111010101000111'], [21, 'L', '101110101000111'], [22, 'M', '111011101010001'], [23, 'N', '101011101000111'], [24, 'O', '111010111010001'], [25, 'P', '101110111010001'], [26, 'Q', '101010111000111'], [27, 'R', '111010101110001'], [28, 'S', '101110101110001'], [29, 'T', '101011101110001'], [30, 'U', '111000101010111'], [31, 'V', '100011101010111'], [32, 'W', '111000111010101'], [33, 'X', '100010111010111'], [34, 'Y', '111000101110101'], [35, 'Z', '100011101110101'], [36, '-', '100010101110111'], [37, '.', '111000101011101'], [38, ' ', '100011101011101'], [39, '$', '100010001000101'], [40, '/', '100010001010001'], [41, '+', '100010100010001'], [42, '%', '101000100010001']];
	
	var validRe = /^[0-9a-zA-Z\-\.\ \$\/\+\%]+$/;
	
	var CODE39 = (function () {
	  function CODE39(code) {
	    _classCallCheck(this, CODE39);
	
	    this.code = String(code);
	  }
	
	  _createClass(CODE39, [{
	    key: 'isValid',
	    value: function isValid() {
	      return validRe.test(this.code);
	    }
	  }, {
	    key: 'encode',
	    value: function encode() {
	      var string = this.code.toUpperCase();
	
	      var result = '';
	      result += '1000101110111010';
	      for (var i = 0; i < string.length; i++) {
	        result += this.encodingByChar(string[i]) + '0';
	      }
	      result += '1000101110111010';
	      return result;
	    }
	  }, {
	    key: 'encodingByChar',
	    value: function encodingByChar(char) {
	      for (var i = 0; i < code39.length; i++) {
	        if (code39[i][1] === char) {
	          return code39[i][2];
	        }
	      }
	      return '';
	    }
	  }]);
	
	  return CODE39;
	})();
	
	exports['default'] = CODE39;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	// The L (left) type of encoding
	var Lbinary = {
	  0: '0001101',
	  1: '0011001',
	  2: '0010011',
	  3: '0111101',
	  4: '0100011',
	  5: '0110001',
	  6: '0101111',
	  7: '0111011',
	  8: '0110111',
	  9: '0001011'
	};
	
	// The G type of encoding
	var Gbinary = {
	  0: '0100111',
	  1: '0110011',
	  2: '0011011',
	  3: '0100001',
	  4: '0011101',
	  5: '0111001',
	  6: '0000101',
	  7: '0010001',
	  8: '0001001',
	  9: '0010111'
	};
	
	// The R (right) type of encoding
	var Rbinary = {
	  0: '1110010',
	  1: '1100110',
	  2: '1101100',
	  3: '1000010',
	  4: '1011100',
	  5: '1001110',
	  6: '1010000',
	  7: '1000100',
	  8: '1001000',
	  9: '1110100'
	};
	
	// The left side structure in EAN-13
	var EANstruct = {
	  0: 'LLLLLL',
	  1: 'LLGLGG',
	  2: 'LLGGLG',
	  3: 'LLGGGL',
	  4: 'LGLLGG',
	  5: 'LGGLLG',
	  6: 'LGGGLL',
	  7: 'LGLGLG',
	  8: 'LGLGGL',
	  9: 'LGGLGL'
	};
	
	// Valid EAN code
	var validRe = /^[0-9]{13}$/;
	// The start bits
	var startBin = '101';
	// The end bits
	var endBin = '101';
	// The middle bits
	var middleBin = '01010';
	
	var EAN = (function () {
	  function EAN(code) {
	    _classCallCheck(this, EAN);
	
	    this.code = String(code);
	  }
	
	  _createClass(EAN, [{
	    key: 'isValid',
	    value: function isValid() {
	      return validRe.test(this.code) && Number(this.code[12]) === this.checksum();
	    }
	  }, {
	    key: 'checksum',
	    value: function checksum() {
	      var result = 0;
	
	      for (var i = 0; i < 12; i += 2) {
	        result += Number(this.code[i]);
	      }
	      for (var i = 1; i < 12; i += 2) {
	        result += Number(this.code[i]) * 3;
	      }
	
	      return (10 - result % 10) % 10;
	    }
	  }, {
	    key: 'encode',
	
	    // Create the binary representation of the EAN code
	    // number needs to be a string
	    value: function encode() {
	      // Create the return variable
	      var result = '';
	
	      // Get the first digit (for later determination of the encoding type)
	      var firstDigit = this.code[0];
	
	      // Get the number to be encoded on the left side of the EAN code
	      var leftSide = this.code.substr(1, 7);
	
	      // Get the number to be encoded on the right side of the EAN code
	      var rightSide = this.code.substr(7, 6);
	
	      // Add the start bits
	      result += startBin;
	
	      // Add the left side
	      result += this.encodeStruct(leftSide, EANstruct[firstDigit]);
	
	      // Add the middle bits
	      result += middleBin;
	
	      // Add the right side
	      result += this.encodeStruct(rightSide, 'RRRRRR');
	
	      // Add the end bits
	      result += endBin;
	
	      return result;
	    }
	  }, {
	    key: 'encodeStruct',
	
	    // Convert a number array to the representing
	    value: function encodeStruct(codePart, struct) {
	      // Create the variable that should be returned at the end of the function
	      var result = '';
	
	      // Loop all the numbers
	      for (var i = 0; i < codePart.length; i++) {
	        // Using the L, G or R encoding and add it to the returning variable
	        if (struct[i] === 'L') {
	          result += Lbinary[codePart[i]];
	        } else if (struct[i] === 'G') {
	          result += Gbinary[codePart[i]];
	        } else if (struct[i] === 'R') {
	          result += Rbinary[codePart[i]];
	        }
	      }
	      return result;
	    }
	  }]);
	
	  return EAN;
	})();
	
	exports['default'] = EAN;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _EAN2 = __webpack_require__(12);
	
	var _EAN3 = _interopRequireWildcard(_EAN2);
	
	var UPC = (function (_EAN) {
	  function UPC(code) {
	    _classCallCheck(this, UPC);
	
	    _get(Object.getPrototypeOf(UPC.prototype), 'constructor', this).call(this, '0' + code);
	  }
	
	  _inherits(UPC, _EAN);
	
	  return UPC;
	})(_EAN3['default']);
	
	exports['default'] = UPC;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	//The structure for the all digits, 1 is wide and 0 is narrow
	var digitStructure = {
	  0: '00110',
	  1: '10001',
	  2: '01001',
	  3: '11000',
	  4: '00101',
	  5: '10100',
	  6: '01100',
	  7: '00011',
	  8: '10010',
	  9: '01010'
	};
	
	// The start bits
	var startBin = '1010';
	// The end bits
	var endBin = '11101';
	
	// Regexp for a valid Inter25 code
	var validRe = /^([0-9][0-9])+$/;
	
	var ITF = (function () {
	  function ITF(code) {
	    _classCallCheck(this, ITF);
	
	    this.code = String(code);
	  }
	
	  _createClass(ITF, [{
	    key: 'isValid',
	    value: function isValid() {
	      return validRe.test(this.code);
	    }
	  }, {
	    key: 'encode',
	    value: function encode() {
	      // Create the variable that should be returned at the end of the function
	      var result = '';
	
	      // Always add the same start bits
	      result += startBin;
	
	      // Calculate all the digit pairs
	      for (var i = 0; i < this.code.length; i += 2) {
	        result += this.calculatePair(this.code.substr(i, 2));
	      }
	
	      // Always add the same end bits
	      result += endBin;
	
	      return result;
	    }
	  }, {
	    key: 'calculatePair',
	    value: function calculatePair(twoNumbers) {
	      var result = '';
	
	      var number1Struct = digitStructure[twoNumbers[0]];
	      var number2Struct = digitStructure[twoNumbers[1]];
	
	      // Take every second bit and add to the result
	      for (var i = 0; i < 5; i++) {
	        result += number1Struct[i] === '1' ? '111' : '1';
	        result += number2Struct[i] === '1' ? '000' : '0';
	      }
	
	      return result;
	    }
	  }]);
	
	  return ITF;
	})();
	
	exports['default'] = ITF;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _ITF2 = __webpack_require__(14);
	
	var _ITF3 = _interopRequireWildcard(_ITF2);
	
	var validRe = /^[0-9]{13,14}$/;
	
	var ITF14 = (function (_ITF) {
	  function ITF14(code) {
	    _classCallCheck(this, ITF14);
	
	    _get(Object.getPrototypeOf(ITF14.prototype), 'constructor', this).call(this, code);
	
	    if (code.length === 13) {
	      this.code += this.checksum();
	    }
	  }
	
	  _inherits(ITF14, _ITF);
	
	  _createClass(ITF14, [{
	    key: 'isValid',
	    value: function isValid() {
	      return _get(Object.getPrototypeOf(ITF14.prototype), 'isValid', this).call(this) && validRe.test(this.code) && Number(this.code[13]) === this.checksum();
	    }
	  }, {
	    key: 'checksum',
	    value: function checksum() {
	      var result = 0;
	
	      for (var i = 0; i < 13; i++) {
	        result += Number(this.code[i]) * (3 - i % 2 * 2);
	      }
	
	      return 10 - result % 10;
	    }
	  }]);
	
	  return ITF14;
	})(_ITF3['default']);
	
	exports['default'] = ITF14;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _CODE1282 = __webpack_require__(17);
	
	var _CODE1283 = _interopRequireWildcard(_CODE1282);
	
	var CODE128B = (function (_CODE128) {
	  function CODE128B(code) {
	    _classCallCheck(this, CODE128B);
	
	    _get(Object.getPrototypeOf(CODE128B.prototype), 'constructor', this).call(this, code);
	    this.startCode = 104;
	  }
	
	  _inherits(CODE128B, _CODE128);
	
	  _createClass(CODE128B, [{
	    key: 'encodeClass',
	    value: function encodeClass() {
	      var result = '';
	      for (var i = 0; i < this.code.length; i++) {
	        result += _get(Object.getPrototypeOf(CODE128B.prototype), 'encodingByChar', this).call(this, this.code[i]);
	      }
	      return result;
	    }
	  }, {
	    key: 'checksum',
	    value: function checksum() {
	      var sum = 0;
	      for (var i = 0; i < this.code.length; i++) {
	        sum += _get(Object.getPrototypeOf(CODE128B.prototype), 'weightByCharacter', this).call(this, this.code[i]) * (i + 1);
	      }
	      return (sum + this.startCode) % 103;
	    }
	  }]);
	
	  return CODE128B;
	})(_CODE1283['default']);
	
	exports['default'] = CODE128B;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	// Data for each character
	// The last characters will not be encoded but are used for error correction
	var code128b = [[' ', '11011001100', 0], ['!', '11001101100', 1], ['"', '11001100110', 2], ['#', '10010011000', 3], ['$', '10010001100', 4], ['%', '10001001100', 5], ['&', '10011001000', 6], ['\'', '10011000100', 7], ['(', '10001100100', 8], [')', '11001001000', 9], ['*', '11001000100', 10], ['+', '11000100100', 11], [',', '10110011100', 12], ['-', '10011011100', 13], ['.', '10011001110', 14], ['/', '10111001100', 15], ['0', '10011101100', 16], ['1', '10011100110', 17], ['2', '11001110010', 18], ['3', '11001011100', 19], ['4', '11001001110', 20], ['5', '11011100100', 21], ['6', '11001110100', 22], ['7', '11101101110', 23], ['8', '11101001100', 24], ['9', '11100101100', 25], [':', '11100100110', 26], [';', '11101100100', 27], ['<', '11100110100', 28], ['=', '11100110010', 29], ['>', '11011011000', 30], ['?', '11011000110', 31], ['@', '11000110110', 32], ['A', '10100011000', 33], ['B', '10001011000', 34], ['C', '10001000110', 35], ['D', '10110001000', 36], ['E', '10001101000', 37], ['F', '10001100010', 38], ['G', '11010001000', 39], ['H', '11000101000', 40], ['I', '11000100010', 41], ['J', '10110111000', 42], ['K', '10110001110', 43], ['L', '10001101110', 44], ['M', '10111011000', 45], ['N', '10111000110', 46], ['O', '10001110110', 47], ['P', '11101110110', 48], ['Q', '11010001110', 49], ['R', '11000101110', 50], ['S', '11011101000', 51], ['T', '11011100010', 52], ['U', '11011101110', 53], ['V', '11101011000', 54], ['W', '11101000110', 55], ['X', '11100010110', 56], ['Y', '11101101000', 57], ['Z', '11101100010', 58], ['[', '11100011010', 59], ['\\', '11101111010', 60], [']', '11001000010', 61], ['^', '11110001010', 62], ['_', '10100110000', 63], ['`', '10100001100', 64], ['a', '10010110000', 65], ['b', '10010000110', 66], ['c', '10000101100', 67], ['d', '10000100110', 68], ['e', '10110010000', 69], ['f', '10110000100', 70], ['g', '10011010000', 71], ['h', '10011000010', 72], ['i', '10000110100', 73], ['j', '10000110010', 74], ['k', '11000010010', 75], ['l', '11001010000', 76], ['m', '11110111010', 77], ['n', '11000010100', 78], ['o', '10001111010', 79], ['p', '10100111100', 80], ['q', '10010111100', 81], ['r', '10010011110', 82], ['s', '10111100100', 83], ['t', '10011110100', 84], ['u', '10011110010', 85], ['v', '11110100100', 86], ['w', '11110010100', 87], ['x', '11110010010', 88], ['y', '11011011110', 89], ['z', '11011110110', 90], ['{', '11110110110', 91], ['|', '10101111000', 92], ['}', '10100011110', 93], ['~', '10001011110', 94], [String.fromCharCode(127), '10111101000', 95], [String.fromCharCode(128), '10111100010', 96], [String.fromCharCode(129), '11110101000', 97], [String.fromCharCode(130), '11110100010', 98], [String.fromCharCode(131), '10111011110', 99], [String.fromCharCode(132), '10111101110', 100], [String.fromCharCode(133), '11101011110', 101], [String.fromCharCode(134), '11110101110', 102],
	//Start codes
	[String.fromCharCode(135), '11010000100', 103], [String.fromCharCode(136), '11010010000', 104], [String.fromCharCode(137), '11010011100', 105]];
	
	var endBin = '1100011101011';
	var validRe = /^[!-~ ]+$/;
	
	var CODE128 = (function () {
	  function CODE128(code) {
	    _classCallCheck(this, CODE128);
	
	    this.code = String(code);
	  }
	
	  _createClass(CODE128, [{
	    key: 'isValid',
	    value: function isValid() {
	      return validRe.test(this.code);
	    }
	  }, {
	    key: 'encode',
	    value: function encode(encodeFn, startCode, checksumFn) {
	      var result = '';
	
	      //Add the start bits
	      result += this.encodingById(this.startCode);
	
	      //Add the encoded bits
	      result += this.encodeClass();
	
	      //Add the checksum
	      result += this.encodingById(this.checksum());
	
	      //Add the end bits
	      result += endBin;
	
	      return result;
	    }
	  }, {
	    key: 'encodingById',
	    value: function encodingById(id) {
	      for (var i = 0; i < code128b.length; i++) {
	        if (code128b[i][2] === id) {
	          return code128b[i][1];
	        }
	      }
	      return '';
	    }
	  }, {
	    key: 'weightByCharacter',
	    value: function weightByCharacter(char) {
	      for (var i = 0; i < code128b.length; i++) {
	        if (code128b[i][0] === char) {
	          return code128b[i][2];
	        }
	      }
	      return 0;
	    }
	  }, {
	    key: 'encodingByChar',
	    value: function encodingByChar(char) {
	      for (var i = 0; i < code128b.length; i++) {
	        if (code128b[i][0] === char) {
	          return code128b[i][1];
	        }
	      }
	      return '';
	    }
	  }]);
	
	  return CODE128;
	})();
	
	exports['default'] = CODE128;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _CODE1282 = __webpack_require__(17);
	
	var _CODE1283 = _interopRequireWildcard(_CODE1282);
	
	var CODE128C = (function (_CODE128) {
	  function CODE128C(code) {
	    _classCallCheck(this, CODE128C);
	
	    _get(Object.getPrototypeOf(CODE128C.prototype), 'constructor', this).call(this, code);
	    this.code = this.code.replace(/ /g, '');
	    this.startCode = 105;
	  }
	
	  _inherits(CODE128C, _CODE128);
	
	  _createClass(CODE128C, [{
	    key: 'encodeClass',
	    value: function encodeClass() {
	      var result = '';
	      for (var i = 0; i < this.code.length; i += 2) {
	        result += _get(Object.getPrototypeOf(CODE128C.prototype), 'encodingById', this).call(this, Number(this.code.substr(i, 2)));
	      }
	      return result;
	    }
	  }, {
	    key: 'checksum',
	    value: function checksum() {
	      var sum = 0;
	      var w = 1;
	      for (var i = 0; i < this.code.length; i += 2) {
	        sum += Number(this.code.substr(i, 2)) * w;
	        w++;
	      }
	      return (sum + this.startCode) % 103;
	    }
	  }]);
	
	  return CODE128C;
	})(_CODE1283['default']);
	
	exports['default'] = CODE128C;
	module.exports = exports['default'];

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _interopRequireWildcard = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };
	
	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _repeat = __webpack_require__(20);
	
	var _repeat2 = _interopRequireWildcard(_repeat);
	
	var Pharmacode = (function () {
	  function Pharmacode(code) {
	    _classCallCheck(this, Pharmacode);
	
	    this.code = Number(code);
	  }
	
	  _createClass(Pharmacode, [{
	    key: 'isValid',
	    value: function isValid() {
	      return this.code >= 3 && this.code <= 131070;
	    }
	  }, {
	    key: '_calcZeros',
	
	    // A helper function to calculate the zeros at the end of a string
	    value: function _calcZeros(code) {
	      var i = code.length - 1;
	      var zeros = 0;
	      while (code[i] === '0' || i < 0) {
	        zeros++;
	        i--;
	      }
	      return zeros;
	    }
	  }, {
	    key: 'encodeBinary',
	    value: function encodeBinary(code, state) {
	      if (code.length === 0) {
	        return '';
	      }var generated = undefined;
	      var nextState = false;
	      var nZeros = this._calcZeros(code);
	
	      if (nZeros === 0) {
	        generated = state ? '001' : '00111';
	        nextState = state;
	      } else {
	        generated = _repeat2['default']('001', nZeros - (state ? 1 : 0));
	        generated += '00111';
	      }
	      return this.encodeBinary(code.substr(0, code.length - nZeros - 1), nextState) + generated;
	    }
	  }, {
	    key: 'encode',
	    value: function encode() {
	      return this.encodeBinary(this.code.toString(2), true).substr(2);
	    }
	  }]);
	
	  return Pharmacode;
	})();
	
	exports['default'] = Pharmacode;
	module.exports = exports['default'];

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(21);
	module.exports = __webpack_require__(6).core.String.repeat;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var $def = __webpack_require__(5);
	
	$def($def.P, 'String', {
	  // 21.1.3.13 String.prototype.repeat(count)
	  repeat: __webpack_require__(22)
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(6);
	
	module.exports = function repeat(count){
	  var str = String($.assertDefined(this))
	    , res = ''
	    , n   = $.toInteger(count);
	  if(n < 0 || n == Infinity)throw RangeError("Count can't be negative");
	  for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
	  return res;
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	
	var Canvas = module.exports = function Canvas (w, h) {
	  var canvas = document.createElement('canvas')
	  canvas.width = w || 300
	  canvas.height = h || 150
	  return canvas
	}
	
	Canvas.Image = function () {
	  var img = document.createElement('img')
	  return img
	}
	
	
	


/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBjOWFkNWFlN2YxNmIyMGIwNDBlZSIsIndlYnBhY2s6Ly8vLi9saWIvYW5ndWxhci1iYXJjb2RlLWlvLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZncuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMzkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2Vhbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvdXBjLmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9pdGYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2l0ZjE0LmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMTI4Yi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvY29kZTEyOC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvY29kZTEyOGMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL3BoYXJtYWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N0cmluZy9yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9+L2NhbnZhcy1icm93c2VyaWZ5L2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7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QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUN6REE7O0FBRUEsK0NBQThDLHVDQUF1QyxrQkFBa0I7O0FBRXZHLHlEQUF3RCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRTlKLGtDQUFpQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWxqQjtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUN0RUE7QUFDQSw0RDs7Ozs7O0FDREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7QUNMRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLE1BQU07QUFDYjtBQUNBLEc7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYW5ndWxhci1pby1iYXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXJJb0JhcmNvZGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhbmd1bGFySW9CYXJjb2RlXCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYzlhZDVhZTdmMTZiMjBiMDQwZWVcbiAqKi8iLCJcbid1c2Ugc3RyaWN0J1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKSxcbiAgICBpb0JhcmNvZGUgPSByZXF1aXJlKCdpby1iYXJjb2RlJylcblxubW9kdWxlLmV4cG9ydHMgPVxuYW5ndWxhci5tb2R1bGUoJ2FuZ3VsYXItaW8tYmFyY29kZScsIFtdKVxuXG4vKipcbiAqIEBuZ2RvYyBjb25zdGFudFxuICogQG5hbWUgJGlvQmFyY29kZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogRXhwb3J0IG9mIGBpby1iYXJjb2RlYCBtb2R1bGVcbiAqXG4gKi9cbiAgLmNvbnN0YW50KCckaW9CYXJjb2RlJywgaW9CYXJjb2RlKVxuXG4vKipcbiAqIEBuZ2RvYyBjb25zdGFudFxuICogQG5hbWUgSU9fQkFSQ09ERV9UWVBFU1xuICpcbiAqIEBkZXNjcmlwdGlvblxuICogQXJyYXkgb2YgYmFyY29kZSB0eXBlcyBzdXBwb3J0ZWRcbiAqXG4gKi9cbiAgLmNvbnN0YW50KCdJT19CQVJDT0RFX1RZUEVTJywgW1xuICAgICdFQU4nLFxuICAgICdVUEMnLFxuICAgICdJVEYnLFxuICAgICdJVEYxNCcsXG4gICAgJ0NPREUzOScsXG4gICAgJ0NPREUxMjhCJyxcbiAgICAnQ09ERTEyOEMnLFxuICAgICdQaGFybWFjb2RlJ1xuICBdKVxuXG4vKipcbiAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAqIEBuYW1lIGlvQmFyY29kZVxuICogQHJlc3RyaWN0IEVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gY29kZSBUaGUgc3RyaW5nIHRvIGVuY29kZVxuICogQHBhcmFtIHtzdHJpbmd9IHR5cGUgVGhlIHR5cGUgb2YgYmFyY29kZSwgY2FuIGJlOiBDT0RFMTI4QiwgQ09ERTEyOEMsIEVBTiwgVVBDLCBDT0RFMzksIElURiwgSVRGMTQsIFBoYXJtYWNvZGVcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIEFkZGl0aW9uYWwgZm9ybWF0dGluZyBvcHRpb25zLiBTZWUgaW8tYmFyY29kZS5cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFJlbmRlciBhIGJhcmNvZGUgdXNpbmcgaW8tYmFyY29kZVxuICpcbiAqIEBleGFtcGxlXG4gICA8aW8tYmFyY29kZSBjb2RlPVwiMTIzNDU2Nzg5OTk5XCIgdHlwZT1cIlVQQ1wiPjwvaW8tYmFyY29kZT5cbiAqXG4gKi9cbiAgLmRpcmVjdGl2ZSgnaW9CYXJjb2RlJywgWyckaW9CYXJjb2RlJywgZnVuY3Rpb24gKCRpb0JhcmNvZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiAnPGltZyAvPicsXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgY29kZTogJ0AnLFxuICAgICAgICB0eXBlOiAnQCcsXG4gICAgICAgIG9wdGlvbnM6ICc9J1xuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgc2NvcGUuJHdhdGNoR3JvdXAoW1xuICAgICAgICAgICdjb2RlJyxcbiAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgJ29wdGlvbnMnXG4gICAgICAgIF0sIHJlbmRlcilcbiAgICAgICAgc2NvcGUuJHdhdGNoKCdvcHRpb25zJywgcmVuZGVyLCB0cnVlKVxuXG4gICAgICAgIGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgICAgICAgaWYgKCFpb0JhcmNvZGVbc2NvcGUudHlwZV0pIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignSW52YWxpZCBiYXJjb2RlIHR5cGU6ICcgKyBzY29wZS50eXBlKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghc2NvcGUuY29kZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKCdObyBjb2RlIHByb3ZpZGVkJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjYW52YXMgPSAkaW9CYXJjb2RlW3Njb3BlLnR5cGVdKHNjb3BlLmNvZGUsIHNjb3BlLm9wdGlvbnMpXG4gICAgICAgICAgZWxlbWVudC5hdHRyKCdzcmMnLCBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfV0pXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vbGliL2FuZ3VsYXItYmFyY29kZS1pby5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbicpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfYXNzaWduKTtcblxudmFyIF9lbmNvZGluZ3MgPSByZXF1aXJlKCcuL2VuY29kaW5ncycpO1xuXG52YXIgX2VuY29kaW5nczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfZW5jb2RpbmdzKTtcblxudmFyIF9DYW52YXMgPSByZXF1aXJlKCdjYW52YXMtYnJvd3NlcmlmeScpO1xuXG52YXIgX0NhbnZhczIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfQ2FudmFzKTtcblxudmFyIGFwaSA9IHt9O1xuXG52YXIgX2xvb3AgPSBmdW5jdGlvbiAoX25hbWUpIHtcblx0YXBpW19uYW1lXSA9IGZ1bmN0aW9uICgpIHtcblx0XHRmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuXHRcdFx0YXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZ2VuZXJhdGVCYXJjb2RlRGF0YVVyaS5hcHBseSh1bmRlZmluZWQsIFtfZW5jb2RpbmdzMlsnZGVmYXVsdCddW19uYW1lXV0uY29uY2F0KGFyZ3MpKTtcblx0fTtcbn07XG5cbi8qIGVzbGludCBuby1sb29wLWZ1bmM6MCAqL1xuZm9yICh2YXIgX25hbWUgaW4gX2VuY29kaW5nczJbJ2RlZmF1bHQnXSkge1xuXHRfbG9vcChfbmFtZSk7XG59XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFwaTtcblxudmFyIGRlZmF1bHRzID0ge1xuXHR3aWR0aDogMixcblx0aGVpZ2h0OiAxMDAsXG5cdHF1aXRlOiAxMCxcblx0ZGlzcGxheVZhbHVlOiBmYWxzZSxcblx0Zm9udDogJ21vbm9zcGFjZScsXG5cdHRleHRBbGlnbjogJ2NlbnRlcicsXG5cdGZvbnRTaXplOiAxMixcblx0YmFja2dyb3VuZENvbG9yOiAnJyxcblx0bGluZUNvbG9yOiAnIzAwMCdcbn07XG5cbmZ1bmN0aW9uIF9kcmF3QmFyY29kZVRleHQodGV4dCwgY2FudmFzLCBvcHRzKSB7XG5cdHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcblx0dmFyIHggPSB1bmRlZmluZWQsXG5cdCAgICB5ID0gdW5kZWZpbmVkO1xuXG5cdHkgPSBvcHRzLmhlaWdodDtcblxuXHRjdHguZm9udCA9ICcnICsgb3B0cy5mb250U2l6ZSArICdweCAnICsgb3B0cy5mb250O1xuXHRjdHgudGV4dEJhc2VsaW5lID0gJ2JvdHRvbSc7XG5cdGN0eC50ZXh0QmFzZWxpbmUgPSAndG9wJztcblxuXHRpZiAob3B0cy50ZXh0QWxpZ24gPT09ICdsZWZ0Jykge1xuXHRcdHggPSBvcHRzLnF1aXRlO1xuXHRcdGN0eC50ZXh0QWxpZ24gPSAnbGVmdCc7XG5cdH0gZWxzZSBpZiAob3B0cy50ZXh0QWxpZ24gPT09ICdyaWdodCcpIHtcblx0XHR4ID0gY2FudmFzLndpZHRoIC0gb3B0cy5xdWl0ZTtcblx0XHRjdHgudGV4dEFsaWduID0gJ3JpZ2h0Jztcblx0fSBlbHNlIHtcblx0XHR4ID0gY2FudmFzLndpZHRoIC8gMjtcblx0XHRjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG5cdH1cblxuXHRjdHguZmlsbFRleHQodGV4dCwgeCwgeSk7XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlQmFyY29kZURhdGFVcmkoRW5jb2RpbmcsIGNvZGUsIG9wdHMpIHtcblx0LyogZXNsaW50IGNvbXBsZXhpdHk6MCAqL1xuXHRvcHRzID0gX2Fzc2lnbjJbJ2RlZmF1bHQnXSh7fSwgZGVmYXVsdHMsIG9wdHMpO1xuXG5cdHZhciBjYW52YXMgPSBuZXcgX0NhbnZhczJbJ2RlZmF1bHQnXSgpO1xuXHR2YXIgZW5jb2RlciA9IG5ldyBFbmNvZGluZyhjb2RlKTtcblxuXHQvLyBBYm9ydCBpZiB0aGUgYmFyY29kZSBmb3JtYXQgZG9lcyBub3Qgc3VwcG9ydCB0aGUgY29udGVudFxuXHRpZiAoIWVuY29kZXIuaXNWYWxpZCgpKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCdDb250ZW50IGlzIG5vdCBzdXBwb3J0ZWQgYnkgdGhlIGVuY29kaW5nJyk7XG5cdH1cblxuXHQvLyBFbmNvZGUgdGhlIGNvbnRlbnRcblx0dmFyIGJpbmFyeVN0cmluZyA9IGVuY29kZXIuZW5jb2RlKCk7XG5cblx0Ly8gR2V0IHRoZSBjYW52YXMgY29udGV4dFxuXHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cblx0Ly8gU2V0IHRoZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBiYXJjb2RlXG5cdGNhbnZhcy53aWR0aCA9IGJpbmFyeVN0cmluZy5sZW5ndGggKiBvcHRzLndpZHRoICsgMiAqIG9wdHMucXVpdGU7XG5cblx0Ly8gU2V0IGV4dHJhIGhlaWdodCBpZiB0aGUgdmFsdWUgaXMgZGlzcGxheWVkIHVuZGVyIHRoZSBiYXJjb2RlLlxuXHRjYW52YXMuaGVpZ2h0ID0gb3B0cy5oZWlnaHQgKyAob3B0cy5kaXNwbGF5VmFsdWUgPyBvcHRzLmZvbnRTaXplICogMS4zIDogMCk7XG5cblx0Ly8gUGFpbnQgdGhlIGNhbnZhc1xuXHRjdHguY2xlYXJSZWN0KDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cblx0aWYgKG9wdHMuYmFja2dyb3VuZENvbG9yKSB7XG5cdFx0Y3R4LmZpbGxTdHlsZSA9IG9wdHMuYmFja2dyb3VuZENvbG9yO1xuXHRcdGN0eC5maWxsUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXHR9XG5cblx0Ly8gQ2hhbmdlIHRvIGxpbmVDb2xvciB0byBwYWludCB0aGUgbGluZXNcblx0Y3R4LmZpbGxTdHlsZSA9IG9wdHMubGluZUNvbG9yO1xuXG5cdC8vIENyZWF0ZXMgdGhlIGJhcmNvZGUgb3V0IG9mIHRoZSBiaW5hcnkgc3RyaW5nXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgYmluYXJ5U3RyaW5nLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHggPSBpICogb3B0cy53aWR0aCArIG9wdHMucXVpdGU7XG5cdFx0aWYgKGJpbmFyeVN0cmluZ1tpXSA9PT0gJzEnKSB7XG5cdFx0XHRjdHguZmlsbFJlY3QoeCwgMCwgb3B0cy53aWR0aCwgb3B0cy5oZWlnaHQpO1xuXHRcdH1cblx0fVxuXG5cdC8vIEFkZCB2YWx1ZSBiZWxvdyBpZiBlbmFibGVkXG5cdGlmIChvcHRzLmRpc3BsYXlWYWx1ZSkge1xuXHRcdF9kcmF3QmFyY29kZVRleHQoY29kZSwgY2FudmFzLCBvcHRzKTtcblx0fVxuXG5cdHJldHVybiBjYW52YXM7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvJCcpLmNvcmUuT2JqZWN0LmFzc2lnbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRkZWYgPSByZXF1aXJlKCcuLyQuZGVmJyk7XG4kZGVmKCRkZWYuUywgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vJC5hc3NpZ24nKX0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBnbG9iYWwgICAgID0gJC5nXG4gICwgY29yZSAgICAgICA9ICQuY29yZVxuICAsIGlzRnVuY3Rpb24gPSAkLmlzRnVuY3Rpb247XG5mdW5jdGlvbiBjdHgoZm4sIHRoYXQpe1xuICByZXR1cm4gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn1cbi8vIHR5cGUgYml0bWFwXG4kZGVmLkYgPSAxOyAgLy8gZm9yY2VkXG4kZGVmLkcgPSAyOyAgLy8gZ2xvYmFsXG4kZGVmLlMgPSA0OyAgLy8gc3RhdGljXG4kZGVmLlAgPSA4OyAgLy8gcHJvdG9cbiRkZWYuQiA9IDE2OyAvLyBiaW5kXG4kZGVmLlcgPSAzMjsgLy8gd3JhcFxuZnVuY3Rpb24gJGRlZih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIga2V5LCBvd24sIG91dCwgZXhwXG4gICAgLCBpc0dsb2JhbCA9IHR5cGUgJiAkZGVmLkdcbiAgICAsIGlzUHJvdG8gID0gdHlwZSAmICRkZWYuUFxuICAgICwgdGFyZ2V0ICAgPSBpc0dsb2JhbCA/IGdsb2JhbCA6IHR5cGUgJiAkZGVmLlNcbiAgICAgICAgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KS5wcm90b3R5cGVcbiAgICAsIGV4cG9ydHMgID0gaXNHbG9iYWwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KTtcbiAgaWYoaXNHbG9iYWwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICEodHlwZSAmICRkZWYuRikgJiYgdGFyZ2V0ICYmIGtleSBpbiB0YXJnZXQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBpZihpc0dsb2JhbCAmJiAhaXNGdW5jdGlvbih0YXJnZXRba2V5XSkpZXhwID0gc291cmNlW2tleV07XG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICBlbHNlIGlmKHR5cGUgJiAkZGVmLkIgJiYgb3duKWV4cCA9IGN0eChvdXQsIGdsb2JhbCk7XG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICBlbHNlIGlmKHR5cGUgJiAkZGVmLlcgJiYgdGFyZ2V0W2tleV0gPT0gb3V0KSFmdW5jdGlvbihDKXtcbiAgICAgIGV4cCA9IGZ1bmN0aW9uKHBhcmFtKXtcbiAgICAgICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBDID8gbmV3IEMocGFyYW0pIDogQyhwYXJhbSk7XG4gICAgICB9O1xuICAgICAgZXhwLnByb3RvdHlwZSA9IEMucHJvdG90eXBlO1xuICAgIH0ob3V0KTtcbiAgICBlbHNlIGV4cCA9IGlzUHJvdG8gJiYgaXNGdW5jdGlvbihvdXQpID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0XG4gICAgZXhwb3J0c1trZXldID0gZXhwO1xuICAgIGlmKGlzUHJvdG8pKGV4cG9ydHMucHJvdG90eXBlIHx8IChleHBvcnRzLnByb3RvdHlwZSA9IHt9KSlba2V5XSA9IG91dDtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSAkZGVmO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcbnZhciBnbG9iYWwgPSB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpXG4gICwgY29yZSAgID0ge31cbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eVxuICAsIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHlcbiAgLCBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vclxuICAsIG1heCAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICA9IE1hdGgubWluO1xuLy8gVGhlIGVuZ2luZSB3b3JrcyBmaW5lIHdpdGggZGVzY3JpcHRvcnM/IFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHkuXG52YXIgREVTQyA9ICEhZnVuY3Rpb24oKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDI7IH19KS5hID09IDI7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn0oKTtcbnZhciBoaWRlID0gY3JlYXRlRGVmaW5lcigxKTtcbi8vIDcuMS40IFRvSW50ZWdlclxuZnVuY3Rpb24gdG9JbnRlZ2VyKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59XG5mdW5jdGlvbiBkZXNjKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn1cbmZ1bmN0aW9uIHNpbXBsZVNldChvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufVxuZnVuY3Rpb24gY3JlYXRlRGVmaW5lcihiaXRtYXApe1xuICByZXR1cm4gREVTQyA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gICAgcmV0dXJuICQuc2V0RGVzYyhvYmplY3QsIGtleSwgZGVzYyhiaXRtYXAsIHZhbHVlKSk7XG4gIH0gOiBzaW1wbGVTZXQ7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGl0KXtcbiAgcmV0dXJuIGl0ICE9PSBudWxsICYmICh0eXBlb2YgaXQgPT0gJ29iamVjdCcgfHwgdHlwZW9mIGl0ID09ICdmdW5jdGlvbicpO1xufVxuZnVuY3Rpb24gaXNGdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ2Z1bmN0aW9uJztcbn1cbmZ1bmN0aW9uIGFzc2VydERlZmluZWQoaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59XG5cbnZhciAkID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLyQuZncnKSh7XG4gIGc6IGdsb2JhbCxcbiAgY29yZTogY29yZSxcbiAgaHRtbDogZ2xvYmFsLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgLy8gaHR0cDovL2pzcGVyZi5jb20vY29yZS1qcy1pc29iamVjdFxuICBpc09iamVjdDogICBpc09iamVjdCxcbiAgaXNGdW5jdGlvbjogaXNGdW5jdGlvbixcbiAgdGhhdDogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgLy8gNy4xLjQgVG9JbnRlZ2VyXG4gIHRvSW50ZWdlcjogdG9JbnRlZ2VyLFxuICAvLyA3LjEuMTUgVG9MZW5ndGhcbiAgdG9MZW5ndGg6IGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxuICB9LFxuICB0b0luZGV4OiBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gICAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG4gIH0sXG4gIGhhczogZnVuY3Rpb24oaXQsIGtleSl7XG4gICAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG4gIH0sXG4gIGNyZWF0ZTogICAgIE9iamVjdC5jcmVhdGUsXG4gIGdldFByb3RvOiAgIE9iamVjdC5nZXRQcm90b3R5cGVPZixcbiAgREVTQzogICAgICAgREVTQyxcbiAgZGVzYzogICAgICAgZGVzYyxcbiAgZ2V0RGVzYzogICAgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgc2V0RGVzYzogICAgZGVmaW5lUHJvcGVydHksXG4gIHNldERlc2NzOiAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzLFxuICBnZXRLZXlzOiAgICBPYmplY3Qua2V5cyxcbiAgZ2V0TmFtZXM6ICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMsXG4gIGdldFN5bWJvbHM6IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gIGFzc2VydERlZmluZWQ6IGFzc2VydERlZmluZWQsXG4gIC8vIER1bW15LCBmaXggZm9yIG5vdCBhcnJheS1saWtlIEVTMyBzdHJpbmcgaW4gZXM1IG1vZHVsZVxuICBFUzVPYmplY3Q6IE9iamVjdCxcbiAgdG9PYmplY3Q6IGZ1bmN0aW9uKGl0KXtcbiAgICByZXR1cm4gJC5FUzVPYmplY3QoYXNzZXJ0RGVmaW5lZChpdCkpO1xuICB9LFxuICBoaWRlOiBoaWRlLFxuICBkZWY6IGNyZWF0ZURlZmluZXIoMCksXG4gIHNldDogZ2xvYmFsLlN5bWJvbCA/IHNpbXBsZVNldCA6IGhpZGUsXG4gIGVhY2g6IFtdLmZvckVhY2hcbn0pO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZWYgKi9cbmlmKHR5cGVvZiBfX2UgIT0gJ3VuZGVmaW5lZCcpX19lID0gY29yZTtcbmlmKHR5cGVvZiBfX2cgIT0gJ3VuZGVmaW5lZCcpX19nID0gZ2xvYmFsO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkKXtcbiAgJC5GVyAgID0gZmFsc2U7XG4gICQucGF0aCA9ICQuY29yZTtcbiAgcmV0dXJuICQ7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmZ3LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgICAgICAgID0gcmVxdWlyZSgnLi8kJylcbiAgLCBlbnVtS2V5cyA9IHJlcXVpcmUoJy4vJC5lbnVtLWtleXMnKTtcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXtcbi8qIGVzbGludC1lbmFibGUgbm8tdW51c2VkLXZhcnMgKi9cbiAgdmFyIFQgPSBPYmplY3QoJC5hc3NlcnREZWZpbmVkKHRhcmdldCkpXG4gICAgLCBsID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaSA9IDE7XG4gIHdoaWxlKGwgPiBpKXtcbiAgICB2YXIgUyAgICAgID0gJC5FUzVPYmplY3QoYXJndW1lbnRzW2krK10pXG4gICAgICAsIGtleXMgICA9IGVudW1LZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopVFtrZXkgPSBrZXlzW2orK11dID0gU1trZXldO1xuICB9XG4gIHJldHVybiBUO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBrZXlzICAgICAgID0gJC5nZXRLZXlzKGl0KVxuICAgICwgZ2V0RGVzYyAgICA9ICQuZ2V0RGVzY1xuICAgICwgZ2V0U3ltYm9scyA9ICQuZ2V0U3ltYm9scztcbiAgaWYoZ2V0U3ltYm9scykkLmVhY2guY2FsbChnZXRTeW1ib2xzKGl0KSwgZnVuY3Rpb24oa2V5KXtcbiAgICBpZihnZXREZXNjKGl0LCBrZXkpLmVudW1lcmFibGUpa2V5cy5wdXNoKGtleSk7XG4gIH0pO1xuICByZXR1cm4ga2V5cztcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZW51bS1rZXlzLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0VBTiA9IHJlcXVpcmUoJy4vZWFuJyk7XG5cbnZhciBfRUFOMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9FQU4pO1xuXG52YXIgX1VQQyA9IHJlcXVpcmUoJy4vdXBjJyk7XG5cbnZhciBfVVBDMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9VUEMpO1xuXG52YXIgX0lURiA9IHJlcXVpcmUoJy4vaXRmJyk7XG5cbnZhciBfSVRGMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9JVEYpO1xuXG52YXIgX0lURjE0ID0gcmVxdWlyZSgnLi9pdGYxNCcpO1xuXG52YXIgX0lURjE0MiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9JVEYxNCk7XG5cbnZhciBfQ09ERTM5ID0gcmVxdWlyZSgnLi9jb2RlMzknKTtcblxudmFyIF9DT0RFMzkyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0NPREUzOSk7XG5cbnZhciBfQ09ERTEyOEIgPSByZXF1aXJlKCcuL2NvZGUxMjhiJyk7XG5cbnZhciBfQ09ERTEyOEIyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0NPREUxMjhCKTtcblxudmFyIF9DT0RFMTI4QyA9IHJlcXVpcmUoJy4vY29kZTEyOGMnKTtcblxudmFyIF9DT0RFMTI4QzIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfQ09ERTEyOEMpO1xuXG52YXIgX1BoYXJtYWNvZGUgPSByZXF1aXJlKCcuL3BoYXJtYWNvZGUnKTtcblxudmFyIF9QaGFybWFjb2RlMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9QaGFybWFjb2RlKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0ge1xuICBFQU46IF9FQU4yWydkZWZhdWx0J10sXG4gIFVQQzogX1VQQzJbJ2RlZmF1bHQnXSxcbiAgSVRGOiBfSVRGMlsnZGVmYXVsdCddLFxuICBJVEYxNDogX0lURjE0MlsnZGVmYXVsdCddLFxuICBDT0RFMzk6IF9DT0RFMzkyWydkZWZhdWx0J10sXG4gIENPREUxMjhCOiBfQ09ERTEyOEIyWydkZWZhdWx0J10sXG4gIENPREUxMjhDOiBfQ09ERTEyOEMyWydkZWZhdWx0J10sXG4gIFBoYXJtYWNvZGU6IF9QaGFybWFjb2RlMlsnZGVmYXVsdCddXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xudmFyIGNvZGUzOSA9IFtbMCwgJzAnLCAnMTAxMDAwMTExMDExMTAxJ10sIFsxLCAnMScsICcxMTEwMTAwMDEwMTAxMTEnXSwgWzIsICcyJywgJzEwMTExMDAwMTAxMDExMSddLCBbMywgJzMnLCAnMTExMDExMTAwMDEwMTAxJ10sIFs0LCAnNCcsICcxMDEwMDAxMTEwMTAxMTEnXSwgWzUsICc1JywgJzExMTAxMDAwMTExMDEwMSddLCBbNiwgJzYnLCAnMTAxMTEwMDAxMTEwMTAxJ10sIFs3LCAnNycsICcxMDEwMDAxMDExMTAxMTEnXSwgWzgsICc4JywgJzExMTAxMDAwMTAxMTEwMSddLCBbOSwgJzknLCAnMTAxMTEwMDAxMDExMTAxJ10sIFsxMCwgJ0EnLCAnMTExMDEwMTAwMDEwMTExJ10sIFsxMSwgJ0InLCAnMTAxMTEwMTAwMDEwMTExJ10sIFsxMiwgJ0MnLCAnMTExMDExMTAxMDAwMTAxJ10sIFsxMywgJ0QnLCAnMTAxMDExMTAwMDEwMTExJ10sIFsxNCwgJ0UnLCAnMTExMDEwMTExMDAwMTAxJ10sIFsxNSwgJ0YnLCAnMTAxMTEwMTExMDAwMTAxJ10sIFsxNiwgJ0cnLCAnMTAxMDEwMDAxMTEwMTExJ10sIFsxNywgJ0gnLCAnMTExMDEwMTAwMDExMTAxJ10sIFsxOCwgJ0knLCAnMTAxMTEwMTAwMDExMTAxJ10sIFsxOSwgJ0onLCAnMTAxMDExMTAwMDExMTAxJ10sIFsyMCwgJ0snLCAnMTExMDEwMTAxMDAwMTExJ10sIFsyMSwgJ0wnLCAnMTAxMTEwMTAxMDAwMTExJ10sIFsyMiwgJ00nLCAnMTExMDExMTAxMDEwMDAxJ10sIFsyMywgJ04nLCAnMTAxMDExMTAxMDAwMTExJ10sIFsyNCwgJ08nLCAnMTExMDEwMTExMDEwMDAxJ10sIFsyNSwgJ1AnLCAnMTAxMTEwMTExMDEwMDAxJ10sIFsyNiwgJ1EnLCAnMTAxMDEwMTExMDAwMTExJ10sIFsyNywgJ1InLCAnMTExMDEwMTAxMTEwMDAxJ10sIFsyOCwgJ1MnLCAnMTAxMTEwMTAxMTEwMDAxJ10sIFsyOSwgJ1QnLCAnMTAxMDExMTAxMTEwMDAxJ10sIFszMCwgJ1UnLCAnMTExMDAwMTAxMDEwMTExJ10sIFszMSwgJ1YnLCAnMTAwMDExMTAxMDEwMTExJ10sIFszMiwgJ1cnLCAnMTExMDAwMTExMDEwMTAxJ10sIFszMywgJ1gnLCAnMTAwMDEwMTExMDEwMTExJ10sIFszNCwgJ1knLCAnMTExMDAwMTAxMTEwMTAxJ10sIFszNSwgJ1onLCAnMTAwMDExMTAxMTEwMTAxJ10sIFszNiwgJy0nLCAnMTAwMDEwMTAxMTEwMTExJ10sIFszNywgJy4nLCAnMTExMDAwMTAxMDExMTAxJ10sIFszOCwgJyAnLCAnMTAwMDExMTAxMDExMTAxJ10sIFszOSwgJyQnLCAnMTAwMDEwMDAxMDAwMTAxJ10sIFs0MCwgJy8nLCAnMTAwMDEwMDAxMDEwMDAxJ10sIFs0MSwgJysnLCAnMTAwMDEwMTAwMDEwMDAxJ10sIFs0MiwgJyUnLCAnMTAxMDAwMTAwMDEwMDAxJ11dO1xuXG52YXIgdmFsaWRSZSA9IC9eWzAtOWEtekEtWlxcLVxcLlxcIFxcJFxcL1xcK1xcJV0rJC87XG5cbnZhciBDT0RFMzkgPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBDT0RFMzkoY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDT0RFMzkpO1xuXG4gICAgdGhpcy5jb2RlID0gU3RyaW5nKGNvZGUpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKENPREUzOSwgW3tcbiAgICBrZXk6ICdpc1ZhbGlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgIHJldHVybiB2YWxpZFJlLnRlc3QodGhpcy5jb2RlKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmNvZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGUoKSB7XG4gICAgICB2YXIgc3RyaW5nID0gdGhpcy5jb2RlLnRvVXBwZXJDYXNlKCk7XG5cbiAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgIHJlc3VsdCArPSAnMTAwMDEwMTExMDExMTAxMCc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0cmluZy5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gdGhpcy5lbmNvZGluZ0J5Q2hhcihzdHJpbmdbaV0pICsgJzAnO1xuICAgICAgfVxuICAgICAgcmVzdWx0ICs9ICcxMDAwMTAxMTEwMTExMDEwJztcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RpbmdCeUNoYXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGluZ0J5Q2hhcihjaGFyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGUzOS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY29kZTM5W2ldWzFdID09PSBjaGFyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGUzOVtpXVsyXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDT0RFMzk7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDT0RFMzk7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2NvZGUzOS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLy8gVGhlIEwgKGxlZnQpIHR5cGUgb2YgZW5jb2RpbmdcbnZhciBMYmluYXJ5ID0ge1xuICAwOiAnMDAwMTEwMScsXG4gIDE6ICcwMDExMDAxJyxcbiAgMjogJzAwMTAwMTEnLFxuICAzOiAnMDExMTEwMScsXG4gIDQ6ICcwMTAwMDExJyxcbiAgNTogJzAxMTAwMDEnLFxuICA2OiAnMDEwMTExMScsXG4gIDc6ICcwMTExMDExJyxcbiAgODogJzAxMTAxMTEnLFxuICA5OiAnMDAwMTAxMSdcbn07XG5cbi8vIFRoZSBHIHR5cGUgb2YgZW5jb2RpbmdcbnZhciBHYmluYXJ5ID0ge1xuICAwOiAnMDEwMDExMScsXG4gIDE6ICcwMTEwMDExJyxcbiAgMjogJzAwMTEwMTEnLFxuICAzOiAnMDEwMDAwMScsXG4gIDQ6ICcwMDExMTAxJyxcbiAgNTogJzAxMTEwMDEnLFxuICA2OiAnMDAwMDEwMScsXG4gIDc6ICcwMDEwMDAxJyxcbiAgODogJzAwMDEwMDEnLFxuICA5OiAnMDAxMDExMSdcbn07XG5cbi8vIFRoZSBSIChyaWdodCkgdHlwZSBvZiBlbmNvZGluZ1xudmFyIFJiaW5hcnkgPSB7XG4gIDA6ICcxMTEwMDEwJyxcbiAgMTogJzExMDAxMTAnLFxuICAyOiAnMTEwMTEwMCcsXG4gIDM6ICcxMDAwMDEwJyxcbiAgNDogJzEwMTExMDAnLFxuICA1OiAnMTAwMTExMCcsXG4gIDY6ICcxMDEwMDAwJyxcbiAgNzogJzEwMDAxMDAnLFxuICA4OiAnMTAwMTAwMCcsXG4gIDk6ICcxMTEwMTAwJ1xufTtcblxuLy8gVGhlIGxlZnQgc2lkZSBzdHJ1Y3R1cmUgaW4gRUFOLTEzXG52YXIgRUFOc3RydWN0ID0ge1xuICAwOiAnTExMTExMJyxcbiAgMTogJ0xMR0xHRycsXG4gIDI6ICdMTEdHTEcnLFxuICAzOiAnTExHR0dMJyxcbiAgNDogJ0xHTExHRycsXG4gIDU6ICdMR0dMTEcnLFxuICA2OiAnTEdHR0xMJyxcbiAgNzogJ0xHTEdMRycsXG4gIDg6ICdMR0xHR0wnLFxuICA5OiAnTEdHTEdMJ1xufTtcblxuLy8gVmFsaWQgRUFOIGNvZGVcbnZhciB2YWxpZFJlID0gL15bMC05XXsxM30kLztcbi8vIFRoZSBzdGFydCBiaXRzXG52YXIgc3RhcnRCaW4gPSAnMTAxJztcbi8vIFRoZSBlbmQgYml0c1xudmFyIGVuZEJpbiA9ICcxMDEnO1xuLy8gVGhlIG1pZGRsZSBiaXRzXG52YXIgbWlkZGxlQmluID0gJzAxMDEwJztcblxudmFyIEVBTiA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIEVBTihjb2RlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEVBTik7XG5cbiAgICB0aGlzLmNvZGUgPSBTdHJpbmcoY29kZSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRUFOLCBbe1xuICAgIGtleTogJ2lzVmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgcmV0dXJuIHZhbGlkUmUudGVzdCh0aGlzLmNvZGUpICYmIE51bWJlcih0aGlzLmNvZGVbMTJdKSA9PT0gdGhpcy5jaGVja3N1bSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoZWNrc3VtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hlY2tzdW0oKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMjsgaSArPSAyKSB7XG4gICAgICAgIHJlc3VsdCArPSBOdW1iZXIodGhpcy5jb2RlW2ldKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMTI7IGkgKz0gMikge1xuICAgICAgICByZXN1bHQgKz0gTnVtYmVyKHRoaXMuY29kZVtpXSkgKiAzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKDEwIC0gcmVzdWx0ICUgMTApICUgMTA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RlJyxcblxuICAgIC8vIENyZWF0ZSB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIHRoZSBFQU4gY29kZVxuICAgIC8vIG51bWJlciBuZWVkcyB0byBiZSBhIHN0cmluZ1xuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGUoKSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHJldHVybiB2YXJpYWJsZVxuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgICAvLyBHZXQgdGhlIGZpcnN0IGRpZ2l0IChmb3IgbGF0ZXIgZGV0ZXJtaW5hdGlvbiBvZiB0aGUgZW5jb2RpbmcgdHlwZSlcbiAgICAgIHZhciBmaXJzdERpZ2l0ID0gdGhpcy5jb2RlWzBdO1xuXG4gICAgICAvLyBHZXQgdGhlIG51bWJlciB0byBiZSBlbmNvZGVkIG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIEVBTiBjb2RlXG4gICAgICB2YXIgbGVmdFNpZGUgPSB0aGlzLmNvZGUuc3Vic3RyKDEsIDcpO1xuXG4gICAgICAvLyBHZXQgdGhlIG51bWJlciB0byBiZSBlbmNvZGVkIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBFQU4gY29kZVxuICAgICAgdmFyIHJpZ2h0U2lkZSA9IHRoaXMuY29kZS5zdWJzdHIoNywgNik7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RhcnQgYml0c1xuICAgICAgcmVzdWx0ICs9IHN0YXJ0QmluO1xuXG4gICAgICAvLyBBZGQgdGhlIGxlZnQgc2lkZVxuICAgICAgcmVzdWx0ICs9IHRoaXMuZW5jb2RlU3RydWN0KGxlZnRTaWRlLCBFQU5zdHJ1Y3RbZmlyc3REaWdpdF0pO1xuXG4gICAgICAvLyBBZGQgdGhlIG1pZGRsZSBiaXRzXG4gICAgICByZXN1bHQgKz0gbWlkZGxlQmluO1xuXG4gICAgICAvLyBBZGQgdGhlIHJpZ2h0IHNpZGVcbiAgICAgIHJlc3VsdCArPSB0aGlzLmVuY29kZVN0cnVjdChyaWdodFNpZGUsICdSUlJSUlInKTtcblxuICAgICAgLy8gQWRkIHRoZSBlbmQgYml0c1xuICAgICAgcmVzdWx0ICs9IGVuZEJpbjtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmNvZGVTdHJ1Y3QnLFxuXG4gICAgLy8gQ29udmVydCBhIG51bWJlciBhcnJheSB0byB0aGUgcmVwcmVzZW50aW5nXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kZVN0cnVjdChjb2RlUGFydCwgc3RydWN0KSB7XG4gICAgICAvLyBDcmVhdGUgdGhlIHZhcmlhYmxlIHRoYXQgc2hvdWxkIGJlIHJldHVybmVkIGF0IHRoZSBlbmQgb2YgdGhlIGZ1bmN0aW9uXG4gICAgICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgICAgIC8vIExvb3AgYWxsIHRoZSBudW1iZXJzXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGVQYXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIFVzaW5nIHRoZSBMLCBHIG9yIFIgZW5jb2RpbmcgYW5kIGFkZCBpdCB0byB0aGUgcmV0dXJuaW5nIHZhcmlhYmxlXG4gICAgICAgIGlmIChzdHJ1Y3RbaV0gPT09ICdMJykge1xuICAgICAgICAgIHJlc3VsdCArPSBMYmluYXJ5W2NvZGVQYXJ0W2ldXTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJ1Y3RbaV0gPT09ICdHJykge1xuICAgICAgICAgIHJlc3VsdCArPSBHYmluYXJ5W2NvZGVQYXJ0W2ldXTtcbiAgICAgICAgfSBlbHNlIGlmIChzdHJ1Y3RbaV0gPT09ICdSJykge1xuICAgICAgICAgIHJlc3VsdCArPSBSYmluYXJ5W2NvZGVQYXJ0W2ldXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gRUFOO1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gRUFOO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9lYW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfRUFOMiA9IHJlcXVpcmUoJy4vZWFuJyk7XG5cbnZhciBfRUFOMyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9FQU4yKTtcblxudmFyIFVQQyA9IChmdW5jdGlvbiAoX0VBTikge1xuICBmdW5jdGlvbiBVUEMoY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBVUEMpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoVVBDLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgJzAnICsgY29kZSk7XG4gIH1cblxuICBfaW5oZXJpdHMoVVBDLCBfRUFOKTtcblxuICByZXR1cm4gVVBDO1xufSkoX0VBTjNbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFVQQztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvdXBjLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vL1RoZSBzdHJ1Y3R1cmUgZm9yIHRoZSBhbGwgZGlnaXRzLCAxIGlzIHdpZGUgYW5kIDAgaXMgbmFycm93XG52YXIgZGlnaXRTdHJ1Y3R1cmUgPSB7XG4gIDA6ICcwMDExMCcsXG4gIDE6ICcxMDAwMScsXG4gIDI6ICcwMTAwMScsXG4gIDM6ICcxMTAwMCcsXG4gIDQ6ICcwMDEwMScsXG4gIDU6ICcxMDEwMCcsXG4gIDY6ICcwMTEwMCcsXG4gIDc6ICcwMDAxMScsXG4gIDg6ICcxMDAxMCcsXG4gIDk6ICcwMTAxMCdcbn07XG5cbi8vIFRoZSBzdGFydCBiaXRzXG52YXIgc3RhcnRCaW4gPSAnMTAxMCc7XG4vLyBUaGUgZW5kIGJpdHNcbnZhciBlbmRCaW4gPSAnMTExMDEnO1xuXG4vLyBSZWdleHAgZm9yIGEgdmFsaWQgSW50ZXIyNSBjb2RlXG52YXIgdmFsaWRSZSA9IC9eKFswLTldWzAtOV0pKyQvO1xuXG52YXIgSVRGID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gSVRGKGNvZGUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSVRGKTtcblxuICAgIHRoaXMuY29kZSA9IFN0cmluZyhjb2RlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhJVEYsIFt7XG4gICAga2V5OiAnaXNWYWxpZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICByZXR1cm4gdmFsaWRSZS50ZXN0KHRoaXMuY29kZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RlKCkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSB2YXJpYWJsZSB0aGF0IHNob3VsZCBiZSByZXR1cm5lZCBhdCB0aGUgZW5kIG9mIHRoZSBmdW5jdGlvblxuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgICAvLyBBbHdheXMgYWRkIHRoZSBzYW1lIHN0YXJ0IGJpdHNcbiAgICAgIHJlc3VsdCArPSBzdGFydEJpbjtcblxuICAgICAgLy8gQ2FsY3VsYXRlIGFsbCB0aGUgZGlnaXQgcGFpcnNcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb2RlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHJlc3VsdCArPSB0aGlzLmNhbGN1bGF0ZVBhaXIodGhpcy5jb2RlLnN1YnN0cihpLCAyKSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFsd2F5cyBhZGQgdGhlIHNhbWUgZW5kIGJpdHNcbiAgICAgIHJlc3VsdCArPSBlbmRCaW47XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnY2FsY3VsYXRlUGFpcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNhbGN1bGF0ZVBhaXIodHdvTnVtYmVycykge1xuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgICB2YXIgbnVtYmVyMVN0cnVjdCA9IGRpZ2l0U3RydWN0dXJlW3R3b051bWJlcnNbMF1dO1xuICAgICAgdmFyIG51bWJlcjJTdHJ1Y3QgPSBkaWdpdFN0cnVjdHVyZVt0d29OdW1iZXJzWzFdXTtcblxuICAgICAgLy8gVGFrZSBldmVyeSBzZWNvbmQgYml0IGFuZCBhZGQgdG8gdGhlIHJlc3VsdFxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCA1OyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IG51bWJlcjFTdHJ1Y3RbaV0gPT09ICcxJyA/ICcxMTEnIDogJzEnO1xuICAgICAgICByZXN1bHQgKz0gbnVtYmVyMlN0cnVjdFtpXSA9PT0gJzEnID8gJzAwMCcgOiAnMCc7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIElURjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IElURjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvaXRmLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0lURjIgPSByZXF1aXJlKCcuL2l0ZicpO1xuXG52YXIgX0lURjMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfSVRGMik7XG5cbnZhciB2YWxpZFJlID0gL15bMC05XXsxMywxNH0kLztcblxudmFyIElURjE0ID0gKGZ1bmN0aW9uIChfSVRGKSB7XG4gIGZ1bmN0aW9uIElURjE0KGNvZGUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSVRGMTQpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoSVRGMTQucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBjb2RlKTtcblxuICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMTMpIHtcbiAgICAgIHRoaXMuY29kZSArPSB0aGlzLmNoZWNrc3VtKCk7XG4gICAgfVxuICB9XG5cbiAgX2luaGVyaXRzKElURjE0LCBfSVRGKTtcblxuICBfY3JlYXRlQ2xhc3MoSVRGMTQsIFt7XG4gICAga2V5OiAnaXNWYWxpZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICByZXR1cm4gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoSVRGMTQucHJvdG90eXBlKSwgJ2lzVmFsaWQnLCB0aGlzKS5jYWxsKHRoaXMpICYmIHZhbGlkUmUudGVzdCh0aGlzLmNvZGUpICYmIE51bWJlcih0aGlzLmNvZGVbMTNdKSA9PT0gdGhpcy5jaGVja3N1bSgpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoZWNrc3VtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hlY2tzdW0oKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gMDtcblxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAxMzsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBOdW1iZXIodGhpcy5jb2RlW2ldKSAqICgzIC0gaSAlIDIgKiAyKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDEwIC0gcmVzdWx0ICUgMTA7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIElURjE0O1xufSkoX0lURjNbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IElURjE0O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9pdGYxNC5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9DT0RFMTI4MiA9IHJlcXVpcmUoJy4vY29kZTEyOCcpO1xuXG52YXIgX0NPREUxMjgzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0NPREUxMjgyKTtcblxudmFyIENPREUxMjhCID0gKGZ1bmN0aW9uIChfQ09ERTEyOCkge1xuICBmdW5jdGlvbiBDT0RFMTI4Qihjb2RlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENPREUxMjhCKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKENPREUxMjhCLnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgY29kZSk7XG4gICAgdGhpcy5zdGFydENvZGUgPSAxMDQ7XG4gIH1cblxuICBfaW5oZXJpdHMoQ09ERTEyOEIsIF9DT0RFMTI4KTtcblxuICBfY3JlYXRlQ2xhc3MoQ09ERTEyOEIsIFt7XG4gICAga2V5OiAnZW5jb2RlQ2xhc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGVDbGFzcygpIHtcbiAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihDT0RFMTI4Qi5wcm90b3R5cGUpLCAnZW5jb2RpbmdCeUNoYXInLCB0aGlzKS5jYWxsKHRoaXMsIHRoaXMuY29kZVtpXSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoZWNrc3VtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hlY2tzdW0oKSB7XG4gICAgICB2YXIgc3VtID0gMDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN1bSArPSBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihDT0RFMTI4Qi5wcm90b3R5cGUpLCAnd2VpZ2h0QnlDaGFyYWN0ZXInLCB0aGlzKS5jYWxsKHRoaXMsIHRoaXMuY29kZVtpXSkgKiAoaSArIDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChzdW0gKyB0aGlzLnN0YXJ0Q29kZSkgJSAxMDM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENPREUxMjhCO1xufSkoX0NPREUxMjgzWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDT0RFMTI4Qjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvY29kZTEyOGIuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIERhdGEgZm9yIGVhY2ggY2hhcmFjdGVyXG4vLyBUaGUgbGFzdCBjaGFyYWN0ZXJzIHdpbGwgbm90IGJlIGVuY29kZWQgYnV0IGFyZSB1c2VkIGZvciBlcnJvciBjb3JyZWN0aW9uXG52YXIgY29kZTEyOGIgPSBbWycgJywgJzExMDExMDAxMTAwJywgMF0sIFsnIScsICcxMTAwMTEwMTEwMCcsIDFdLCBbJ1wiJywgJzExMDAxMTAwMTEwJywgMl0sIFsnIycsICcxMDAxMDAxMTAwMCcsIDNdLCBbJyQnLCAnMTAwMTAwMDExMDAnLCA0XSwgWyclJywgJzEwMDAxMDAxMTAwJywgNV0sIFsnJicsICcxMDAxMTAwMTAwMCcsIDZdLCBbJ1xcJycsICcxMDAxMTAwMDEwMCcsIDddLCBbJygnLCAnMTAwMDExMDAxMDAnLCA4XSwgWycpJywgJzExMDAxMDAxMDAwJywgOV0sIFsnKicsICcxMTAwMTAwMDEwMCcsIDEwXSwgWycrJywgJzExMDAwMTAwMTAwJywgMTFdLCBbJywnLCAnMTAxMTAwMTExMDAnLCAxMl0sIFsnLScsICcxMDAxMTAxMTEwMCcsIDEzXSwgWycuJywgJzEwMDExMDAxMTEwJywgMTRdLCBbJy8nLCAnMTAxMTEwMDExMDAnLCAxNV0sIFsnMCcsICcxMDAxMTEwMTEwMCcsIDE2XSwgWycxJywgJzEwMDExMTAwMTEwJywgMTddLCBbJzInLCAnMTEwMDExMTAwMTAnLCAxOF0sIFsnMycsICcxMTAwMTAxMTEwMCcsIDE5XSwgWyc0JywgJzExMDAxMDAxMTEwJywgMjBdLCBbJzUnLCAnMTEwMTExMDAxMDAnLCAyMV0sIFsnNicsICcxMTAwMTExMDEwMCcsIDIyXSwgWyc3JywgJzExMTAxMTAxMTEwJywgMjNdLCBbJzgnLCAnMTExMDEwMDExMDAnLCAyNF0sIFsnOScsICcxMTEwMDEwMTEwMCcsIDI1XSwgWyc6JywgJzExMTAwMTAwMTEwJywgMjZdLCBbJzsnLCAnMTExMDExMDAxMDAnLCAyN10sIFsnPCcsICcxMTEwMDExMDEwMCcsIDI4XSwgWyc9JywgJzExMTAwMTEwMDEwJywgMjldLCBbJz4nLCAnMTEwMTEwMTEwMDAnLCAzMF0sIFsnPycsICcxMTAxMTAwMDExMCcsIDMxXSwgWydAJywgJzExMDAwMTEwMTEwJywgMzJdLCBbJ0EnLCAnMTAxMDAwMTEwMDAnLCAzM10sIFsnQicsICcxMDAwMTAxMTAwMCcsIDM0XSwgWydDJywgJzEwMDAxMDAwMTEwJywgMzVdLCBbJ0QnLCAnMTAxMTAwMDEwMDAnLCAzNl0sIFsnRScsICcxMDAwMTEwMTAwMCcsIDM3XSwgWydGJywgJzEwMDAxMTAwMDEwJywgMzhdLCBbJ0cnLCAnMTEwMTAwMDEwMDAnLCAzOV0sIFsnSCcsICcxMTAwMDEwMTAwMCcsIDQwXSwgWydJJywgJzExMDAwMTAwMDEwJywgNDFdLCBbJ0onLCAnMTAxMTAxMTEwMDAnLCA0Ml0sIFsnSycsICcxMDExMDAwMTExMCcsIDQzXSwgWydMJywgJzEwMDAxMTAxMTEwJywgNDRdLCBbJ00nLCAnMTAxMTEwMTEwMDAnLCA0NV0sIFsnTicsICcxMDExMTAwMDExMCcsIDQ2XSwgWydPJywgJzEwMDAxMTEwMTEwJywgNDddLCBbJ1AnLCAnMTExMDExMTAxMTAnLCA0OF0sIFsnUScsICcxMTAxMDAwMTExMCcsIDQ5XSwgWydSJywgJzExMDAwMTAxMTEwJywgNTBdLCBbJ1MnLCAnMTEwMTExMDEwMDAnLCA1MV0sIFsnVCcsICcxMTAxMTEwMDAxMCcsIDUyXSwgWydVJywgJzExMDExMTAxMTEwJywgNTNdLCBbJ1YnLCAnMTExMDEwMTEwMDAnLCA1NF0sIFsnVycsICcxMTEwMTAwMDExMCcsIDU1XSwgWydYJywgJzExMTAwMDEwMTEwJywgNTZdLCBbJ1knLCAnMTExMDExMDEwMDAnLCA1N10sIFsnWicsICcxMTEwMTEwMDAxMCcsIDU4XSwgWydbJywgJzExMTAwMDExMDEwJywgNTldLCBbJ1xcXFwnLCAnMTExMDExMTEwMTAnLCA2MF0sIFsnXScsICcxMTAwMTAwMDAxMCcsIDYxXSwgWydeJywgJzExMTEwMDAxMDEwJywgNjJdLCBbJ18nLCAnMTAxMDAxMTAwMDAnLCA2M10sIFsnYCcsICcxMDEwMDAwMTEwMCcsIDY0XSwgWydhJywgJzEwMDEwMTEwMDAwJywgNjVdLCBbJ2InLCAnMTAwMTAwMDAxMTAnLCA2Nl0sIFsnYycsICcxMDAwMDEwMTEwMCcsIDY3XSwgWydkJywgJzEwMDAwMTAwMTEwJywgNjhdLCBbJ2UnLCAnMTAxMTAwMTAwMDAnLCA2OV0sIFsnZicsICcxMDExMDAwMDEwMCcsIDcwXSwgWydnJywgJzEwMDExMDEwMDAwJywgNzFdLCBbJ2gnLCAnMTAwMTEwMDAwMTAnLCA3Ml0sIFsnaScsICcxMDAwMDExMDEwMCcsIDczXSwgWydqJywgJzEwMDAwMTEwMDEwJywgNzRdLCBbJ2snLCAnMTEwMDAwMTAwMTAnLCA3NV0sIFsnbCcsICcxMTAwMTAxMDAwMCcsIDc2XSwgWydtJywgJzExMTEwMTExMDEwJywgNzddLCBbJ24nLCAnMTEwMDAwMTAxMDAnLCA3OF0sIFsnbycsICcxMDAwMTExMTAxMCcsIDc5XSwgWydwJywgJzEwMTAwMTExMTAwJywgODBdLCBbJ3EnLCAnMTAwMTAxMTExMDAnLCA4MV0sIFsncicsICcxMDAxMDAxMTExMCcsIDgyXSwgWydzJywgJzEwMTExMTAwMTAwJywgODNdLCBbJ3QnLCAnMTAwMTExMTAxMDAnLCA4NF0sIFsndScsICcxMDAxMTExMDAxMCcsIDg1XSwgWyd2JywgJzExMTEwMTAwMTAwJywgODZdLCBbJ3cnLCAnMTExMTAwMTAxMDAnLCA4N10sIFsneCcsICcxMTExMDAxMDAxMCcsIDg4XSwgWyd5JywgJzExMDExMDExMTEwJywgODldLCBbJ3onLCAnMTEwMTExMTAxMTAnLCA5MF0sIFsneycsICcxMTExMDExMDExMCcsIDkxXSwgWyd8JywgJzEwMTAxMTExMDAwJywgOTJdLCBbJ30nLCAnMTAxMDAwMTExMTAnLCA5M10sIFsnficsICcxMDAwMTAxMTExMCcsIDk0XSwgW1N0cmluZy5mcm9tQ2hhckNvZGUoMTI3KSwgJzEwMTExMTAxMDAwJywgOTVdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMjgpLCAnMTAxMTExMDAwMTAnLCA5Nl0sIFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEyOSksICcxMTExMDEwMTAwMCcsIDk3XSwgW1N0cmluZy5mcm9tQ2hhckNvZGUoMTMwKSwgJzExMTEwMTAwMDEwJywgOThdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMzEpLCAnMTAxMTEwMTExMTAnLCA5OV0sIFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEzMiksICcxMDExMTEwMTExMCcsIDEwMF0sIFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEzMyksICcxMTEwMTAxMTExMCcsIDEwMV0sIFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEzNCksICcxMTExMDEwMTExMCcsIDEwMl0sXG4vL1N0YXJ0IGNvZGVzXG5bU3RyaW5nLmZyb21DaGFyQ29kZSgxMzUpLCAnMTEwMTAwMDAxMDAnLCAxMDNdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMzYpLCAnMTEwMTAwMTAwMDAnLCAxMDRdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMzcpLCAnMTEwMTAwMTExMDAnLCAxMDVdXTtcblxudmFyIGVuZEJpbiA9ICcxMTAwMDExMTAxMDExJztcbnZhciB2YWxpZFJlID0gL15bIS1+IF0rJC87XG5cbnZhciBDT0RFMTI4ID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ09ERTEyOChjb2RlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIENPREUxMjgpO1xuXG4gICAgdGhpcy5jb2RlID0gU3RyaW5nKGNvZGUpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKENPREUxMjgsIFt7XG4gICAga2V5OiAnaXNWYWxpZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICByZXR1cm4gdmFsaWRSZS50ZXN0KHRoaXMuY29kZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RlKGVuY29kZUZuLCBzdGFydENvZGUsIGNoZWNrc3VtRm4pIHtcbiAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgLy9BZGQgdGhlIHN0YXJ0IGJpdHNcbiAgICAgIHJlc3VsdCArPSB0aGlzLmVuY29kaW5nQnlJZCh0aGlzLnN0YXJ0Q29kZSk7XG5cbiAgICAgIC8vQWRkIHRoZSBlbmNvZGVkIGJpdHNcbiAgICAgIHJlc3VsdCArPSB0aGlzLmVuY29kZUNsYXNzKCk7XG5cbiAgICAgIC8vQWRkIHRoZSBjaGVja3N1bVxuICAgICAgcmVzdWx0ICs9IHRoaXMuZW5jb2RpbmdCeUlkKHRoaXMuY2hlY2tzdW0oKSk7XG5cbiAgICAgIC8vQWRkIHRoZSBlbmQgYml0c1xuICAgICAgcmVzdWx0ICs9IGVuZEJpbjtcblxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmNvZGluZ0J5SWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGluZ0J5SWQoaWQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZTEyOGIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvZGUxMjhiW2ldWzJdID09PSBpZCkge1xuICAgICAgICAgIHJldHVybiBjb2RlMTI4YltpXVsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ3dlaWdodEJ5Q2hhcmFjdGVyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gd2VpZ2h0QnlDaGFyYWN0ZXIoY2hhcikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlMTI4Yi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY29kZTEyOGJbaV1bMF0gPT09IGNoYXIpIHtcbiAgICAgICAgICByZXR1cm4gY29kZTEyOGJbaV1bMl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kaW5nQnlDaGFyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RpbmdCeUNoYXIoY2hhcikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlMTI4Yi5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoY29kZTEyOGJbaV1bMF0gPT09IGNoYXIpIHtcbiAgICAgICAgICByZXR1cm4gY29kZTEyOGJbaV1bMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ09ERTEyODtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IENPREUxMjg7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2NvZGUxMjguanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQ09ERTEyODIgPSByZXF1aXJlKCcuL2NvZGUxMjgnKTtcblxudmFyIF9DT0RFMTI4MyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9DT0RFMTI4Mik7XG5cbnZhciBDT0RFMTI4QyA9IChmdW5jdGlvbiAoX0NPREUxMjgpIHtcbiAgZnVuY3Rpb24gQ09ERTEyOEMoY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDT0RFMTI4Qyk7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihDT0RFMTI4Qy5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGNvZGUpO1xuICAgIHRoaXMuY29kZSA9IHRoaXMuY29kZS5yZXBsYWNlKC8gL2csICcnKTtcbiAgICB0aGlzLnN0YXJ0Q29kZSA9IDEwNTtcbiAgfVxuXG4gIF9pbmhlcml0cyhDT0RFMTI4QywgX0NPREUxMjgpO1xuXG4gIF9jcmVhdGVDbGFzcyhDT0RFMTI4QywgW3tcbiAgICBrZXk6ICdlbmNvZGVDbGFzcycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kZUNsYXNzKCkge1xuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmNvZGUubGVuZ3RoOyBpICs9IDIpIHtcbiAgICAgICAgcmVzdWx0ICs9IF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKENPREUxMjhDLnByb3RvdHlwZSksICdlbmNvZGluZ0J5SWQnLCB0aGlzKS5jYWxsKHRoaXMsIE51bWJlcih0aGlzLmNvZGUuc3Vic3RyKGksIDIpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NoZWNrc3VtJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY2hlY2tzdW0oKSB7XG4gICAgICB2YXIgc3VtID0gMDtcbiAgICAgIHZhciB3ID0gMTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb2RlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHN1bSArPSBOdW1iZXIodGhpcy5jb2RlLnN1YnN0cihpLCAyKSkgKiB3O1xuICAgICAgICB3Kys7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHN1bSArIHRoaXMuc3RhcnRDb2RlKSAlIDEwMztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ09ERTEyOEM7XG59KShfQ09ERTEyODNbJ2RlZmF1bHQnXSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IENPREUxMjhDO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMTI4Yy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcmVwZWF0ID0gcmVxdWlyZSgnY29yZS1qcy9saWJyYXJ5L2ZuL3N0cmluZy9yZXBlYXQnKTtcblxudmFyIF9yZXBlYXQyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX3JlcGVhdCk7XG5cbnZhciBQaGFybWFjb2RlID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gUGhhcm1hY29kZShjb2RlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFBoYXJtYWNvZGUpO1xuXG4gICAgdGhpcy5jb2RlID0gTnVtYmVyKGNvZGUpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKFBoYXJtYWNvZGUsIFt7XG4gICAga2V5OiAnaXNWYWxpZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICByZXR1cm4gdGhpcy5jb2RlID49IDMgJiYgdGhpcy5jb2RlIDw9IDEzMTA3MDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdfY2FsY1plcm9zJyxcblxuICAgIC8vIEEgaGVscGVyIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSB0aGUgemVyb3MgYXQgdGhlIGVuZCBvZiBhIHN0cmluZ1xuICAgIHZhbHVlOiBmdW5jdGlvbiBfY2FsY1plcm9zKGNvZGUpIHtcbiAgICAgIHZhciBpID0gY29kZS5sZW5ndGggLSAxO1xuICAgICAgdmFyIHplcm9zID0gMDtcbiAgICAgIHdoaWxlIChjb2RlW2ldID09PSAnMCcgfHwgaSA8IDApIHtcbiAgICAgICAgemVyb3MrKztcbiAgICAgICAgaS0tO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHplcm9zO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kZUJpbmFyeScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kZUJpbmFyeShjb2RlLCBzdGF0ZSkge1xuICAgICAgaWYgKGNvZGUubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH12YXIgZ2VuZXJhdGVkID0gdW5kZWZpbmVkO1xuICAgICAgdmFyIG5leHRTdGF0ZSA9IGZhbHNlO1xuICAgICAgdmFyIG5aZXJvcyA9IHRoaXMuX2NhbGNaZXJvcyhjb2RlKTtcblxuICAgICAgaWYgKG5aZXJvcyA9PT0gMCkge1xuICAgICAgICBnZW5lcmF0ZWQgPSBzdGF0ZSA/ICcwMDEnIDogJzAwMTExJztcbiAgICAgICAgbmV4dFN0YXRlID0gc3RhdGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBnZW5lcmF0ZWQgPSBfcmVwZWF0MlsnZGVmYXVsdCddKCcwMDEnLCBuWmVyb3MgLSAoc3RhdGUgPyAxIDogMCkpO1xuICAgICAgICBnZW5lcmF0ZWQgKz0gJzAwMTExJztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLmVuY29kZUJpbmFyeShjb2RlLnN1YnN0cigwLCBjb2RlLmxlbmd0aCAtIG5aZXJvcyAtIDEpLCBuZXh0U3RhdGUpICsgZ2VuZXJhdGVkO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kZSgpIHtcbiAgICAgIHJldHVybiB0aGlzLmVuY29kZUJpbmFyeSh0aGlzLmNvZGUudG9TdHJpbmcoMiksIHRydWUpLnN1YnN0cigyKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUGhhcm1hY29kZTtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IFBoYXJtYWNvZGU7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL3BoYXJtYWNvZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKS5jb3JlLlN0cmluZy5yZXBlYXQ7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9+L2NvcmUtanMvbGlicmFyeS9mbi9zdHJpbmcvcmVwZWF0LmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuXG4kZGVmKCRkZWYuUCwgJ1N0cmluZycsIHtcbiAgLy8gMjEuMS4zLjEzIFN0cmluZy5wcm90b3R5cGUucmVwZWF0KGNvdW50KVxuICByZXBlYXQ6IHJlcXVpcmUoJy4vJC5zdHJpbmctcmVwZWF0Jylcbn0pO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLnJlcGVhdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgJCA9IHJlcXVpcmUoJy4vJCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHJlcGVhdChjb3VudCl7XG4gIHZhciBzdHIgPSBTdHJpbmcoJC5hc3NlcnREZWZpbmVkKHRoaXMpKVxuICAgICwgcmVzID0gJydcbiAgICAsIG4gICA9ICQudG9JbnRlZ2VyKGNvdW50KTtcbiAgaWYobiA8IDAgfHwgbiA9PSBJbmZpbml0eSl0aHJvdyBSYW5nZUVycm9yKFwiQ291bnQgY2FuJ3QgYmUgbmVnYXRpdmVcIik7XG4gIGZvcig7biA+IDA7IChuID4+Pj0gMSkgJiYgKHN0ciArPSBzdHIpKWlmKG4gJiAxKXJlcyArPSBzdHI7XG4gIHJldHVybiByZXM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLnN0cmluZy1yZXBlYXQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXG52YXIgQ2FudmFzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBDYW52YXMgKHcsIGgpIHtcbiAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXG4gIGNhbnZhcy53aWR0aCA9IHcgfHwgMzAwXG4gIGNhbnZhcy5oZWlnaHQgPSBoIHx8IDE1MFxuICByZXR1cm4gY2FudmFzXG59XG5cbkNhbnZhcy5JbWFnZSA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gIHJldHVybiBpbWdcbn1cblxuXG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jYW52YXMtYnJvd3NlcmlmeS9icm93c2VyLmpzXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=