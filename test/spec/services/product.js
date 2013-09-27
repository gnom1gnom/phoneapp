'use strict';

describe('Service: product', function () {

  // load the service's module
  beforeEach(module('phoneappApp'));

  // instantiate service
  var product;
  beforeEach(inject(function (_Product_) {
    product = _Product_;
  }));

  it('should do something', function () {
    expect(!!product).toBe(true);
  });

});
