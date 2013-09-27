'use strict';

describe('Controllers', function() {
  var $scope, ctrl;
  var categoriesMock, tagsMock;

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

  //you need to indicate your module in a test
  beforeEach(module('phoneappApp'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(function() {
    categoriesMock = {
      get: function() {
        return [{ "name": "Kategoria A", "id": 1}, { "name": "Kategoria B", "id": 2}, { "name": "Kategoria C", "id": 3}];
      }
    };
    module(function($provide) {
      $provide.value('categories', categoriesMock);
    });

    tagsMock = {
      get: function() {
        return [{ "name": "Tag A", "id": 1}, { "name": "Tag B", "id": 2}, { "name": "Tag C", "id": 3}];
      }
    };
    module(function($provide) {
      $provide.value('tags', tagsMock);
    });

  });

  describe('ProductListCtrl', function() {
    var mockBackend, product;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Product) {
      product = Product;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('ProductListCtrl', {
        $scope: $scope,
        products: productList
      });
    }));

    it('should have list of products', function() {
      expect($scope.products).toEqualData(productList);
    });
  });

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

  describe('ProductViewCtrl', function() {
    var mockBackend, location;
    var product;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Product) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();
      product = new Product({
        "created":      "2013-09-13T01:54:39.172+0200",
        "category_id":  3,
        "name":         "uderzonymi palnęłabyś grymaścież tapczanem holistyczni",
        "price":        "889.65",
        "id":           1,
        "stock":        26,
        "description":  "magdeburkom yukki",
        "tags":         [1, 2]
      });

      ctrl = $controller('ProductViewCtrl', {
        $scope: $scope,
        $location: $location,
        product: product
      });
    }));

    it('should remove the product', function() {
      expect($scope.product).toBeTruthy();

      mockBackend.expectDELETE('http://llewandowski.waw.eo.pl:3000/api/products/1', {
        "Accept": "application/json, text/plain, */*"
      }).respond(200);

      // Set it to something else to ensure it is changed during the test
      location.path('test');
      expect(location.path()).toEqual('/test');

      $scope.delete();

      mockBackend.flush();
      expect($scope.product).toBeUndefined();
      expect(location.path()).toEqual('/products');
    });
  });

  describe('EditController', function() {
      var mockBackend, location;
      var product;
      beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Product) {
        mockBackend = _$httpBackend_;
        location = $location;
        $scope = $rootScope.$new();
        product = new Product({
          "created":      "2013-09-13T01:54:39.172+0200",
          "category_id":  3,
          "name":         "uderzonymi palnęłabyś grymaścież tapczanem holistyczni",
          "price":        "889.65",
          "id":           1,
          "stock":        26,
          "description":  "magdeburkom yukki",
          "tags":         [1, 2]
        });

        ctrl = $controller('ProductEditCtrl', {
          $scope: $scope,
          $location: $location,
          product: product
        });
      }));

      it('should save the product', function() {
        mockBackend.expectPUT('http://llewandowski.waw.eo.pl:3000/api/products/1', {
          "created":      "2013-09-13T01:54:39.172+0200",
          "category_id":  3,
          "name":         "uderzonymi palnęłabyś grymaścież tapczanem holistyczni",
          "price":        "889.65",
          "id":           1,
          "stock":        26,
          "description":  "magdeburkom yukki",
          "tags":         [1, 2],
          "tagObjs":      []
        }).respond({
          "created":      "2013-09-13T01:54:39.172+0200",
          "category_id":   3,
          "name":         "uderzonymi palnęłabyś grymaścież tapczanem holistyczni",
          "price":        "889.65",
          "id":           1,
          "stock":        26,
          "description":  "magdeburkom yukki",
          "tags":          [1, 2]
        });

        // Set it to something else to ensure it is changed during the test
        location.path('test');

        $scope.save();
        expect(location.path()).toEqual('/test');

        mockBackend.flush();

        expect(location.path()).toEqual('/viewProduct/1');
      });
  });
});