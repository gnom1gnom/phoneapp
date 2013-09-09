var app = angular.module('phoneappApp');

app.controller('ProductSearchCtrl', ['$scope', '$location', 'searchService', '$searchFacets',
	function($scope, $location, searchService, $searchFacets) {
		$scope.searchFacets = $searchFacets;

		$scope.typeAheadSearch = function() {
			console.log("typed ahead search");
			$.scope.search();
		};

		$scope.search = function() {
			$scope.searchInProgress = true;

			console.log('Searching with query: ' + JSON.stringify($scope.query));

			searchService.search($scope.query)
				.then(function(result) {
					console.log('Search results facet:' + JSON.stringify(result.facet));

					$scope.searchResults = result;

					var total_found = _.where(result.meta, {
						"Variable_name": "total_found"
					});
					var time = _.where(result.meta, {
						"Variable_name": "time"
					});

					$scope.resultCount = _.first(total_found).Value;
					$scope.searchTime = _.first(time).Value;

					$scope.searchInProgress = false;
					delete $scope.searchError;
				}, function(errors) {
					console.error('Search results erros:' + JSON.stringify(errors));

					$scope.searchInProgress = false;
					$scope.searchError = JSON.stringify(errors);
					delete $scope.resultCount;
					delete $scope.searchTime;
				});
		}

		$scope.suggest = function($viewValue) {
			var suggestQuery = {
				q: $viewValue
			};

			return searchService.suggest(suggestQuery);
		};

		$scope.view = function(path) {
			$location.path(path);
		};


		$scope.sort = function(attribute, order) {
			$scope.sortOptions.predicate = attribute;
			$scope.sortOptions.reverse = order;

			$scope.$apply();
		};

		$scope.query = {
			limit: 50
		};

		$scope.sortOptions = {
			predicate: "name",
			reverse: false
		};

		$scope.dict = {};

		//$scope.search();
	}
]);