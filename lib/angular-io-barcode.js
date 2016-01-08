
'use strict'

var angular = require('angular')
var ioBarcode = require('io-barcode')

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
