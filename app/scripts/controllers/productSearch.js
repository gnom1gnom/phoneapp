var app = angular.module('phoneappApp');

app.controller('ProductSearchCtrl', ['$scope', 'searchService',
	function($scope, searchService) {

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

					if(_($scope.descriptions).isUndefined() && _(result.data).isObject())
						$scope.descriptions = _(result.data).pluck("description");

					console.log('Search results descriptions:' + JSON.stringify($scope.descriptions));

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

		$scope.query = {
			limit: 50
		};

		$scope.search();
	}
]);