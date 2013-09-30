'use strict';

describe('Controllers', function() {
  var $scope, ctrl;
  //you need to indicate your module in a test
  beforeEach(module('phoneappApp'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  describe('CategoryListCtrl', function() {
    var mockBackend, category;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Category) {
      category = Category;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('CategoryListCtrl', {
        $scope: $scope,
        categories: [{
          "name": "Kategoria A",
          "id": 1
        }, {
          "name": "Kategoria B",
          "id": 2
        }, {
          "name": "Kategoria C",
          "id": 3
        }]
      });
    }));

    it('should have list of categories', function() {
      expect($scope.categories).toEqualData([{
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

  describe('CategoryViewCtrl', function() {
    var mockBackend, location, $document;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Category) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();

      ctrl = $controller('CategoryViewCtrl', {
        $scope: $scope,
        $location: $location,
        category: new Category({
          id: 1,
          name: 'Kategoria A'
        })
      });
    }));

    it('should remove the category', function() {
      expect($scope.category).toBeTruthy();

      mockBackend.expectDELETE('http://llewandowski.waw.eo.pl:3000/api/categories/1', {
        "Accept": "application/json, text/plain, */*"
      }).respond(200);

      // Set it to something else to ensure it is changed during the test
      location.path('test');
      expect(location.path()).toEqual('/test');

      $scope.delete();

      mockBackend.flush();
      expect($scope.category).toBeUndefined();
      expect(location.path()).toEqual('/categories');
    });
  });

  describe('EditController', function() {
    var mockBackend, location;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Category) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();

      ctrl = $controller('CategoryEditCtrl', {
        $scope: $scope,
        $location: $location,
        category: new Category({
          id: 1,
          name: 'Kategoria A'
        })
      });
    }));

    it('should save the category', function() {
      mockBackend.expectPUT('http://llewandowski.waw.eo.pl:3000/api/categories/1', {
        "id": 1,
        "name": "Kategoria A"
      }).respond({
        "id": 1,
        "name": "Kategoria A"
      });

      // Set it to something else to ensure it is changed during the test
      location.path('test');

      $scope.save();
      expect(location.path()).toEqual('/test');

      mockBackend.flush();

      expect(location.path()).toEqual('/viewCategory/1');
    });
  });
});