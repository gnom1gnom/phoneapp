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

  describe('TagListCtrl', function() {
    var mockBackend, tag;
    // The _$httpBackend_ is the same as $httpBackend. Only written this way to
    // differentiate between injected variables and local variables
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, Tag) {
      tag = Tag;
      mockBackend = _$httpBackend_;
      $scope = $rootScope.$new();
      ctrl = $controller('TagListCtrl', {
        $scope: $scope,
        tags: [{
          "name": "Tag A",
          "id": 1
        }, {
          "name": "Tag B",
          "id": 2
        }, {
          "name": "Tag C",
          "id": 3
        }]
      });
    }));

    it('should have list of tags', function() {
      expect($scope.tags).toEqualData([{
        "name": "Tag A",
        "id": 1
      }, {
        "name": "Tag B",
        "id": 2
      }, {
        "name": "Tag C",
        "id": 3
      }]);
    });
  });

  describe('TagViewCtrl', function() {
    var mockBackend, location, $document;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Tag) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();

      ctrl = $controller('TagViewCtrl', {
        $scope: $scope,
        $location: $location,
        tag: new Tag({
          id: 1,
          name: 'Tag A'
        })
      });
    }));

    it('should remove the tag', function() {
      expect($scope.tag).toBeTruthy();

      mockBackend.expectDELETE('http://llewandowski.waw.eo.pl:3000/api/tags/1', {
        "Accept": "application/json, text/plain, */*"
      }).respond(200);

      // Set it to something else to ensure it is changed during the test
      location.path('test');
      expect(location.path()).toEqual('/test');

      $scope.delete();

      mockBackend.flush();
      expect($scope.tag).toBeUndefined();
      expect(location.path()).toEqual('/tags');
    });
  });

  describe('EditController', function() {
    var mockBackend, location;
    beforeEach(inject(function($rootScope, $controller, _$httpBackend_, $location, Tag) {
      mockBackend = _$httpBackend_;
      location = $location;
      $scope = $rootScope.$new();

      ctrl = $controller('TagEditCtrl', {
        $scope: $scope,
        $location: $location,
        tag: new Tag({
          id: 1,
          name: 'Tag A'
        })
      });
    }));

    it('should save the tag', function() {
      mockBackend.expectPUT('http://llewandowski.waw.eo.pl:3000/api/tags/1', {
        "id": 1,
        "name": "Tag A"
      }).respond({
        "id": 1,
        "name": "Tag A"
      });

      // Set it to something else to ensure it is changed during the test
      location.path('test');

      $scope.save();
      expect(location.path()).toEqual('/test');

      mockBackend.flush();

      expect(location.path()).toEqual('/viewTag/1');
    });
  });
});