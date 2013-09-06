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
				console.error('Error in search service');
				delay.reject(reason.errors);
			});

			return delay.promise;
		};

		this.suggest = function(suggestParams) {
			var delay = $q.defer();

			var searchHttp = $http({
				method: 'GET',
				url: 'http://llewandowski.waw.eo.pl:3000/suggest',
				params: suggestParams
			});

			searchHttp.success(function(productSearchResult) {
				console.debug('Suggest results received in service');
				delay.resolve(productSearchResult);
			}).error(function(reason) {
				console.error('Error in suggest service');
				delay.reject(reason.errors);
			});

			return delay.promise;
		};
	}
]);