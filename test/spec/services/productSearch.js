'use strict';

describe('Service: productSearch', function () {

  // load the service's module
  beforeEach(module('phoneappApp'));

  // instantiate service
  var productSearch;
  beforeEach(inject(function (_productSearch_) {
    productSearch = _productSearch_;
  }));

  it('should do something', function () {
    expect(!!productSearch).toBe(true);
  });

});
