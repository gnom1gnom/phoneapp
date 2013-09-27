'use strict';

describe('Service: tag', function () {

  // load the service's module
  beforeEach(module('phoneappApp'));

  // instantiate service
  var tag;
  beforeEach(inject(function (_Tag_) {
    tag = _Tag_;
  }));

  it('should do something', function () {
    expect(!!tag).toBe(true);
  });

});
