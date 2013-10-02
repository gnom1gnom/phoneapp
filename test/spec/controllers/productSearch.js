'use strict';

describe('Controller: ProductsearchCtrl', function() {

  var $scope, ctrl, $q;
  var searchServiceMock, mockBackend;

  var emptyQuery = {
    limit: 50
  };

  var searchQuery = {
    "limit": "50",
    "q": "ani",
    "tags": [1, 2],
    "category_id": 5
  };

  var suggestTest = {
    "limit": "50",
    "q": "mikro",
    "tags": [1, 2],
    "category_id": 5
  };

  var searchResults = {
    "facet": [{
      "name": "category_id",
      "data": {
        "5": 2
      }
    }, {
      "name": "tags",
      "data": {
        "1": 2,
        "2": 2,
        "3": 1,
        "4": 1,
        "5": 1
      }
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

  var suggestResult = ["mikrofalowaniem brzeski"];

  // load the controller's module
  beforeEach(module('phoneappApp'));
  beforeEach(function() {
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  // mock the service
  beforeEach(function() {
    searchServiceMock = jasmine.createSpyObj('searchService', ['search', 'suggest']);
    searchServiceMock.search.andCallFake(function() {
      var delay = $q.defer();
      delay.resolve(searchResults);
      return delay.promise;
    });

    searchServiceMock.suggest.andCallFake(function() {
      var delay = $q.defer();
      delay.resolve(suggestResult);
      return delay.promise;
    });

    module(function($provide) {
      $provide.value('searchService', searchServiceMock);
    });
  });

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, _$httpBackend_, _$q_) {
    mockBackend = _$httpBackend_;
    $q = _$q_;
    $scope = $rootScope.$new();
    $scope.query = emptyQuery;
    ctrl = $controller('ProductSearchCtrl', {
      $scope: $scope
    });
  }));

  it('should reset query', function() {
    $scope.query = searchQuery;
    $scope.reset();
    expect($scope.query).toEqual(emptyQuery);
  });

  it('should suggest', function() {
    $scope.query = searchQuery;
    $scope.suggest("mikro");

    // sprawdzamy czy suggest nie zmodyfikował parametrów zapytania
    expect($scope.query).toEqual(searchQuery);

    // sprawdzamy czy suggest wywołał serwis z odpowiednimi paramertami
    expect(searchServiceMock.suggest).toHaveBeenCalledWith(suggestTest);

  });

  it('should search', function() {
    $scope.query = searchQuery;
    var result = $scope.search();
    $scope.$apply();

    // sprawdzamy czy search wywołał serwis z odpowiednimi paramertami
    expect(searchServiceMock.search).toHaveBeenCalledWith(searchQuery);

    // sprawdzamy czy wynik wyszukiwania został zapisany w zmiennej
    expect($scope.searchResults).toEqual(searchResults);

    // sprawdzamy czy zmienna searchInProgress ma wartość FALSE
    expect($scope.searchInProgress).toEqual(false);

  });
});