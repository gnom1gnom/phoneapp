'use strict';

describe('Filter: facetOptionFilter', function() {

  // load the filter's module
  beforeEach(module('phoneappApp'));

  // initialize a new instance of the filter before each test
  var facetOptionFilter;
  beforeEach(inject(function($filter) {
    facetOptionFilter = $filter('facetOptionFilter');
  }));

  var searchResponse;
  beforeEach(function() {
    searchResponse = {
      "facet": [{
        "name": "category_id",
        "data": {
          "2": 7,
          "3": 9,
          "4": 9
        }
      }, {
        "name": "tags",
        "data": {}
      }],
      "data": [{"name": "abc", "stock": 26, "description": "def", "tags": ["1", "2"], "created": "2013-09-13 13:54:39.172909+02",
        "category_id": "3", "id": "1", "updated": null,"price": "123.45"}],
      "meta": {"total": 1}
    };
  });

  it('should return non-empty facets"', function() {
    var filteredFacet = [{
      "name": "category_id",
      "data": {
        "2": 7,
        "3": 9,
        "4": 9
      }
    }];

    expect(facetOptionFilter(searchResponse.facet)).toEqual(filteredFacet);
  });

  it('should preserve empty facets if present in query"', function() {
    var query = {
      "limit": "50",
      "tags": [2],
      "q": "abc"
    };

    var filteredFacet = [{
      "name": "category_id",
      "data": {
        "2": 7,
        "3": 9,
        "4": 9
      }
    }, {
      "name": "tags",
      "data": {
        "2": 0
      }
    }];

    expect(facetOptionFilter(searchResponse.facet, query)).toEqual(filteredFacet);
  });

});