var app = angular.module('phoneappApp');

app.controller('ProductSearchCtrl', ['$scope', 'searchService',
	function($scope, searchService) {

		$scope.search = function() {
			$scope.searchInProgress = true;
			console.log('Searching with query: ' + $scope.query);

			var searchParams = {};
			searchParams

			searchService.search($scope.query)
				.then(function(result) {
					console.log('Search results received in controller');
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
				}, function(error) {
					console.log('Search results error in controller: ' + error);
					$scope.searchInProgress = false;
					$scope.searchError = error;
				});
		}

		$scope.query = {
			limit: 50
		};
		$scope.search();
	}
]);