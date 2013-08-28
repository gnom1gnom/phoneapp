describe('Controllers', function() {
  var $scope, ctrl;
  //you need to indicate your module in a test
  beforeEach(module('guthub'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('ListCtrl', function() {
    var mockBackend, product;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Product) {
      product = Product;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('ListCtrl', {
        $scope: $scope,
        products: [1, 2, 3]
      });
    }));

    it('should have list of products', function() {
      expect($scope.products).toEqual([1, 2, 3]);
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
      mockBackend.expectGET('/products').respond([{id: 1}, {id: 2}]);

      var products;

      var promise = loader();
      promise.then(function(rec) {
        products = rec;
      });

      expect(products).toBeUndefined();

      mockBackend.flush();

      expect(products).toEqualData([{id: 1}, {id: 2}]);
    });
  });

  describe('EditController', function() {
    var mockBackend, location;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Product) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();

      ctrl = $controller('EditCtrl', {
        $scope: $scope,
        $location: $location,
        product: new Product({id: 1, title: 'Product'})
      });
    }));

    it('should save the product', function() {
      mockBackend.expectPOST('/products/1', {id: 1, title: 'Product'}).respond({id: 2});

      // Set it to something else to ensure it is changed during the test
      location.path('test');

      $scope.save();
      expect(location.path()).toEqual('/test');

      mockBackend.flush();

      expect(location.path()).toEqual('/view/2');
    });

    it('should remove the product', function() {
      expect($scope.product).toBeTruthy();
      location.path('test');

      $scope.remove();

      expect($scope.product).toBeUndefined();
      expect(location.path()).toEqual('/');
    });
  });
  // Other controller describes here as well

});
