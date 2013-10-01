'use strict';

describe('Directive', function() {
  // load the directive's module
  beforeEach(module('phoneappApp'));
  var categoriesMock, tagsMock;

  // zamokowane rezultaty wyszukiwania, na których bazuje budowanie facetów
  var searchResults = {
    "facet": [{
      "name": "category_id",
      "data": {"1": 20, "2": 7, "3": 9, "4": 9, "5": 12, "6": 7, "7": 10, "8": 12, "9": 7, "11": 7}
    }, {
      "name": "tags",
      "data": {"1": 65, "2": 51, "3": 60, "4": 56, "5": 65}
    }],
    "data": [{
      "name": "uderzonymi palnęłabyś grymaścież tapczanem holistyczni",
      "stock": 26,
      "description": "magdeburkom yukki",
      "tags": [
        "4",
        "1"
      ],
      "created": "2013-09-13 13:54:39.172909+02",
      "category_id": "3",
      "id": "1",
      "updated": null,
      "price": "889.65"
    }],
    "meta": {
      "total": 113
    }
  };

  // tablica kategorii zwracanych przez zamokowany resource MultiCategoryLoader
  var caregories = [{"name":"Kategoria A","id":1},{"name":"Kategoria B","id":2},{"name":"Kategoria C","id":3},
      {"name":"Kategoria D","id":4},{"name":"Kategoria E","id":5},{"name":"Kategoria F","id":6},
      {"name":"Kategoria G","id":7},{"name":"Kategoria H","id":8},{"name":"Kategoria I","id":9},
      {"name":"Kategoria J","id":10},{"name":"Kategoria K","id":11},{"name":"Kategoria L","id":12},
      {"name":"bar","id":13},{"name":"Szymon H","id":14}];

  // tablica tagów zwracanych przez zamokowany resource MultiTagLoader
  var tags = [{"name":"Tag foo","id":1},{"name":"Tag bar","id":2},{"name":"Tag baz","id":3},
      {"name":"Tag blach","id":4},{"name":"Tag fnord","id":5},{"name":"foo","id":6}];

  // tablica opcji selecta wygenerowanego dla facetu category_id
  var categoryOpt = [
    '<option value="?" selected="selected"></option>',
    '<option value="0"></option>',
    '<option value="1">Kategoria A (20)</option>',
    '<option value="2">Kategoria B (7)</option>',
    '<option value="3">Kategoria C (9)</option>',
    '<option value="4">Kategoria D (9)</option>',
    '<option value="5">Kategoria E (12)</option>',
    '<option value="6">Kategoria F (7)</option>',
    '<option value="7">Kategoria G (10)</option>',
    '<option value="8">Kategoria H (12)</option>',
    '<option value="9">Kategoria I (7)</option>',
    '<option value="10">Kategoria K (7)</option>'
  ];

  // tablica opcji selecta wygenerowanego dla facetu tags
  var tagsOpt = [
    '<option value="0">Kategoria A (65)</option>',
    '<option value="1">Kategoria B (51)</option>',
    '<option value="2">Kategoria C (60)</option>',
    '<option value="3">Kategoria D (56)</option>',
    '<option value="4">Kategoria E (65)</option>'
  ];

  describe('searchfield', function() {
    var element, scope, $q;

    // mokujemy resourcy do słowników
    beforeEach(function() {
      categoriesMock = jasmine.createSpy("MultiCategoryLoader.constructor() spy").andCallFake(function() {
        var delay = $q.defer();
        delay.resolve(caregories);
        return delay.promise;
      });
      module(function($provide) {
        $provide.value('MultiCategoryLoader', categoriesMock);
      });

      tagsMock = jasmine.createSpy("MultiTagLoader.constructor() spy").andCallFake(function() {
        var delay = $q.defer();
        delay.resolve(caregories);
        return delay.promise;
      });
      module(function($provide) {
        $provide.value('MultiTagLoader', tagsMock);
      });
    });

    // inisjujemy scope i kompilujemy element dla dyrektywy
    beforeEach(inject(function($rootScope, $compile, $searchFacets, _$q_) {
      scope = $rootScope.$new();
      $q = _$q_;

      scope.searchResults = searchResults;
      scope.query = {
        limit: 50
      };
      scope.dictionaries = {};
      scope.searchFacets = $searchFacets;

      element = angular.element('<div>' +
            '<div class="control-group facet-container" ng-repeat="criteria in searchResults.facet">' +
              '<label class="control-label" for="{{criteria.name}}">{{searchFacets[criteria.name].label}}</label>' +
              '<div class="controls" searchfield criteria="criteria" query="query" dictionaries="dictionaries"></div>' +
          '</div>' +
        '</div>');

      element = $compile(element)(scope);
      scope.$digest();
    }));

    it('should generate facet for category_id', function() {
      // sprawdzamy czy poprawnie wygenerowała się kontrolka dla kategorii
      var categoryControl = element.find('[ng-model="query[\'category_id\']"]');

      // sprawdzamy czy znaleziono jakąkolwiek kontrolkę
      expect(categoryControl).not.toBe(null);

      //sprawdzamy czy wygenerował się select
      expect(categoryControl.prop("tagName").toLowerCase()).toBe("select");

      //sprawdzamy czy wygenerowało się 12 opcji
      expect(categoryControl.children().length).toBe(12);

      // sprawdzamy poszczególne opcje
      categoryControl.children().each(function(index) {
         expect($(this)[0].outerHTML).toEqual(categoryOpt[index]);
      });

    });

    it('should generate facet for tags', function() {
      // sprawdzamy czy poprawnie wygenerowała się kontrolka dla kategorii
      var tagsControl = element.find('[ng-model="query[\'tags\']"]');

      // sprawdzamy czy znaleziono jakąkolwiek kontrolkę
      expect(tagsControl).not.toBe(null);

      //sprawdzamy czy wygenerował się select
      expect(tagsControl.prop("tagName").toLowerCase()).toBe("select");

      //sprawdzamy czy wygenerowało się 12 opcji
      expect(tagsControl.children().length).toBe(5);

       // sprawdzamy poszczególne opcje
      tagsControl.children().each(function(index) {
         expect($(this)[0].outerHTML).toEqual(tagsOpt[index]);
      });
    });
  });
});