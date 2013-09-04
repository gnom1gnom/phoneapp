'use strict';

describe('Filter: facetOptionFilter', function () {

  // load the filter's module
  beforeEach(module('phoneappApp'));

  // initialize a new instance of the filter before each test
  var facetOptionFilter;
  beforeEach(inject(function ($filter) {
    facetOptionFilter = $filter('facetOptionFilter');
  }));

  it('should return the input prefixed with "facetOptionFilter filter:"', function () {
    var text = 'angularjs';
    expect(facetOptionFilter(text)).toBe('facetOptionFilter filter: ' + text);
  });

});
