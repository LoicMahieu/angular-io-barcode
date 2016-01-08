/*global describe, it, beforeEach, expect, inject*/

var angular = require('angular')
window.angular = angular

require('angular-mocks')
var module = window.module

describe('Angular IO Barcode', function () {
  var $compile
  var $rootScope

  beforeEach(module(require('../lib/angular-io-barcode').name))

  beforeEach(inject(function (_$compile_, _$rootScope_) {
    $compile = _$compile_
    $rootScope = _$rootScope_
  }))

  beforeEach(inject(function ($ioBarcode) {
    $ioBarcode.CODE128B = function (code, options) {
      return {
        toDataURL: function () {
          return 'CODE128B-' + code
        }
      }
    }
    $ioBarcode.CODE128C = function (code, options) {
      return {
        toDataURL: function () {
          return 'CODE128C-' + code
        }
      }
    }
  }))

  it('Creates a simple io-barcode directive', function () {
    var element = $compile('<io-barcode code=123 type=CODE128B></io-barcode>')($rootScope)
    $rootScope.$digest()
    expect(element.attr('src')).toEqual('CODE128B-123')
  })

  it('Creates a simple io-barcode directive with binding', function () {
    $rootScope.code = 123
    $rootScope.type = 'CODE128B'
    var element = $compile('<io-barcode code="{{ code }}" type="{{ type }}"></io-barcode>')($rootScope)
    $rootScope.$digest()
    expect(element.attr('src')).toEqual('CODE128B-123')

    $rootScope.type = 'CODE128C'
    $rootScope.$digest()
    expect(element.attr('src')).toEqual('CODE128C-123')

    $rootScope.code = 456
    $rootScope.$digest()
    expect(element.attr('src')).toEqual('CODE128C-456')
  })
})
