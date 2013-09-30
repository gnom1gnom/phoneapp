'use strict';

describe('Service: product', function() {

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
  var product;
  beforeEach(inject(function(_Product_) {
    product = _Product_;
  }));


  it('should do something', function() {
    expect( !! product).toBe(true);
  });

  var productList = [{
    "created":      "2013-09-13T01:54:39.172+0200",
    "category_id":  3,
    "name":         "uderzonymi palnęłabyś grymaścież tapczanem holistyczni",
    "price":        "889.65",
    "id":           1,
    "stock":        26,
    "description":  "magdeburkom yukki",
    "tags":         [1, 2]
  }, {
    "created":      "2013-09-13T01:54:39.172+0200",
    "category_id":  2,
    "name":         "ufajdałybyście montmorylonitem bosmańsku etablowani",
    "price":        "255.73",
    "id":           2,
    "stock":        21,
    "description":  "akcydensistek aeroplanowymi transponowałoś chazmozaurów animatyzmu",
    "tags":         [2, 3]
  }];

  describe('MultiProductLoader', function() {
    var mockBackend, product, loader;

    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function(_$httpBackend_, Product, MultiProductLoader) {
      product = Product;
      mockBackend = _$httpBackend_;
      loader = MultiProductLoader;
    }));

    it('should load list of products', function() {
      mockBackend.expectGET('http://llewandowski.waw.eo.pl:3000/api/products').respond(productList);

      var products;

      var promise = loader();
      promise.then(function(rec) {
        products = rec;
      });

      expect(products).toBeUndefined();

      mockBackend.flush();

      expect(products).toEqualData(productList);
    });
  });

});