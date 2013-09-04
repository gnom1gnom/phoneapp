'use strict';

var services = angular.module('phoneappApp.productSearchService', ['ngResource']);

services.service('ProductSearchResultLoader', ['$http', '$q',
	function($http, $q) {
		this.search = function(searchParams) {
			var delay = $q.defer();

			var searchHttp = $http({
				method: 'GET',
				// url: 'http://localhost:9000/search',
				url: 'http://llewandowski.waw.eo.pl:3000/search',
				params: searchParams
			});

			searchHttp.success(function(productSearchResult) {
				console.debug('Search results received in service');
				delay.resolve(productSearchResult);
			}).error(function(reason) {
				console.error('Search error in service');
				delay.reject(reason.errors);
			});

			return delay.promise;
		};
	}
]);