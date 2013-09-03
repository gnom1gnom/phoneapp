'use strict';

var services = angular.module('phoneappApp.productSearchService', ['ngResource']);

services.factory('ProductSearchResult', ['$http',
	function($http) {
		return $http({
			method: 'GET',
			url: 'http://llewandowski.waw.eo.pl:3000/search'
		});
	}
]);

services.factory('ProductSearchResultLoader', ['ProductSearchResult', '$q',
	function(ProductSearchResult, $q) {
		return function() {
			var delay = $q.defer();
			ProductSearchResult.success(function(productSearchResult) {
				console.log('Search results received');
				delay.resolve(productSearchResult);
			}).error(function() {
				delay.reject('Unable to fetch search results');
			});
			return delay.promise;
		};
	}
]);