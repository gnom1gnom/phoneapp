'use strict';

var app = angular.module('phoneappApp');

app.filter('facetOptionFilter', function() {
	return function(facets) {
		return _.filter(facets, function(facet) {
			return !(_(facet.data).isEmpty());
		});
	};
});