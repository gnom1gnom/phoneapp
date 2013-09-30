'use strict';

describe('Directive: directive', function() {

  // load the directive's module
  beforeEach(module('phoneappApp'));

  var element, scope, ctrl, form;


  beforeEach(inject(function($rootScope, $compile) {
    scope = $rootScope.$new();
    scope.product = {
      price: 0;
    }

    element = angular.element('<form name="productForm" class="form-horizontal"><div class="well no-top"><fieldset><div class="control-group" ng-class="{error: productForm.price.$error.float}"><label class="control-label" for="price">Price</label><div class="controls"><input min="0" ng-model="product.price" class="input-xlarge" id="price" name="price" type="number" required price><span ng-show="productForm.price.$error.float" class="help-inline">Niepoprawny format ceny</span></div></fieldset></div></form>');

    element = $compile(element)(scope);
    scope.$digest();

    form = scope.productForm
  }));

  it('should validate price - abc', inject(function($compile) {
    // wpisujemy wartośc do pola    
    form.price.$setViewValue("abc");

    expect(scope.product.price).toBe("abc");
    expect(form.price.$error.float).toBe(true);
    expect(form.price.$valid).toBe(false);
  }));

  it('should validate price - 110', inject(function($compile) {
    // wpisujemy wartośc do pola    
    form.price.$setViewValue("110");

    expect(scope.product.price).toBe("110");
    expect(form.price.$error.float).toBe(false);
    expect(form.price.$valid).toBe(true);
  }));

  it('should validate price - 325.54', inject(function($compile) {
    // wpisujemy wartośc do pola    
    form.price.$setViewValue("325.54");

    expect(scope.product.price).toBe("325.54");
    expect(form.price.$error.float).toBe(false);
    expect(form.price.$valid).toBe(true);
  }));
});