'use strict';

describe('Service: category', function() {

  // load the service's module
  beforeEach(module('phoneappApp'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // instantiate service
  var category;
  beforeEach(inject(function(_Category_) {
    category = _Category_;
  }));

  it('should do something', function() {
    expect( !! category).toBe(true);
  });

  describe('MultiCategoryLoader', function() {
    var mockBackend, category, loader;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function(_$httpBackend_, Category, MultiCategoryLoader) {
      category = Category;
      mockBackend = _$httpBackend_;
      loader = MultiCategoryLoader;
    }));

    it('should load list of categories', function() {
      mockBackend.expectGET('http://llewandowski.waw.eo.pl:3000/api/categories').respond([{
        "name": "Kategoria A",
        "id": 1
      }, {
        "name": "Kategoria B",
        "id": 2
      }, {
        "name": "Kategoria C",
        "id": 3
      }]);

      var categories;

      var promise = loader();
      promise.then(function(rec) {
        categories = rec;
      });

      expect(categories).toBeUndefined();

      mockBackend.flush();

      expect(categories).toEqualData([{
        "name": "Kategoria A",
        "id": 1
      }, {
        "name": "Kategoria B",
        "id": 2
      }, {
        "name": "Kategoria C",
        "id": 3
      }]);
    });
  });

});