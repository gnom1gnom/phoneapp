'use strict';

describe('Controller: ProductsearchCtrl', function () {

  // load the controller's module
  beforeEach(module('phoneappApp'));

  var ProductsearchCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ProductsearchCtrl = $controller('ProductsearchCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
