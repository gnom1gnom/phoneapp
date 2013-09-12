'use strict';

var app = angular.module('phoneappApp');

/**
 ** Odrzuca facety dla których nie ma rezultatów
 **/
app.filter('facetOptionFilter', function() {
	return function(facets) {
		return _.filter(facets, function(facet) {
			return !(_(facet.data).isEmpty());
		});
	};
});

/**
 ** Zastępuje klucze wartością ze słownika
 **/
app.filter('dictionary', function() {
	return function(key, dictionary, facet) {
		if (_(dictionary).isObject()) {
			if (facet.multiple) {
				var valueArray = [];
				_(key.split(",")).each(function(keyItem) {
					valueArray.push(dictionary.map[keyItem]);
				});
				return valueArray.join(",");
			} else
				return dictionary.map[key];
		} else
			return key;
	};
});