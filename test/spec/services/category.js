'use strict';

describe('Service: category', function () {

  // load the service's module
  beforeEach(module('phoneappApp'));

  // instantiate service
  var category;
  beforeEach(inject(function (_Category_) {
    category = _Category_;
  }));

  it('should do something', function () {
    expect(!!category).toBe(true);
  });

});
