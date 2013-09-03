'use strict';

var services = angular.module('phoneappApp.productSearchService', ['ngResource']);

services.service('ProductSearchResultLoader', ['$http', '$q',
	function($http, $q) {
		this.search = function(query) {
			var delay = $q.defer();

			var searchHttp = $http({
				method: 'GET',
				url: 'http://localhost:9000/search',
				// url: 'http://llewandowski.waw.eo.pl:3000/search',
				params: {
					q: query
				}
			});

			searchHttp.success(function(productSearchResult) {
				console.log('Search results received in service');
				delay.resolve(productSearchResult);
			}).error(function() {
				delay.reject('Unable to fetch search results');
			});

			return delay.promise;
		};
	}
]);