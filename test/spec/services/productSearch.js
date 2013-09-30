'use strict';

describe('Service: productSearch', function() {

  // load the service's module
  beforeEach(module('phoneappApp'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  var searchQuery = {
    "limit": "50",
    "q": "ani",
    "tags": [1,2],
    "category_id": 5
  };

  var searchResults = {
    "facet": [{
      "name": "category_id",
      "data": {"5": 2}
    }, {
      "name": "tags",
      "data": {"1": 2, "2": 2, "3": 1, "4": 1, "5": 1}
    }],
    "data": [{
      "name": "mikrofalowaniem brzeski",
      "stock": 27,
      "description": "faksowa cenniejsi laszowaliby ugryzłybyśmy acetanilidami ignorowałbyś",
      "tags": ["1", "2"],
      "created": "2013-09-13 13:54:39.172909+02",
      "category_id": "5",
      "id": "61",
      "updated": null,
      "price": "297.86"
    }, {
      "name": "papiarniom rozagitowania luftuj aplikowałbyś dwupakiem",
      "stock": 79,
      "description": "kolędującymi grzybicami uszankom zaprzałaś apoptoz",
      "tags": ["2", "5", "4", "1", "3"],
      "created": "2013-09-13 13:54:39.172909+02",
      "category_id": "5",
      "id": "66",
      "updated": null,
      "price": "551.20"
    }],
    "meta": {
      "total": 2
    }
  };

  var suggestResults = ["mikrofalowaniem brzeski","papiarniom rozagitowania luftuj aplikowałbyś dwupakiem","rozagitowania"];

  describe('ProductSearchResultLoader', function() {
    var mockBackend, searchService;

    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function(_$httpBackend_, ProductSearchResultLoader) {
      mockBackend = _$httpBackend_;
      searchService = ProductSearchResultLoader;
    }));

    it('should load list of search results', function() {
      mockBackend.expectGET('http://llewandowski.waw.eo.pl:3000/search?category_id=5&limit=50&q=ani&tags=1&tags=2').respond(searchResults);

      var result;

      var promise = searchService.search(searchQuery);
      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();

      mockBackend.flush();

      expect(result).toEqualData(searchResults);
    });

    it('should load list suggest hints', function() {
      mockBackend.expectGET('http://llewandowski.waw.eo.pl:3000/suggest?category_id=5&limit=50&q=ani&tags=1&tags=2').respond(searchResults);

      var result;

      var promise = searchService.suggest(searchQuery);
      promise.then(function(rec) {
        result = rec;
      });

      expect(result).toBeUndefined();

      mockBackend.flush();

      expect(result).toEqualData(searchResults);
    });
  });

});