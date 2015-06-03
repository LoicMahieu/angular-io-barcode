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
	angular.module('io-barcode', [])
	
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAwYzdlZDRhMWRjODgzYmNmYzc5ZCIsIndlYnBhY2s6Ly8vLi9saWIvYW5ndWxhci1pby1iYXJjb2RlLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmRlZi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuZncuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5hc3NpZ24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5lbnVtLWtleXMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2luZGV4LmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMzkuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2Vhbi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvdXBjLmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9pdGYuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2l0ZjE0LmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMTI4Yi5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvY29kZTEyOC5qcyIsIndlYnBhY2s6Ly8vLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvY29kZTEyOGMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL3BoYXJtYWNvZGUuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L2ZuL3N0cmluZy9yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanMiLCJ3ZWJwYWNrOi8vLy4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzIiwid2VicGFjazovLy8uL34vaW8tYmFyY29kZS9+L2NhbnZhcy1icm93c2VyaWZ5L2Jyb3dzZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3JDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7Ozs7Ozs7QUN2RkgsZ0Q7Ozs7OztBQ0FBOztBQUVBLCtDQUE4Qyx1Q0FBdUMsa0JBQWtCOztBQUV2RztBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0VBQWlFLGFBQWE7QUFDOUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUE4Qjs7QUFFOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGlCQUFnQix5QkFBeUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUM7Ozs7OztBQzlIQTtBQUNBLDREOzs7Ozs7QUNEQTtBQUNBO0FBQ0EseUJBQXdCLCtCQUE4QixFOzs7Ozs7QUNGdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsWUFBVztBQUNYLFlBQVc7QUFDWCxZQUFXO0FBQ1gsYUFBWTtBQUNaLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTRDO0FBQzVDLGtFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDZEQUE0RDtBQUM1RDtBQUNBO0FBQ0EsdUI7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE0QixRQUFRLGdCQUFnQixVQUFVLEdBQUc7QUFDakUsSUFBRyxVQUFVO0FBQ2IsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQTZEO0FBQzdELElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLDJDOzs7Ozs7QUMvRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSxHOzs7Ozs7QUNUQTs7QUFFQSwrQ0FBOEMsdUNBQXVDLGtCQUFrQjs7QUFFdkc7QUFDQTtBQUNBLEVBQUM7O0FBRUQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQzs7Ozs7O0FDbERBOztBQUVBLHlEQUF3RCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRTlKLGtDQUFpQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWxqQjtBQUNBO0FBQ0EsRUFBQztBQUNEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBcUIsbUJBQW1CO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLHNCQUFxQixtQkFBbUI7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBLEVBQUM7O0FBRUQ7QUFDQSxxQzs7Ozs7O0FDdERBOztBQUVBLHlEQUF3RCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRTlKLGtDQUFpQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWxqQjtBQUNBO0FBQ0EsRUFBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsdUJBQXNCLEdBQUc7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLHNCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxzQkFBcUIsUUFBUTtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUNsS0E7O0FBRUEsK0NBQThDLHVDQUF1QyxrQkFBa0I7O0FBRXZHLHlEQUF3RCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRTlKLHNEQUFxRCw4REFBOEQsMEJBQTBCLDRDQUE0Qyx1QkFBdUIsa0JBQWtCLEVBQUUsT0FBTyx3Q0FBd0MsRUFBRSxFQUFFLDRCQUE0QixtQkFBbUIsRUFBRSxPQUFPLHVCQUF1Qiw0QkFBNEIsa0JBQWtCLEVBQUUsOEJBQThCLEVBQUU7O0FBRXRiLGtEQUFpRCwrREFBK0QscUdBQXFHLEVBQUUseUVBQXlFLGVBQWUseUVBQXlFLEVBQUUsRUFBRSxpREFBaUQ7O0FBRTdhO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUMvQkE7O0FBRUEseURBQXdELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFOUosa0NBQWlDLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFLEVBQUUseURBQXlELHFFQUFxRSw2REFBNkQsb0JBQW9CLEdBQUcsRUFBRTs7QUFFbGpCO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXFCLE9BQU87QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUNwRkE7O0FBRUEsK0NBQThDLHVDQUF1QyxrQkFBa0I7O0FBRXZHLHlEQUF3RCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRTlKLGtDQUFpQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWxqQixzREFBcUQsOERBQThELDBCQUEwQiw0Q0FBNEMsdUJBQXVCLGtCQUFrQixFQUFFLE9BQU8sd0NBQXdDLEVBQUUsRUFBRSw0QkFBNEIsbUJBQW1CLEVBQUUsT0FBTyx1QkFBdUIsNEJBQTRCLGtCQUFrQixFQUFFLDhCQUE4QixFQUFFOztBQUV0YixrREFBaUQsK0RBQStELHFHQUFxRyxFQUFFLHlFQUF5RSxlQUFlLHlFQUF5RSxFQUFFLEVBQUUsaURBQWlEOztBQUU3YTtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQSx1QkFBc0IsTUFBTTs7QUFFNUI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBLHNCQUFxQixRQUFRO0FBQzdCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQSxFQUFDOztBQUVEO0FBQ0EscUM7Ozs7OztBQ3pEQTs7QUFFQSwrQ0FBOEMsdUNBQXVDLGtCQUFrQjs7QUFFdkcseURBQXdELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFOUosa0NBQWlDLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFLEVBQUUseURBQXlELHFFQUFxRSw2REFBNkQsb0JBQW9CLEdBQUcsRUFBRTs7QUFFbGpCLHNEQUFxRCw4REFBOEQsMEJBQTBCLDRDQUE0Qyx1QkFBdUIsa0JBQWtCLEVBQUUsT0FBTyx3Q0FBd0MsRUFBRSxFQUFFLDRCQUE0QixtQkFBbUIsRUFBRSxPQUFPLHVCQUF1Qiw0QkFBNEIsa0JBQWtCLEVBQUUsOEJBQThCLEVBQUU7O0FBRXRiLGtEQUFpRCwrREFBK0QscUdBQXFHLEVBQUUseUVBQXlFLGVBQWUseUVBQXlFLEVBQUUsRUFBRSxpREFBaUQ7O0FBRTdhO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUN0REE7O0FBRUEseURBQXdELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFOUosa0NBQWlDLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFLEVBQUUseURBQXlELHFFQUFxRSw2REFBNkQsb0JBQW9CLEdBQUcsRUFBRTs7QUFFbGpCO0FBQ0E7QUFDQSxFQUFDO0FBQ0Q7QUFDQTtBQUNBLHlzQkFBd3NCLGlvREFBaW9ELG9EQUFvRDtBQUM3M0U7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0Esc0JBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLHNCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxzQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQSxFQUFDOztBQUVEO0FBQ0EscUM7Ozs7OztBQ3JGQTs7QUFFQSwrQ0FBOEMsdUNBQXVDLGtCQUFrQjs7QUFFdkcseURBQXdELDBDQUEwQywwREFBMEQsRUFBRTs7QUFFOUosa0NBQWlDLDJDQUEyQyxnQkFBZ0Isa0JBQWtCLE9BQU8sMkJBQTJCLHdEQUF3RCxnQ0FBZ0MsdURBQXVELDJEQUEyRCxFQUFFLEVBQUUseURBQXlELHFFQUFxRSw2REFBNkQsb0JBQW9CLEdBQUcsRUFBRTs7QUFFbGpCLHNEQUFxRCw4REFBOEQsMEJBQTBCLDRDQUE0Qyx1QkFBdUIsa0JBQWtCLEVBQUUsT0FBTyx3Q0FBd0MsRUFBRSxFQUFFLDRCQUE0QixtQkFBbUIsRUFBRSxPQUFPLHVCQUF1Qiw0QkFBNEIsa0JBQWtCLEVBQUUsOEJBQThCLEVBQUU7O0FBRXRiLGtEQUFpRCwrREFBK0QscUdBQXFHLEVBQUUseUVBQXlFLGVBQWUseUVBQXlFLEVBQUUsRUFBRSxpREFBaUQ7O0FBRTdhO0FBQ0E7QUFDQSxFQUFDOztBQUVEOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQixzQkFBc0I7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBcUIsc0JBQXNCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUN6REE7O0FBRUEsK0NBQThDLHVDQUF1QyxrQkFBa0I7O0FBRXZHLHlEQUF3RCwwQ0FBMEMsMERBQTBELEVBQUU7O0FBRTlKLGtDQUFpQywyQ0FBMkMsZ0JBQWdCLGtCQUFrQixPQUFPLDJCQUEyQix3REFBd0QsZ0NBQWdDLHVEQUF1RCwyREFBMkQsRUFBRSxFQUFFLHlEQUF5RCxxRUFBcUUsNkRBQTZELG9CQUFvQixHQUFHLEVBQUU7O0FBRWxqQjtBQUNBO0FBQ0EsRUFBQzs7QUFFRDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0EsRUFBQzs7QUFFRDtBQUNBLHFDOzs7Ozs7QUN0RUE7QUFDQSw0RDs7Ozs7O0FDREE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRUFBQyxFOzs7Ozs7QUNMRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPLE1BQU07QUFDYjtBQUNBLEc7Ozs7Ozs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYW5ndWxhci1pby1iYXJjb2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFuZ3VsYXJJb0JhcmNvZGVcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhbmd1bGFySW9CYXJjb2RlXCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzFfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMGM3ZWQ0YTFkYzg4M2JjZmM3OWRcbiAqKi8iLCJcbid1c2Ugc3RyaWN0J1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKSxcbiAgICBpb0JhcmNvZGUgPSByZXF1aXJlKCdpby1iYXJjb2RlJylcblxubW9kdWxlLmV4cG9ydHMgPVxuYW5ndWxhci5tb2R1bGUoJ2lvLWJhcmNvZGUnLCBbXSlcblxuLyoqXG4gKiBAbmdkb2MgY29uc3RhbnRcbiAqIEBuYW1lICRpb0JhcmNvZGVcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEV4cG9ydCBvZiBgaW8tYmFyY29kZWAgbW9kdWxlXG4gKlxuICovXG4gIC5jb25zdGFudCgnJGlvQmFyY29kZScsIGlvQmFyY29kZSlcblxuLyoqXG4gKiBAbmdkb2MgY29uc3RhbnRcbiAqIEBuYW1lIElPX0JBUkNPREVfVFlQRVNcbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIEFycmF5IG9mIGJhcmNvZGUgdHlwZXMgc3VwcG9ydGVkXG4gKlxuICovXG4gIC5jb25zdGFudCgnSU9fQkFSQ09ERV9UWVBFUycsIFtcbiAgICAnRUFOJyxcbiAgICAnVVBDJyxcbiAgICAnSVRGJyxcbiAgICAnSVRGMTQnLFxuICAgICdDT0RFMzknLFxuICAgICdDT0RFMTI4QicsXG4gICAgJ0NPREUxMjhDJyxcbiAgICAnUGhhcm1hY29kZSdcbiAgXSlcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBpb0JhcmNvZGVcbiAqIEByZXN0cmljdCBFXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGNvZGUgVGhlIHN0cmluZyB0byBlbmNvZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFRoZSB0eXBlIG9mIGJhcmNvZGUsIGNhbiBiZTogQ09ERTEyOEIsIENPREUxMjhDLCBFQU4sIFVQQywgQ09ERTM5LCBJVEYsIElURjE0LCBQaGFybWFjb2RlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyBBZGRpdGlvbmFsIGZvcm1hdHRpbmcgb3B0aW9ucy4gU2VlIGlvLWJhcmNvZGUuXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBSZW5kZXIgYSBiYXJjb2RlIHVzaW5nIGlvLWJhcmNvZGVcbiAqXG4gKiBAZXhhbXBsZVxuICAgPGlvLWJhcmNvZGUgY29kZT1cIjEyMzQ1Njc4OTk5OVwiIHR5cGU9XCJVUENcIj48L2lvLWJhcmNvZGU+XG4gKlxuICovXG4gIC5kaXJlY3RpdmUoJ2lvQmFyY29kZScsIFsnJGlvQmFyY29kZScsIGZ1bmN0aW9uICgkaW9CYXJjb2RlKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogJzxpbWcgLz4nLFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGNvZGU6ICdAJyxcbiAgICAgICAgdHlwZTogJ0AnLFxuICAgICAgICBvcHRpb25zOiAnPSdcbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHNjb3BlLiR3YXRjaEdyb3VwKFtcbiAgICAgICAgICAnY29kZScsXG4gICAgICAgICAgJ3R5cGUnLFxuICAgICAgICAgICdvcHRpb25zJ1xuICAgICAgICBdLCByZW5kZXIpXG4gICAgICAgIHNjb3BlLiR3YXRjaCgnb3B0aW9ucycsIHJlbmRlciwgdHJ1ZSlcblxuICAgICAgICBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgICAgICAgIGlmICghaW9CYXJjb2RlW3Njb3BlLnR5cGVdKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ0ludmFsaWQgYmFyY29kZSB0eXBlOiAnICsgc2NvcGUudHlwZSlcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIXNjb3BlLmNvZGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybignTm8gY29kZSBwcm92aWRlZCcpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY2FudmFzID0gJGlvQmFyY29kZVtzY29wZS50eXBlXShzY29wZS5jb2RlLCBzY29wZS5vcHRpb25zKVxuICAgICAgICAgIGVsZW1lbnQuYXR0cignc3JjJywgY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1dKVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2xpYi9hbmd1bGFyLWlvLWJhcmNvZGUuanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuXHR2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24nKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2Fzc2lnbik7XG5cbnZhciBfZW5jb2RpbmdzID0gcmVxdWlyZSgnLi9lbmNvZGluZ3MnKTtcblxudmFyIF9lbmNvZGluZ3MyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX2VuY29kaW5ncyk7XG5cbnZhciBfQ2FudmFzID0gcmVxdWlyZSgnY2FudmFzLWJyb3dzZXJpZnknKTtcblxudmFyIF9DYW52YXMyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0NhbnZhcyk7XG5cbnZhciBhcGkgPSB7fTtcblxudmFyIF9sb29wID0gZnVuY3Rpb24gKF9uYW1lKSB7XG5cdGFwaVtfbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG5cdFx0Zm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcblx0XHRcdGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGdlbmVyYXRlQmFyY29kZURhdGFVcmkuYXBwbHkodW5kZWZpbmVkLCBbX2VuY29kaW5nczJbJ2RlZmF1bHQnXVtfbmFtZV1dLmNvbmNhdChhcmdzKSk7XG5cdH07XG59O1xuXG4vKiBlc2xpbnQgbm8tbG9vcC1mdW5jOjAgKi9cbmZvciAodmFyIF9uYW1lIGluIF9lbmNvZGluZ3MyWydkZWZhdWx0J10pIHtcblx0X2xvb3AoX25hbWUpO1xufVxuXG5leHBvcnRzWydkZWZhdWx0J10gPSBhcGk7XG5cbnZhciBkZWZhdWx0cyA9IHtcblx0d2lkdGg6IDIsXG5cdGhlaWdodDogMTAwLFxuXHRxdWl0ZTogMTAsXG5cdGRpc3BsYXlWYWx1ZTogZmFsc2UsXG5cdGZvbnQ6ICdtb25vc3BhY2UnLFxuXHR0ZXh0QWxpZ246ICdjZW50ZXInLFxuXHRmb250U2l6ZTogMTIsXG5cdGJhY2tncm91bmRDb2xvcjogJycsXG5cdGxpbmVDb2xvcjogJyMwMDAnXG59O1xuXG5mdW5jdGlvbiBfZHJhd0JhcmNvZGVUZXh0KHRleHQsIGNhbnZhcywgb3B0cykge1xuXHR2YXIgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cdHZhciB4ID0gdW5kZWZpbmVkLFxuXHQgICAgeSA9IHVuZGVmaW5lZDtcblxuXHR5ID0gb3B0cy5oZWlnaHQ7XG5cblx0Y3R4LmZvbnQgPSAnJyArIG9wdHMuZm9udFNpemUgKyAncHggJyArIG9wdHMuZm9udDtcblx0Y3R4LnRleHRCYXNlbGluZSA9ICdib3R0b20nO1xuXHRjdHgudGV4dEJhc2VsaW5lID0gJ3RvcCc7XG5cblx0aWYgKG9wdHMudGV4dEFsaWduID09PSAnbGVmdCcpIHtcblx0XHR4ID0gb3B0cy5xdWl0ZTtcblx0XHRjdHgudGV4dEFsaWduID0gJ2xlZnQnO1xuXHR9IGVsc2UgaWYgKG9wdHMudGV4dEFsaWduID09PSAncmlnaHQnKSB7XG5cdFx0eCA9IGNhbnZhcy53aWR0aCAtIG9wdHMucXVpdGU7XG5cdFx0Y3R4LnRleHRBbGlnbiA9ICdyaWdodCc7XG5cdH0gZWxzZSB7XG5cdFx0eCA9IGNhbnZhcy53aWR0aCAvIDI7XG5cdFx0Y3R4LnRleHRBbGlnbiA9ICdjZW50ZXInO1xuXHR9XG5cblx0Y3R4LmZpbGxUZXh0KHRleHQsIHgsIHkpO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUJhcmNvZGVEYXRhVXJpKEVuY29kaW5nLCBjb2RlLCBvcHRzKSB7XG5cdC8qIGVzbGludCBjb21wbGV4aXR5OjAgKi9cblx0b3B0cyA9IF9hc3NpZ24yWydkZWZhdWx0J10oe30sIGRlZmF1bHRzLCBvcHRzKTtcblxuXHR2YXIgY2FudmFzID0gbmV3IF9DYW52YXMyWydkZWZhdWx0J10oKTtcblx0dmFyIGVuY29kZXIgPSBuZXcgRW5jb2RpbmcoY29kZSk7XG5cblx0Ly8gQWJvcnQgaWYgdGhlIGJhcmNvZGUgZm9ybWF0IGRvZXMgbm90IHN1cHBvcnQgdGhlIGNvbnRlbnRcblx0aWYgKCFlbmNvZGVyLmlzVmFsaWQoKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcignQ29udGVudCBpcyBub3Qgc3VwcG9ydGVkIGJ5IHRoZSBlbmNvZGluZycpO1xuXHR9XG5cblx0Ly8gRW5jb2RlIHRoZSBjb250ZW50XG5cdHZhciBiaW5hcnlTdHJpbmcgPSBlbmNvZGVyLmVuY29kZSgpO1xuXG5cdC8vIEdldCB0aGUgY2FudmFzIGNvbnRleHRcblx0dmFyIGN0eCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG5cdC8vIFNldCB0aGUgd2lkdGggYW5kIGhlaWdodCBvZiB0aGUgYmFyY29kZVxuXHRjYW52YXMud2lkdGggPSBiaW5hcnlTdHJpbmcubGVuZ3RoICogb3B0cy53aWR0aCArIDIgKiBvcHRzLnF1aXRlO1xuXG5cdC8vIFNldCBleHRyYSBoZWlnaHQgaWYgdGhlIHZhbHVlIGlzIGRpc3BsYXllZCB1bmRlciB0aGUgYmFyY29kZS5cblx0Y2FudmFzLmhlaWdodCA9IG9wdHMuaGVpZ2h0ICsgKG9wdHMuZGlzcGxheVZhbHVlID8gb3B0cy5mb250U2l6ZSAqIDEuMyA6IDApO1xuXG5cdC8vIFBhaW50IHRoZSBjYW52YXNcblx0Y3R4LmNsZWFyUmVjdCgwLCAwLCBjYW52YXMud2lkdGgsIGNhbnZhcy5oZWlnaHQpO1xuXG5cdGlmIChvcHRzLmJhY2tncm91bmRDb2xvcikge1xuXHRcdGN0eC5maWxsU3R5bGUgPSBvcHRzLmJhY2tncm91bmRDb2xvcjtcblx0XHRjdHguZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcblx0fVxuXG5cdC8vIENoYW5nZSB0byBsaW5lQ29sb3IgdG8gcGFpbnQgdGhlIGxpbmVzXG5cdGN0eC5maWxsU3R5bGUgPSBvcHRzLmxpbmVDb2xvcjtcblxuXHQvLyBDcmVhdGVzIHRoZSBiYXJjb2RlIG91dCBvZiB0aGUgYmluYXJ5IHN0cmluZ1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGJpbmFyeVN0cmluZy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB4ID0gaSAqIG9wdHMud2lkdGggKyBvcHRzLnF1aXRlO1xuXHRcdGlmIChiaW5hcnlTdHJpbmdbaV0gPT09ICcxJykge1xuXHRcdFx0Y3R4LmZpbGxSZWN0KHgsIDAsIG9wdHMud2lkdGgsIG9wdHMuaGVpZ2h0KTtcblx0XHR9XG5cdH1cblxuXHQvLyBBZGQgdmFsdWUgYmVsb3cgaWYgZW5hYmxlZFxuXHRpZiAob3B0cy5kaXNwbGF5VmFsdWUpIHtcblx0XHRfZHJhd0JhcmNvZGVUZXh0KGNvZGUsIGNhbnZhcywgb3B0cyk7XG5cdH1cblxuXHRyZXR1cm4gY2FudmFzO1xufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzLyQnKS5jb3JlLk9iamVjdC5hc3NpZ247XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9+L2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZGVmID0gcmVxdWlyZSgnLi8kLmRlZicpO1xuJGRlZigkZGVmLlMsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuLyQuYXNzaWduJyl9KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJCAgICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZ2xvYmFsICAgICA9ICQuZ1xuICAsIGNvcmUgICAgICAgPSAkLmNvcmVcbiAgLCBpc0Z1bmN0aW9uID0gJC5pc0Z1bmN0aW9uO1xuZnVuY3Rpb24gY3R4KGZuLCB0aGF0KXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59XG4vLyB0eXBlIGJpdG1hcFxuJGRlZi5GID0gMTsgIC8vIGZvcmNlZFxuJGRlZi5HID0gMjsgIC8vIGdsb2JhbFxuJGRlZi5TID0gNDsgIC8vIHN0YXRpY1xuJGRlZi5QID0gODsgIC8vIHByb3RvXG4kZGVmLkIgPSAxNjsgLy8gYmluZFxuJGRlZi5XID0gMzI7IC8vIHdyYXBcbmZ1bmN0aW9uICRkZWYodHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIGtleSwgb3duLCBvdXQsIGV4cFxuICAgICwgaXNHbG9iYWwgPSB0eXBlICYgJGRlZi5HXG4gICAgLCBpc1Byb3RvICA9IHR5cGUgJiAkZGVmLlBcbiAgICAsIHRhcmdldCAgID0gaXNHbG9iYWwgPyBnbG9iYWwgOiB0eXBlICYgJGRlZi5TXG4gICAgICAgID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSkucHJvdG90eXBlXG4gICAgLCBleHBvcnRzICA9IGlzR2xvYmFsID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSk7XG4gIGlmKGlzR2xvYmFsKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhKHR5cGUgJiAkZGVmLkYpICYmIHRhcmdldCAmJiBrZXkgaW4gdGFyZ2V0O1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgaWYoaXNHbG9iYWwgJiYgIWlzRnVuY3Rpb24odGFyZ2V0W2tleV0pKWV4cCA9IHNvdXJjZVtrZXldO1xuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5CICYmIG93billeHAgPSBjdHgob3V0LCBnbG9iYWwpO1xuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgZWxzZSBpZih0eXBlICYgJGRlZi5XICYmIHRhcmdldFtrZXldID09IG91dCkhZnVuY3Rpb24oQyl7XG4gICAgICBleHAgPSBmdW5jdGlvbihwYXJhbSl7XG4gICAgICAgIHJldHVybiB0aGlzIGluc3RhbmNlb2YgQyA/IG5ldyBDKHBhcmFtKSA6IEMocGFyYW0pO1xuICAgICAgfTtcbiAgICAgIGV4cC5wcm90b3R5cGUgPSBDLnByb3RvdHlwZTtcbiAgICB9KG91dCk7XG4gICAgZWxzZSBleHAgPSBpc1Byb3RvICYmIGlzRnVuY3Rpb24ob3V0KSA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydFxuICAgIGV4cG9ydHNba2V5XSA9IGV4cDtcbiAgICBpZihpc1Byb3RvKShleHBvcnRzLnByb3RvdHlwZSB8fCAoZXhwb3J0cy5wcm90b3R5cGUgPSB7fSkpW2tleV0gPSBvdXQ7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gJGRlZjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5kZWYuanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG52YXIgZ2xvYmFsID0gdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKVxuICAsIGNvcmUgICA9IHt9XG4gICwgZGVmaW5lUHJvcGVydHkgPSBPYmplY3QuZGVmaW5lUHJvcGVydHlcbiAgLCBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5XG4gICwgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3JcbiAgLCBtYXggICA9IE1hdGgubWF4XG4gICwgbWluICAgPSBNYXRoLm1pbjtcbi8vIFRoZSBlbmdpbmUgd29ya3MgZmluZSB3aXRoIGRlc2NyaXB0b3JzPyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5LlxudmFyIERFU0MgPSAhIWZ1bmN0aW9uKCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiAyOyB9fSkuYSA9PSAyO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59KCk7XG52YXIgaGlkZSA9IGNyZWF0ZURlZmluZXIoMSk7XG4vLyA3LjEuNCBUb0ludGVnZXJcbmZ1bmN0aW9uIHRvSW50ZWdlcihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufVxuZnVuY3Rpb24gZGVzYyhiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59XG5mdW5jdGlvbiBzaW1wbGVTZXQob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn1cbmZ1bmN0aW9uIGNyZWF0ZURlZmluZXIoYml0bWFwKXtcbiAgcmV0dXJuIERFU0MgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICAgIHJldHVybiAkLnNldERlc2Mob2JqZWN0LCBrZXksIGRlc2MoYml0bWFwLCB2YWx1ZSkpO1xuICB9IDogc2ltcGxlU2V0O1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChpdCl7XG4gIHJldHVybiBpdCAhPT0gbnVsbCAmJiAodHlwZW9mIGl0ID09ICdvYmplY3QnIHx8IHR5cGVvZiBpdCA9PSAnZnVuY3Rpb24nKTtcbn1cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdmdW5jdGlvbic7XG59XG5mdW5jdGlvbiBhc3NlcnREZWZpbmVkKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufVxuXG52YXIgJCA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi8kLmZ3Jykoe1xuICBnOiBnbG9iYWwsXG4gIGNvcmU6IGNvcmUsXG4gIGh0bWw6IGdsb2JhbC5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gIC8vIGh0dHA6Ly9qc3BlcmYuY29tL2NvcmUtanMtaXNvYmplY3RcbiAgaXNPYmplY3Q6ICAgaXNPYmplY3QsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIHRoYXQ6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIC8vIDcuMS40IFRvSW50ZWdlclxuICB0b0ludGVnZXI6IHRvSW50ZWdlcixcbiAgLy8gNy4xLjE1IFRvTGVuZ3RoXG4gIHRvTGVuZ3RoOiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbiAgfSxcbiAgdG9JbmRleDogZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gICAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICAgIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xuICB9LFxuICBoYXM6IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICAgIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xuICB9LFxuICBjcmVhdGU6ICAgICBPYmplY3QuY3JlYXRlLFxuICBnZXRQcm90bzogICBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gIERFU0M6ICAgICAgIERFU0MsXG4gIGRlc2M6ICAgICAgIGRlc2MsXG4gIGdldERlc2M6ICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIHNldERlc2M6ICAgIGRlZmluZVByb3BlcnR5LFxuICBzZXREZXNjczogICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyxcbiAgZ2V0S2V5czogICAgT2JqZWN0LmtleXMsXG4gIGdldE5hbWVzOiAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICBnZXRTeW1ib2xzOiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICBhc3NlcnREZWZpbmVkOiBhc3NlcnREZWZpbmVkLFxuICAvLyBEdW1teSwgZml4IGZvciBub3QgYXJyYXktbGlrZSBFUzMgc3RyaW5nIGluIGVzNSBtb2R1bGVcbiAgRVM1T2JqZWN0OiBPYmplY3QsXG4gIHRvT2JqZWN0OiBmdW5jdGlvbihpdCl7XG4gICAgcmV0dXJuICQuRVM1T2JqZWN0KGFzc2VydERlZmluZWQoaXQpKTtcbiAgfSxcbiAgaGlkZTogaGlkZSxcbiAgZGVmOiBjcmVhdGVEZWZpbmVyKDApLFxuICBzZXQ6IGdsb2JhbC5TeW1ib2wgPyBzaW1wbGVTZXQgOiBoaWRlLFxuICBlYWNoOiBbXS5mb3JFYWNoXG59KTtcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5pZih0eXBlb2YgX19lICE9ICd1bmRlZmluZWQnKV9fZSA9IGNvcmU7XG5pZih0eXBlb2YgX19nICE9ICd1bmRlZmluZWQnKV9fZyA9IGdsb2JhbDtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJCl7XG4gICQuRlcgICA9IGZhbHNlO1xuICAkLnBhdGggPSAkLmNvcmU7XG4gIHJldHVybiAkO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5mdy5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciAkICAgICAgICA9IHJlcXVpcmUoJy4vJCcpXG4gICwgZW51bUtleXMgPSByZXF1aXJlKCcuLyQuZW51bS1rZXlzJyk7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bnVzZWQtdmFycyAqL1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXVudXNlZC12YXJzICovXG4gIHZhciBUID0gT2JqZWN0KCQuYXNzZXJ0RGVmaW5lZCh0YXJnZXQpKVxuICAgICwgbCA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGkgPSAxO1xuICB3aGlsZShsID4gaSl7XG4gICAgdmFyIFMgICAgICA9ICQuRVM1T2JqZWN0KGFyZ3VtZW50c1tpKytdKVxuICAgICAgLCBrZXlzICAgPSBlbnVtS2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKVRba2V5ID0ga2V5c1tqKytdXSA9IFNba2V5XTtcbiAgfVxuICByZXR1cm4gVDtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9+L2NvcmUtanMvbGlicmFyeS9tb2R1bGVzLyQuYXNzaWduLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyICQgPSByZXF1aXJlKCcuLyQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIga2V5cyAgICAgICA9ICQuZ2V0S2V5cyhpdClcbiAgICAsIGdldERlc2MgICAgPSAkLmdldERlc2NcbiAgICAsIGdldFN5bWJvbHMgPSAkLmdldFN5bWJvbHM7XG4gIGlmKGdldFN5bWJvbHMpJC5lYWNoLmNhbGwoZ2V0U3ltYm9scyhpdCksIGZ1bmN0aW9uKGtleSl7XG4gICAgaWYoZ2V0RGVzYyhpdCwga2V5KS5lbnVtZXJhYmxlKWtleXMucHVzaChrZXkpO1xuICB9KTtcbiAgcmV0dXJuIGtleXM7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy8kLmVudW0ta2V5cy5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9FQU4gPSByZXF1aXJlKCcuL2VhbicpO1xuXG52YXIgX0VBTjIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfRUFOKTtcblxudmFyIF9VUEMgPSByZXF1aXJlKCcuL3VwYycpO1xuXG52YXIgX1VQQzIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfVVBDKTtcblxudmFyIF9JVEYgPSByZXF1aXJlKCcuL2l0ZicpO1xuXG52YXIgX0lURjIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfSVRGKTtcblxudmFyIF9JVEYxNCA9IHJlcXVpcmUoJy4vaXRmMTQnKTtcblxudmFyIF9JVEYxNDIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfSVRGMTQpO1xuXG52YXIgX0NPREUzOSA9IHJlcXVpcmUoJy4vY29kZTM5Jyk7XG5cbnZhciBfQ09ERTM5MiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9DT0RFMzkpO1xuXG52YXIgX0NPREUxMjhCID0gcmVxdWlyZSgnLi9jb2RlMTI4YicpO1xuXG52YXIgX0NPREUxMjhCMiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9DT0RFMTI4Qik7XG5cbnZhciBfQ09ERTEyOEMgPSByZXF1aXJlKCcuL2NvZGUxMjhjJyk7XG5cbnZhciBfQ09ERTEyOEMyID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0NPREUxMjhDKTtcblxudmFyIF9QaGFybWFjb2RlID0gcmVxdWlyZSgnLi9waGFybWFjb2RlJyk7XG5cbnZhciBfUGhhcm1hY29kZTIgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfUGhhcm1hY29kZSk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHtcbiAgRUFOOiBfRUFOMlsnZGVmYXVsdCddLFxuICBVUEM6IF9VUEMyWydkZWZhdWx0J10sXG4gIElURjogX0lURjJbJ2RlZmF1bHQnXSxcbiAgSVRGMTQ6IF9JVEYxNDJbJ2RlZmF1bHQnXSxcbiAgQ09ERTM5OiBfQ09ERTM5MlsnZGVmYXVsdCddLFxuICBDT0RFMTI4QjogX0NPREUxMjhCMlsnZGVmYXVsdCddLFxuICBDT0RFMTI4QzogX0NPREUxMjhDMlsnZGVmYXVsdCddLFxuICBQaGFybWFjb2RlOiBfUGhhcm1hY29kZTJbJ2RlZmF1bHQnXVxufTtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciBjb2RlMzkgPSBbWzAsICcwJywgJzEwMTAwMDExMTAxMTEwMSddLCBbMSwgJzEnLCAnMTExMDEwMDAxMDEwMTExJ10sIFsyLCAnMicsICcxMDExMTAwMDEwMTAxMTEnXSwgWzMsICczJywgJzExMTAxMTEwMDAxMDEwMSddLCBbNCwgJzQnLCAnMTAxMDAwMTExMDEwMTExJ10sIFs1LCAnNScsICcxMTEwMTAwMDExMTAxMDEnXSwgWzYsICc2JywgJzEwMTExMDAwMTExMDEwMSddLCBbNywgJzcnLCAnMTAxMDAwMTAxMTEwMTExJ10sIFs4LCAnOCcsICcxMTEwMTAwMDEwMTExMDEnXSwgWzksICc5JywgJzEwMTExMDAwMTAxMTEwMSddLCBbMTAsICdBJywgJzExMTAxMDEwMDAxMDExMSddLCBbMTEsICdCJywgJzEwMTExMDEwMDAxMDExMSddLCBbMTIsICdDJywgJzExMTAxMTEwMTAwMDEwMSddLCBbMTMsICdEJywgJzEwMTAxMTEwMDAxMDExMSddLCBbMTQsICdFJywgJzExMTAxMDExMTAwMDEwMSddLCBbMTUsICdGJywgJzEwMTExMDExMTAwMDEwMSddLCBbMTYsICdHJywgJzEwMTAxMDAwMTExMDExMSddLCBbMTcsICdIJywgJzExMTAxMDEwMDAxMTEwMSddLCBbMTgsICdJJywgJzEwMTExMDEwMDAxMTEwMSddLCBbMTksICdKJywgJzEwMTAxMTEwMDAxMTEwMSddLCBbMjAsICdLJywgJzExMTAxMDEwMTAwMDExMSddLCBbMjEsICdMJywgJzEwMTExMDEwMTAwMDExMSddLCBbMjIsICdNJywgJzExMTAxMTEwMTAxMDAwMSddLCBbMjMsICdOJywgJzEwMTAxMTEwMTAwMDExMSddLCBbMjQsICdPJywgJzExMTAxMDExMTAxMDAwMSddLCBbMjUsICdQJywgJzEwMTExMDExMTAxMDAwMSddLCBbMjYsICdRJywgJzEwMTAxMDExMTAwMDExMSddLCBbMjcsICdSJywgJzExMTAxMDEwMTExMDAwMSddLCBbMjgsICdTJywgJzEwMTExMDEwMTExMDAwMSddLCBbMjksICdUJywgJzEwMTAxMTEwMTExMDAwMSddLCBbMzAsICdVJywgJzExMTAwMDEwMTAxMDExMSddLCBbMzEsICdWJywgJzEwMDAxMTEwMTAxMDExMSddLCBbMzIsICdXJywgJzExMTAwMDExMTAxMDEwMSddLCBbMzMsICdYJywgJzEwMDAxMDExMTAxMDExMSddLCBbMzQsICdZJywgJzExMTAwMDEwMTExMDEwMSddLCBbMzUsICdaJywgJzEwMDAxMTEwMTExMDEwMSddLCBbMzYsICctJywgJzEwMDAxMDEwMTExMDExMSddLCBbMzcsICcuJywgJzExMTAwMDEwMTAxMTEwMSddLCBbMzgsICcgJywgJzEwMDAxMTEwMTAxMTEwMSddLCBbMzksICckJywgJzEwMDAxMDAwMTAwMDEwMSddLCBbNDAsICcvJywgJzEwMDAxMDAwMTAxMDAwMSddLCBbNDEsICcrJywgJzEwMDAxMDEwMDAxMDAwMSddLCBbNDIsICclJywgJzEwMTAwMDEwMDAxMDAwMSddXTtcblxudmFyIHZhbGlkUmUgPSAvXlswLTlhLXpBLVpcXC1cXC5cXCBcXCRcXC9cXCtcXCVdKyQvO1xuXG52YXIgQ09ERTM5ID0gKGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ09ERTM5KGNvZGUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ09ERTM5KTtcblxuICAgIHRoaXMuY29kZSA9IFN0cmluZyhjb2RlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhDT0RFMzksIFt7XG4gICAga2V5OiAnaXNWYWxpZCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGlzVmFsaWQoKSB7XG4gICAgICByZXR1cm4gdmFsaWRSZS50ZXN0KHRoaXMuY29kZSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RlKCkge1xuICAgICAgdmFyIHN0cmluZyA9IHRoaXMuY29kZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICByZXN1bHQgKz0gJzEwMDAxMDExMTAxMTEwMTAnO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ICs9IHRoaXMuZW5jb2RpbmdCeUNoYXIoc3RyaW5nW2ldKSArICcwJztcbiAgICAgIH1cbiAgICAgIHJlc3VsdCArPSAnMTAwMDEwMTExMDExMTAxMCc7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kaW5nQnlDaGFyJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RpbmdCeUNoYXIoY2hhcikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlMzkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvZGUzOVtpXVsxXSA9PT0gY2hhcikge1xuICAgICAgICAgIHJldHVybiBjb2RlMzlbaV1bMl07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQ09ERTM5O1xufSkoKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQ09ERTM5O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMzkuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbi8vIFRoZSBMIChsZWZ0KSB0eXBlIG9mIGVuY29kaW5nXG52YXIgTGJpbmFyeSA9IHtcbiAgMDogJzAwMDExMDEnLFxuICAxOiAnMDAxMTAwMScsXG4gIDI6ICcwMDEwMDExJyxcbiAgMzogJzAxMTExMDEnLFxuICA0OiAnMDEwMDAxMScsXG4gIDU6ICcwMTEwMDAxJyxcbiAgNjogJzAxMDExMTEnLFxuICA3OiAnMDExMTAxMScsXG4gIDg6ICcwMTEwMTExJyxcbiAgOTogJzAwMDEwMTEnXG59O1xuXG4vLyBUaGUgRyB0eXBlIG9mIGVuY29kaW5nXG52YXIgR2JpbmFyeSA9IHtcbiAgMDogJzAxMDAxMTEnLFxuICAxOiAnMDExMDAxMScsXG4gIDI6ICcwMDExMDExJyxcbiAgMzogJzAxMDAwMDEnLFxuICA0OiAnMDAxMTEwMScsXG4gIDU6ICcwMTExMDAxJyxcbiAgNjogJzAwMDAxMDEnLFxuICA3OiAnMDAxMDAwMScsXG4gIDg6ICcwMDAxMDAxJyxcbiAgOTogJzAwMTAxMTEnXG59O1xuXG4vLyBUaGUgUiAocmlnaHQpIHR5cGUgb2YgZW5jb2RpbmdcbnZhciBSYmluYXJ5ID0ge1xuICAwOiAnMTExMDAxMCcsXG4gIDE6ICcxMTAwMTEwJyxcbiAgMjogJzExMDExMDAnLFxuICAzOiAnMTAwMDAxMCcsXG4gIDQ6ICcxMDExMTAwJyxcbiAgNTogJzEwMDExMTAnLFxuICA2OiAnMTAxMDAwMCcsXG4gIDc6ICcxMDAwMTAwJyxcbiAgODogJzEwMDEwMDAnLFxuICA5OiAnMTExMDEwMCdcbn07XG5cbi8vIFRoZSBsZWZ0IHNpZGUgc3RydWN0dXJlIGluIEVBTi0xM1xudmFyIEVBTnN0cnVjdCA9IHtcbiAgMDogJ0xMTExMTCcsXG4gIDE6ICdMTEdMR0cnLFxuICAyOiAnTExHR0xHJyxcbiAgMzogJ0xMR0dHTCcsXG4gIDQ6ICdMR0xMR0cnLFxuICA1OiAnTEdHTExHJyxcbiAgNjogJ0xHR0dMTCcsXG4gIDc6ICdMR0xHTEcnLFxuICA4OiAnTEdMR0dMJyxcbiAgOTogJ0xHR0xHTCdcbn07XG5cbi8vIFZhbGlkIEVBTiBjb2RlXG52YXIgdmFsaWRSZSA9IC9eWzAtOV17MTN9JC87XG4vLyBUaGUgc3RhcnQgYml0c1xudmFyIHN0YXJ0QmluID0gJzEwMSc7XG4vLyBUaGUgZW5kIGJpdHNcbnZhciBlbmRCaW4gPSAnMTAxJztcbi8vIFRoZSBtaWRkbGUgYml0c1xudmFyIG1pZGRsZUJpbiA9ICcwMTAxMCc7XG5cbnZhciBFQU4gPSAoZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBFQU4oY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBFQU4pO1xuXG4gICAgdGhpcy5jb2RlID0gU3RyaW5nKGNvZGUpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEVBTiwgW3tcbiAgICBrZXk6ICdpc1ZhbGlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICAgIHJldHVybiB2YWxpZFJlLnRlc3QodGhpcy5jb2RlKSAmJiBOdW1iZXIodGhpcy5jb2RlWzEyXSkgPT09IHRoaXMuY2hlY2tzdW0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGVja3N1bScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrc3VtKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTI7IGkgKz0gMikge1xuICAgICAgICByZXN1bHQgKz0gTnVtYmVyKHRoaXMuY29kZVtpXSk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEyOyBpICs9IDIpIHtcbiAgICAgICAgcmVzdWx0ICs9IE51bWJlcih0aGlzLmNvZGVbaV0pICogMztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICgxMCAtIHJlc3VsdCAlIDEwKSAlIDEwO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kZScsXG5cbiAgICAvLyBDcmVhdGUgdGhlIGJpbmFyeSByZXByZXNlbnRhdGlvbiBvZiB0aGUgRUFOIGNvZGVcbiAgICAvLyBudW1iZXIgbmVlZHMgdG8gYmUgYSBzdHJpbmdcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RlKCkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSByZXR1cm4gdmFyaWFibGVcbiAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgLy8gR2V0IHRoZSBmaXJzdCBkaWdpdCAoZm9yIGxhdGVyIGRldGVybWluYXRpb24gb2YgdGhlIGVuY29kaW5nIHR5cGUpXG4gICAgICB2YXIgZmlyc3REaWdpdCA9IHRoaXMuY29kZVswXTtcblxuICAgICAgLy8gR2V0IHRoZSBudW1iZXIgdG8gYmUgZW5jb2RlZCBvbiB0aGUgbGVmdCBzaWRlIG9mIHRoZSBFQU4gY29kZVxuICAgICAgdmFyIGxlZnRTaWRlID0gdGhpcy5jb2RlLnN1YnN0cigxLCA3KTtcblxuICAgICAgLy8gR2V0IHRoZSBudW1iZXIgdG8gYmUgZW5jb2RlZCBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgRUFOIGNvZGVcbiAgICAgIHZhciByaWdodFNpZGUgPSB0aGlzLmNvZGUuc3Vic3RyKDcsIDYpO1xuXG4gICAgICAvLyBBZGQgdGhlIHN0YXJ0IGJpdHNcbiAgICAgIHJlc3VsdCArPSBzdGFydEJpbjtcblxuICAgICAgLy8gQWRkIHRoZSBsZWZ0IHNpZGVcbiAgICAgIHJlc3VsdCArPSB0aGlzLmVuY29kZVN0cnVjdChsZWZ0U2lkZSwgRUFOc3RydWN0W2ZpcnN0RGlnaXRdKTtcblxuICAgICAgLy8gQWRkIHRoZSBtaWRkbGUgYml0c1xuICAgICAgcmVzdWx0ICs9IG1pZGRsZUJpbjtcblxuICAgICAgLy8gQWRkIHRoZSByaWdodCBzaWRlXG4gICAgICByZXN1bHQgKz0gdGhpcy5lbmNvZGVTdHJ1Y3QocmlnaHRTaWRlLCAnUlJSUlJSJyk7XG5cbiAgICAgIC8vIEFkZCB0aGUgZW5kIGJpdHNcbiAgICAgIHJlc3VsdCArPSBlbmRCaW47XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RlU3RydWN0JyxcblxuICAgIC8vIENvbnZlcnQgYSBudW1iZXIgYXJyYXkgdG8gdGhlIHJlcHJlc2VudGluZ1xuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGVTdHJ1Y3QoY29kZVBhcnQsIHN0cnVjdCkge1xuICAgICAgLy8gQ3JlYXRlIHRoZSB2YXJpYWJsZSB0aGF0IHNob3VsZCBiZSByZXR1cm5lZCBhdCB0aGUgZW5kIG9mIHRoZSBmdW5jdGlvblxuICAgICAgdmFyIHJlc3VsdCA9ICcnO1xuXG4gICAgICAvLyBMb29wIGFsbCB0aGUgbnVtYmVyc1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb2RlUGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICAvLyBVc2luZyB0aGUgTCwgRyBvciBSIGVuY29kaW5nIGFuZCBhZGQgaXQgdG8gdGhlIHJldHVybmluZyB2YXJpYWJsZVxuICAgICAgICBpZiAoc3RydWN0W2ldID09PSAnTCcpIHtcbiAgICAgICAgICByZXN1bHQgKz0gTGJpbmFyeVtjb2RlUGFydFtpXV07XG4gICAgICAgIH0gZWxzZSBpZiAoc3RydWN0W2ldID09PSAnRycpIHtcbiAgICAgICAgICByZXN1bHQgKz0gR2JpbmFyeVtjb2RlUGFydFtpXV07XG4gICAgICAgIH0gZWxzZSBpZiAoc3RydWN0W2ldID09PSAnUicpIHtcbiAgICAgICAgICByZXN1bHQgKz0gUmJpbmFyeVtjb2RlUGFydFtpXV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEVBTjtcbn0pKCk7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IEVBTjtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvZWFuLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0VBTjIgPSByZXF1aXJlKCcuL2VhbicpO1xuXG52YXIgX0VBTjMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfRUFOMik7XG5cbnZhciBVUEMgPSAoZnVuY3Rpb24gKF9FQU4pIHtcbiAgZnVuY3Rpb24gVVBDKGNvZGUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgVVBDKTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKFVQQy5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsICcwJyArIGNvZGUpO1xuICB9XG5cbiAgX2luaGVyaXRzKFVQQywgX0VBTik7XG5cbiAgcmV0dXJuIFVQQztcbn0pKF9FQU4zWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBVUEM7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL3VwYy5qc1xuICoqIG1vZHVsZSBpZCA9IDEzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuLy9UaGUgc3RydWN0dXJlIGZvciB0aGUgYWxsIGRpZ2l0cywgMSBpcyB3aWRlIGFuZCAwIGlzIG5hcnJvd1xudmFyIGRpZ2l0U3RydWN0dXJlID0ge1xuICAwOiAnMDAxMTAnLFxuICAxOiAnMTAwMDEnLFxuICAyOiAnMDEwMDEnLFxuICAzOiAnMTEwMDAnLFxuICA0OiAnMDAxMDEnLFxuICA1OiAnMTAxMDAnLFxuICA2OiAnMDExMDAnLFxuICA3OiAnMDAwMTEnLFxuICA4OiAnMTAwMTAnLFxuICA5OiAnMDEwMTAnXG59O1xuXG4vLyBUaGUgc3RhcnQgYml0c1xudmFyIHN0YXJ0QmluID0gJzEwMTAnO1xuLy8gVGhlIGVuZCBiaXRzXG52YXIgZW5kQmluID0gJzExMTAxJztcblxuLy8gUmVnZXhwIGZvciBhIHZhbGlkIEludGVyMjUgY29kZVxudmFyIHZhbGlkUmUgPSAvXihbMC05XVswLTldKSskLztcblxudmFyIElURiA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIElURihjb2RlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElURik7XG5cbiAgICB0aGlzLmNvZGUgPSBTdHJpbmcoY29kZSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoSVRGLCBbe1xuICAgIGtleTogJ2lzVmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgcmV0dXJuIHZhbGlkUmUudGVzdCh0aGlzLmNvZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kZSgpIHtcbiAgICAgIC8vIENyZWF0ZSB0aGUgdmFyaWFibGUgdGhhdCBzaG91bGQgYmUgcmV0dXJuZWQgYXQgdGhlIGVuZCBvZiB0aGUgZnVuY3Rpb25cbiAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgLy8gQWx3YXlzIGFkZCB0aGUgc2FtZSBzdGFydCBiaXRzXG4gICAgICByZXN1bHQgKz0gc3RhcnRCaW47XG5cbiAgICAgIC8vIENhbGN1bGF0ZSBhbGwgdGhlIGRpZ2l0IHBhaXJzXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29kZS5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICByZXN1bHQgKz0gdGhpcy5jYWxjdWxhdGVQYWlyKHRoaXMuY29kZS5zdWJzdHIoaSwgMikpO1xuICAgICAgfVxuXG4gICAgICAvLyBBbHdheXMgYWRkIHRoZSBzYW1lIGVuZCBiaXRzXG4gICAgICByZXN1bHQgKz0gZW5kQmluO1xuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2NhbGN1bGF0ZVBhaXInLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBjYWxjdWxhdGVQYWlyKHR3b051bWJlcnMpIHtcbiAgICAgIHZhciByZXN1bHQgPSAnJztcblxuICAgICAgdmFyIG51bWJlcjFTdHJ1Y3QgPSBkaWdpdFN0cnVjdHVyZVt0d29OdW1iZXJzWzBdXTtcbiAgICAgIHZhciBudW1iZXIyU3RydWN0ID0gZGlnaXRTdHJ1Y3R1cmVbdHdvTnVtYmVyc1sxXV07XG5cbiAgICAgIC8vIFRha2UgZXZlcnkgc2Vjb25kIGJpdCBhbmQgYWRkIHRvIHRoZSByZXN1bHRcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICAgIHJlc3VsdCArPSBudW1iZXIxU3RydWN0W2ldID09PSAnMScgPyAnMTExJyA6ICcxJztcbiAgICAgICAgcmVzdWx0ICs9IG51bWJlcjJTdHJ1Y3RbaV0gPT09ICcxJyA/ICcwMDAnIDogJzAnO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBJVEY7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBJVEY7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2l0Zi5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZCA9IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfTtcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKCd2YWx1ZScgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfaW5oZXJpdHMgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSAnZnVuY3Rpb24nICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9O1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9JVEYyID0gcmVxdWlyZSgnLi9pdGYnKTtcblxudmFyIF9JVEYzID0gX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQoX0lURjIpO1xuXG52YXIgdmFsaWRSZSA9IC9eWzAtOV17MTMsMTR9JC87XG5cbnZhciBJVEYxNCA9IChmdW5jdGlvbiAoX0lURikge1xuICBmdW5jdGlvbiBJVEYxNChjb2RlKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElURjE0KTtcblxuICAgIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKElURjE0LnByb3RvdHlwZSksICdjb25zdHJ1Y3RvcicsIHRoaXMpLmNhbGwodGhpcywgY29kZSk7XG5cbiAgICBpZiAoY29kZS5sZW5ndGggPT09IDEzKSB7XG4gICAgICB0aGlzLmNvZGUgKz0gdGhpcy5jaGVja3N1bSgpO1xuICAgIH1cbiAgfVxuXG4gIF9pbmhlcml0cyhJVEYxNCwgX0lURik7XG5cbiAgX2NyZWF0ZUNsYXNzKElURjE0LCBbe1xuICAgIGtleTogJ2lzVmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgcmV0dXJuIF9nZXQoT2JqZWN0LmdldFByb3RvdHlwZU9mKElURjE0LnByb3RvdHlwZSksICdpc1ZhbGlkJywgdGhpcykuY2FsbCh0aGlzKSAmJiB2YWxpZFJlLnRlc3QodGhpcy5jb2RlKSAmJiBOdW1iZXIodGhpcy5jb2RlWzEzXSkgPT09IHRoaXMuY2hlY2tzdW0oKTtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGVja3N1bScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrc3VtKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IDA7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMTM7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gTnVtYmVyKHRoaXMuY29kZVtpXSkgKiAoMyAtIGkgJSAyICogMik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiAxMCAtIHJlc3VsdCAlIDEwO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBJVEYxNDtcbn0pKF9JVEYzWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBJVEYxNDtcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvaXRmMTQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmICgndmFsdWUnIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG52YXIgX2luaGVyaXRzID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gJ2Z1bmN0aW9uJyAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ1N1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgJyArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfQ09ERTEyODIgPSByZXF1aXJlKCcuL2NvZGUxMjgnKTtcblxudmFyIF9DT0RFMTI4MyA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9DT0RFMTI4Mik7XG5cbnZhciBDT0RFMTI4QiA9IChmdW5jdGlvbiAoX0NPREUxMjgpIHtcbiAgZnVuY3Rpb24gQ09ERTEyOEIoY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDT0RFMTI4Qik7XG5cbiAgICBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihDT0RFMTI4Qi5wcm90b3R5cGUpLCAnY29uc3RydWN0b3InLCB0aGlzKS5jYWxsKHRoaXMsIGNvZGUpO1xuICAgIHRoaXMuc3RhcnRDb2RlID0gMTA0O1xuICB9XG5cbiAgX2luaGVyaXRzKENPREUxMjhCLCBfQ09ERTEyOCk7XG5cbiAgX2NyZWF0ZUNsYXNzKENPREUxMjhCLCBbe1xuICAgIGtleTogJ2VuY29kZUNsYXNzJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RlQ2xhc3MoKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gJyc7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICByZXN1bHQgKz0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ09ERTEyOEIucHJvdG90eXBlKSwgJ2VuY29kaW5nQnlDaGFyJywgdGhpcykuY2FsbCh0aGlzLCB0aGlzLmNvZGVbaV0pO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGVja3N1bScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrc3VtKCkge1xuICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29kZS5sZW5ndGg7IGkrKykge1xuICAgICAgICBzdW0gKz0gX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ09ERTEyOEIucHJvdG90eXBlKSwgJ3dlaWdodEJ5Q2hhcmFjdGVyJywgdGhpcykuY2FsbCh0aGlzLCB0aGlzLmNvZGVbaV0pICogKGkgKyAxKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoc3VtICsgdGhpcy5zdGFydENvZGUpICUgMTAzO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDT0RFMTI4Qjtcbn0pKF9DT0RFMTI4M1snZGVmYXVsdCddKTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gQ09ERTEyOEI7XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL2J1aWxkL25vZGUvZW5jb2RpbmdzL2NvZGUxMjhiLmpzXG4gKiogbW9kdWxlIGlkID0gMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jbGFzc0NhbGxDaGVjayA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcignQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uJyk7IH0gfTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IChmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoJ3ZhbHVlJyBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSkoKTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG4vLyBEYXRhIGZvciBlYWNoIGNoYXJhY3RlclxuLy8gVGhlIGxhc3QgY2hhcmFjdGVycyB3aWxsIG5vdCBiZSBlbmNvZGVkIGJ1dCBhcmUgdXNlZCBmb3IgZXJyb3IgY29ycmVjdGlvblxudmFyIGNvZGUxMjhiID0gW1snICcsICcxMTAxMTAwMTEwMCcsIDBdLCBbJyEnLCAnMTEwMDExMDExMDAnLCAxXSwgWydcIicsICcxMTAwMTEwMDExMCcsIDJdLCBbJyMnLCAnMTAwMTAwMTEwMDAnLCAzXSwgWyckJywgJzEwMDEwMDAxMTAwJywgNF0sIFsnJScsICcxMDAwMTAwMTEwMCcsIDVdLCBbJyYnLCAnMTAwMTEwMDEwMDAnLCA2XSwgWydcXCcnLCAnMTAwMTEwMDAxMDAnLCA3XSwgWycoJywgJzEwMDAxMTAwMTAwJywgOF0sIFsnKScsICcxMTAwMTAwMTAwMCcsIDldLCBbJyonLCAnMTEwMDEwMDAxMDAnLCAxMF0sIFsnKycsICcxMTAwMDEwMDEwMCcsIDExXSwgWycsJywgJzEwMTEwMDExMTAwJywgMTJdLCBbJy0nLCAnMTAwMTEwMTExMDAnLCAxM10sIFsnLicsICcxMDAxMTAwMTExMCcsIDE0XSwgWycvJywgJzEwMTExMDAxMTAwJywgMTVdLCBbJzAnLCAnMTAwMTExMDExMDAnLCAxNl0sIFsnMScsICcxMDAxMTEwMDExMCcsIDE3XSwgWycyJywgJzExMDAxMTEwMDEwJywgMThdLCBbJzMnLCAnMTEwMDEwMTExMDAnLCAxOV0sIFsnNCcsICcxMTAwMTAwMTExMCcsIDIwXSwgWyc1JywgJzExMDExMTAwMTAwJywgMjFdLCBbJzYnLCAnMTEwMDExMTAxMDAnLCAyMl0sIFsnNycsICcxMTEwMTEwMTExMCcsIDIzXSwgWyc4JywgJzExMTAxMDAxMTAwJywgMjRdLCBbJzknLCAnMTExMDAxMDExMDAnLCAyNV0sIFsnOicsICcxMTEwMDEwMDExMCcsIDI2XSwgWyc7JywgJzExMTAxMTAwMTAwJywgMjddLCBbJzwnLCAnMTExMDAxMTAxMDAnLCAyOF0sIFsnPScsICcxMTEwMDExMDAxMCcsIDI5XSwgWyc+JywgJzExMDExMDExMDAwJywgMzBdLCBbJz8nLCAnMTEwMTEwMDAxMTAnLCAzMV0sIFsnQCcsICcxMTAwMDExMDExMCcsIDMyXSwgWydBJywgJzEwMTAwMDExMDAwJywgMzNdLCBbJ0InLCAnMTAwMDEwMTEwMDAnLCAzNF0sIFsnQycsICcxMDAwMTAwMDExMCcsIDM1XSwgWydEJywgJzEwMTEwMDAxMDAwJywgMzZdLCBbJ0UnLCAnMTAwMDExMDEwMDAnLCAzN10sIFsnRicsICcxMDAwMTEwMDAxMCcsIDM4XSwgWydHJywgJzExMDEwMDAxMDAwJywgMzldLCBbJ0gnLCAnMTEwMDAxMDEwMDAnLCA0MF0sIFsnSScsICcxMTAwMDEwMDAxMCcsIDQxXSwgWydKJywgJzEwMTEwMTExMDAwJywgNDJdLCBbJ0snLCAnMTAxMTAwMDExMTAnLCA0M10sIFsnTCcsICcxMDAwMTEwMTExMCcsIDQ0XSwgWydNJywgJzEwMTExMDExMDAwJywgNDVdLCBbJ04nLCAnMTAxMTEwMDAxMTAnLCA0Nl0sIFsnTycsICcxMDAwMTExMDExMCcsIDQ3XSwgWydQJywgJzExMTAxMTEwMTEwJywgNDhdLCBbJ1EnLCAnMTEwMTAwMDExMTAnLCA0OV0sIFsnUicsICcxMTAwMDEwMTExMCcsIDUwXSwgWydTJywgJzExMDExMTAxMDAwJywgNTFdLCBbJ1QnLCAnMTEwMTExMDAwMTAnLCA1Ml0sIFsnVScsICcxMTAxMTEwMTExMCcsIDUzXSwgWydWJywgJzExMTAxMDExMDAwJywgNTRdLCBbJ1cnLCAnMTExMDEwMDAxMTAnLCA1NV0sIFsnWCcsICcxMTEwMDAxMDExMCcsIDU2XSwgWydZJywgJzExMTAxMTAxMDAwJywgNTddLCBbJ1onLCAnMTExMDExMDAwMTAnLCA1OF0sIFsnWycsICcxMTEwMDAxMTAxMCcsIDU5XSwgWydcXFxcJywgJzExMTAxMTExMDEwJywgNjBdLCBbJ10nLCAnMTEwMDEwMDAwMTAnLCA2MV0sIFsnXicsICcxMTExMDAwMTAxMCcsIDYyXSwgWydfJywgJzEwMTAwMTEwMDAwJywgNjNdLCBbJ2AnLCAnMTAxMDAwMDExMDAnLCA2NF0sIFsnYScsICcxMDAxMDExMDAwMCcsIDY1XSwgWydiJywgJzEwMDEwMDAwMTEwJywgNjZdLCBbJ2MnLCAnMTAwMDAxMDExMDAnLCA2N10sIFsnZCcsICcxMDAwMDEwMDExMCcsIDY4XSwgWydlJywgJzEwMTEwMDEwMDAwJywgNjldLCBbJ2YnLCAnMTAxMTAwMDAxMDAnLCA3MF0sIFsnZycsICcxMDAxMTAxMDAwMCcsIDcxXSwgWydoJywgJzEwMDExMDAwMDEwJywgNzJdLCBbJ2knLCAnMTAwMDAxMTAxMDAnLCA3M10sIFsnaicsICcxMDAwMDExMDAxMCcsIDc0XSwgWydrJywgJzExMDAwMDEwMDEwJywgNzVdLCBbJ2wnLCAnMTEwMDEwMTAwMDAnLCA3Nl0sIFsnbScsICcxMTExMDExMTAxMCcsIDc3XSwgWyduJywgJzExMDAwMDEwMTAwJywgNzhdLCBbJ28nLCAnMTAwMDExMTEwMTAnLCA3OV0sIFsncCcsICcxMDEwMDExMTEwMCcsIDgwXSwgWydxJywgJzEwMDEwMTExMTAwJywgODFdLCBbJ3InLCAnMTAwMTAwMTExMTAnLCA4Ml0sIFsncycsICcxMDExMTEwMDEwMCcsIDgzXSwgWyd0JywgJzEwMDExMTEwMTAwJywgODRdLCBbJ3UnLCAnMTAwMTExMTAwMTAnLCA4NV0sIFsndicsICcxMTExMDEwMDEwMCcsIDg2XSwgWyd3JywgJzExMTEwMDEwMTAwJywgODddLCBbJ3gnLCAnMTExMTAwMTAwMTAnLCA4OF0sIFsneScsICcxMTAxMTAxMTExMCcsIDg5XSwgWyd6JywgJzExMDExMTEwMTEwJywgOTBdLCBbJ3snLCAnMTExMTAxMTAxMTAnLCA5MV0sIFsnfCcsICcxMDEwMTExMTAwMCcsIDkyXSwgWyd9JywgJzEwMTAwMDExMTEwJywgOTNdLCBbJ34nLCAnMTAwMDEwMTExMTAnLCA5NF0sIFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEyNyksICcxMDExMTEwMTAwMCcsIDk1XSwgW1N0cmluZy5mcm9tQ2hhckNvZGUoMTI4KSwgJzEwMTExMTAwMDEwJywgOTZdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMjkpLCAnMTExMTAxMDEwMDAnLCA5N10sIFtTdHJpbmcuZnJvbUNoYXJDb2RlKDEzMCksICcxMTExMDEwMDAxMCcsIDk4XSwgW1N0cmluZy5mcm9tQ2hhckNvZGUoMTMxKSwgJzEwMTExMDExMTEwJywgOTldLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMzIpLCAnMTAxMTExMDExMTAnLCAxMDBdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMzMpLCAnMTExMDEwMTExMTAnLCAxMDFdLCBbU3RyaW5nLmZyb21DaGFyQ29kZSgxMzQpLCAnMTExMTAxMDExMTAnLCAxMDJdLFxuLy9TdGFydCBjb2Rlc1xuW1N0cmluZy5mcm9tQ2hhckNvZGUoMTM1KSwgJzExMDEwMDAwMTAwJywgMTAzXSwgW1N0cmluZy5mcm9tQ2hhckNvZGUoMTM2KSwgJzExMDEwMDEwMDAwJywgMTA0XSwgW1N0cmluZy5mcm9tQ2hhckNvZGUoMTM3KSwgJzExMDEwMDExMTAwJywgMTA1XV07XG5cbnZhciBlbmRCaW4gPSAnMTEwMDAxMTEwMTAxMSc7XG52YXIgdmFsaWRSZSA9IC9eWyEtfiBdKyQvO1xuXG52YXIgQ09ERTEyOCA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIENPREUxMjgoY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBDT0RFMTI4KTtcblxuICAgIHRoaXMuY29kZSA9IFN0cmluZyhjb2RlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhDT0RFMTI4LCBbe1xuICAgIGtleTogJ2lzVmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgcmV0dXJuIHZhbGlkUmUudGVzdCh0aGlzLmNvZGUpO1xuICAgIH1cbiAgfSwge1xuICAgIGtleTogJ2VuY29kZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kZShlbmNvZGVGbiwgc3RhcnRDb2RlLCBjaGVja3N1bUZuKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gJyc7XG5cbiAgICAgIC8vQWRkIHRoZSBzdGFydCBiaXRzXG4gICAgICByZXN1bHQgKz0gdGhpcy5lbmNvZGluZ0J5SWQodGhpcy5zdGFydENvZGUpO1xuXG4gICAgICAvL0FkZCB0aGUgZW5jb2RlZCBiaXRzXG4gICAgICByZXN1bHQgKz0gdGhpcy5lbmNvZGVDbGFzcygpO1xuXG4gICAgICAvL0FkZCB0aGUgY2hlY2tzdW1cbiAgICAgIHJlc3VsdCArPSB0aGlzLmVuY29kaW5nQnlJZCh0aGlzLmNoZWNrc3VtKCkpO1xuXG4gICAgICAvL0FkZCB0aGUgZW5kIGJpdHNcbiAgICAgIHJlc3VsdCArPSBlbmRCaW47XG5cbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnZW5jb2RpbmdCeUlkJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZW5jb2RpbmdCeUlkKGlkKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvZGUxMjhiLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChjb2RlMTI4YltpXVsyXSA9PT0gaWQpIHtcbiAgICAgICAgICByZXR1cm4gY29kZTEyOGJbaV1bMV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiAnJztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICd3ZWlnaHRCeUNoYXJhY3RlcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIHdlaWdodEJ5Q2hhcmFjdGVyKGNoYXIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZTEyOGIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvZGUxMjhiW2ldWzBdID09PSBjaGFyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGUxMjhiW2ldWzJdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmNvZGluZ0J5Q2hhcicsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuY29kaW5nQnlDaGFyKGNoYXIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29kZTEyOGIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNvZGUxMjhiW2ldWzBdID09PSBjaGFyKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGUxMjhiW2ldWzFdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENPREUxMjg7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDT0RFMTI4O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9jb2RlMTI4LmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9O1xuXG52YXIgX2NsYXNzQ2FsbENoZWNrID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKTsgfSB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gKGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmICgndmFsdWUnIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoJ3ZhbHVlJyBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxudmFyIF9pbmhlcml0cyA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09ICdmdW5jdGlvbicgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH07XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX0NPREUxMjgyID0gcmVxdWlyZSgnLi9jb2RlMTI4Jyk7XG5cbnZhciBfQ09ERTEyODMgPSBfaW50ZXJvcFJlcXVpcmVXaWxkY2FyZChfQ09ERTEyODIpO1xuXG52YXIgQ09ERTEyOEMgPSAoZnVuY3Rpb24gKF9DT0RFMTI4KSB7XG4gIGZ1bmN0aW9uIENPREUxMjhDKGNvZGUpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ09ERTEyOEMpO1xuXG4gICAgX2dldChPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ09ERTEyOEMucHJvdG90eXBlKSwgJ2NvbnN0cnVjdG9yJywgdGhpcykuY2FsbCh0aGlzLCBjb2RlKTtcbiAgICB0aGlzLmNvZGUgPSB0aGlzLmNvZGUucmVwbGFjZSgvIC9nLCAnJyk7XG4gICAgdGhpcy5zdGFydENvZGUgPSAxMDU7XG4gIH1cblxuICBfaW5oZXJpdHMoQ09ERTEyOEMsIF9DT0RFMTI4KTtcblxuICBfY3JlYXRlQ2xhc3MoQ09ERTEyOEMsIFt7XG4gICAga2V5OiAnZW5jb2RlQ2xhc3MnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGVDbGFzcygpIHtcbiAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jb2RlLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgIHJlc3VsdCArPSBfZ2V0KE9iamVjdC5nZXRQcm90b3R5cGVPZihDT0RFMTI4Qy5wcm90b3R5cGUpLCAnZW5jb2RpbmdCeUlkJywgdGhpcykuY2FsbCh0aGlzLCBOdW1iZXIodGhpcy5jb2RlLnN1YnN0cihpLCAyKSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdjaGVja3N1bScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNoZWNrc3VtKCkge1xuICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICB2YXIgdyA9IDE7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY29kZS5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICBzdW0gKz0gTnVtYmVyKHRoaXMuY29kZS5zdWJzdHIoaSwgMikpICogdztcbiAgICAgICAgdysrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChzdW0gKyB0aGlzLnN0YXJ0Q29kZSkgJSAxMDM7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIENPREUxMjhDO1xufSkoX0NPREUxMjgzWydkZWZhdWx0J10pO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBDT0RFMTI4Qztcbm1vZHVsZS5leHBvcnRzID0gZXhwb3J0c1snZGVmYXVsdCddO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvYnVpbGQvbm9kZS9lbmNvZGluZ3MvY29kZTEyOGMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlV2lsZGNhcmQgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH07XG5cbnZhciBfY2xhc3NDYWxsQ2hlY2sgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpOyB9IH07XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSAoZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKCd2YWx1ZScgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0pKCk7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3JlcGVhdCA9IHJlcXVpcmUoJ2NvcmUtanMvbGlicmFyeS9mbi9zdHJpbmcvcmVwZWF0Jyk7XG5cbnZhciBfcmVwZWF0MiA9IF9pbnRlcm9wUmVxdWlyZVdpbGRjYXJkKF9yZXBlYXQpO1xuXG52YXIgUGhhcm1hY29kZSA9IChmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIFBoYXJtYWNvZGUoY29kZSkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBQaGFybWFjb2RlKTtcblxuICAgIHRoaXMuY29kZSA9IE51bWJlcihjb2RlKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhQaGFybWFjb2RlLCBbe1xuICAgIGtleTogJ2lzVmFsaWQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBpc1ZhbGlkKCkge1xuICAgICAgcmV0dXJuIHRoaXMuY29kZSA+PSAzICYmIHRoaXMuY29kZSA8PSAxMzEwNzA7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiAnX2NhbGNaZXJvcycsXG5cbiAgICAvLyBBIGhlbHBlciBmdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIHplcm9zIGF0IHRoZSBlbmQgb2YgYSBzdHJpbmdcbiAgICB2YWx1ZTogZnVuY3Rpb24gX2NhbGNaZXJvcyhjb2RlKSB7XG4gICAgICB2YXIgaSA9IGNvZGUubGVuZ3RoIC0gMTtcbiAgICAgIHZhciB6ZXJvcyA9IDA7XG4gICAgICB3aGlsZSAoY29kZVtpXSA9PT0gJzAnIHx8IGkgPCAwKSB7XG4gICAgICAgIHplcm9zKys7XG4gICAgICAgIGktLTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB6ZXJvcztcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmNvZGVCaW5hcnknLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGVCaW5hcnkoY29kZSwgc3RhdGUpIHtcbiAgICAgIGlmIChjb2RlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9dmFyIGdlbmVyYXRlZCA9IHVuZGVmaW5lZDtcbiAgICAgIHZhciBuZXh0U3RhdGUgPSBmYWxzZTtcbiAgICAgIHZhciBuWmVyb3MgPSB0aGlzLl9jYWxjWmVyb3MoY29kZSk7XG5cbiAgICAgIGlmIChuWmVyb3MgPT09IDApIHtcbiAgICAgICAgZ2VuZXJhdGVkID0gc3RhdGUgPyAnMDAxJyA6ICcwMDExMSc7XG4gICAgICAgIG5leHRTdGF0ZSA9IHN0YXRlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ2VuZXJhdGVkID0gX3JlcGVhdDJbJ2RlZmF1bHQnXSgnMDAxJywgblplcm9zIC0gKHN0YXRlID8gMSA6IDApKTtcbiAgICAgICAgZ2VuZXJhdGVkICs9ICcwMDExMSc7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5lbmNvZGVCaW5hcnkoY29kZS5zdWJzdHIoMCwgY29kZS5sZW5ndGggLSBuWmVyb3MgLSAxKSwgbmV4dFN0YXRlKSArIGdlbmVyYXRlZDtcbiAgICB9XG4gIH0sIHtcbiAgICBrZXk6ICdlbmNvZGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmNvZGUoKSB7XG4gICAgICByZXR1cm4gdGhpcy5lbmNvZGVCaW5hcnkodGhpcy5jb2RlLnRvU3RyaW5nKDIpLCB0cnVlKS5zdWJzdHIoMik7XG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIFBoYXJtYWNvZGU7XG59KSgpO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSBQaGFybWFjb2RlO1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vaW8tYmFyY29kZS9idWlsZC9ub2RlL2VuY29kaW5ncy9waGFybWFjb2RlLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy8kJykuY29yZS5TdHJpbmcucmVwZWF0O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2lvLWJhcmNvZGUvfi9jb3JlLWpzL2xpYnJhcnkvZm4vc3RyaW5nL3JlcGVhdC5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgJGRlZiA9IHJlcXVpcmUoJy4vJC5kZWYnKTtcblxuJGRlZigkZGVmLlAsICdTdHJpbmcnLCB7XG4gIC8vIDIxLjEuMy4xMyBTdHJpbmcucHJvdG90eXBlLnJlcGVhdChjb3VudClcbiAgcmVwZWF0OiByZXF1aXJlKCcuLyQuc3RyaW5nLXJlcGVhdCcpXG59KTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5yZXBlYXQuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xudmFyICQgPSByZXF1aXJlKCcuLyQnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByZXBlYXQoY291bnQpe1xuICB2YXIgc3RyID0gU3RyaW5nKCQuYXNzZXJ0RGVmaW5lZCh0aGlzKSlcbiAgICAsIHJlcyA9ICcnXG4gICAgLCBuICAgPSAkLnRvSW50ZWdlcihjb3VudCk7XG4gIGlmKG4gPCAwIHx8IG4gPT0gSW5maW5pdHkpdGhyb3cgUmFuZ2VFcnJvcihcIkNvdW50IGNhbid0IGJlIG5lZ2F0aXZlXCIpO1xuICBmb3IoO24gPiAwOyAobiA+Pj49IDEpICYmIChzdHIgKz0gc3RyKSlpZihuICYgMSlyZXMgKz0gc3RyO1xuICByZXR1cm4gcmVzO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvJC5zdHJpbmctcmVwZWF0LmpzXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlxudmFyIENhbnZhcyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gQ2FudmFzICh3LCBoKSB7XG4gIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxuICBjYW52YXMud2lkdGggPSB3IHx8IDMwMFxuICBjYW52YXMuaGVpZ2h0ID0gaCB8fCAxNTBcbiAgcmV0dXJuIGNhbnZhc1xufVxuXG5DYW52YXMuSW1hZ2UgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICByZXR1cm4gaW1nXG59XG5cblxuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9pby1iYXJjb2RlL34vY2FudmFzLWJyb3dzZXJpZnkvYnJvd3Nlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9