'use strict';

var app = angular.module('phoneappApp');

/**
 ** Odrzuca facety dla których nie ma rezultatów
 **/
app.filter('facetOptionFilter', function() {
	return function(facets, query) {
		return _.filter(facets, function(facet) {
			// jeśli rezultat nowego zapytania nie uzwględnia jakiegoś facatu, a był on w query dodajemy go
			// tak żeby było widać jakie parametry brały udział w zapytaniu
			if (_(facet.data).isEmpty() && !(_(query[facet.name]).isUndefined())) {
				var key = query[facet.name];
				facet.data = {};
				facet.data[key] = 0;
			}

			return !(_(facet.data).isEmpty());
		});
	};
});

/**
 ** Zastępuje klucze wartością ze słownika
 **/
app.filter('dictionary', function() {
	return function(key, dictionary) {
		if (_(dictionary).isObject()) {
			if (_(key).isArray()) {
				var valueArray = [];
				_(key).each(function(keyItem) {
					valueArray.push(dictionary.map[keyItem]);
				});
				return valueArray;
			} else {
				return dictionary.map[key];
			}
		} else {
			return key;
		}
	};
});