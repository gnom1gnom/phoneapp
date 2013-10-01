'use strict';

describe('Directive', function() {
  // load the directive's module
  beforeEach(module('phoneappApp'));

  describe('price', function() {
    var element, scope, ctrl, form;


    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();

      element = angular.element('<form name="productForm" class="form-horizontal"><div class="well no-top"><fieldset><div class="control-group" ng-class="{error: productForm.price.$error.float}"><label class="control-label" for="price">Price</label><div class="controls"><input min="0" ng-model="product.price" class="input-xlarge" id="price" name="price" type="number" required price><span ng-show="productForm.price.$error.float" class="help-inline">Niepoprawny format ceny</span></div></fieldset></div></form>');

      element = $compile(element)(scope);
      scope.$digest();

      form = scope.productForm;
    }));

    it('should validate price - abc', inject(function($compile) {
      // wpisujemy wartośc do pola    
      form.price.$setViewValue("abc");

      expect(form.price.$error.float).toBe(true);
      expect(form.price.$valid).toBe(false);
    }));

    it('should validate price - 110', inject(function($compile) {
      // wpisujemy wartośc do pola    
      form.price.$setViewValue("110");

      expect(form.price.$error.float).toBe(false);
      expect(form.price.$valid).toBe(true);
    }));

    it('should validate price - 325.54', inject(function($compile) {
      // wpisujemy wartośc do pola    
      form.price.$setViewValue("325.54");

      expect(form.price.$error.float).toBe(false);
      expect(form.price.$valid).toBe(true);
    }));
  });

  describe('integer', function() {
    var element, scope, ctrl, form;


    beforeEach(inject(function($rootScope, $compile) {
      scope = $rootScope.$new();

      element = angular.element('<form name="productForm" class="form-horizontal"><div class="well no-top"><fieldset> <div class="control-group" ng-class="{error: productForm.stock.$error.integer}"><label class="control-label" for="stock">Stock</label><div class="controls"><input ng-model="product.stock" type="number" min="0" class="input-xlarge" id="stock" name="stock" required integer><span ng-show="productForm.stock.$error.integer" class="help-inline">Niepoprawna ilość</span></div></div></fieldset></div></form>');

      element = $compile(element)(scope);
      scope.$digest();

      form = scope.productForm;
    }));

    it('should validate integer - abc', inject(function($compile) {
      // wpisujemy wartośc do pola    
      form.stock.$setViewValue("abc");

      expect(form.stock.$error.integer).toBe(true);
      expect(form.stock.$valid).toBe(false);
    }));

    it('should validate integer - 110', inject(function($compile) {
      // wpisujemy wartośc do pola    
      form.stock.$setViewValue("110");

      expect(form.stock.$error.integer).toBe(false);
      expect(form.stock.$valid).toBe(true);
    }));

    it('should validate integer - 325.54', inject(function($compile) {
      // wpisujemy wartośc do pola    
      form.stock.$setViewValue("325.54");

      expect(form.stock.$error.integer).toBe(true);
      expect(form.stock.$valid).toBe(false);
    }));
  });
});