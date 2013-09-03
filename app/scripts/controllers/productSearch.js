var app = angular.module('phoneappApp');

app.controller('ProductSearchCtrl', ['$scope', 'searchService',
	function($scope, searchService) {

		$scope.search = function() {
			console.log('Searching with query: ' + $scope.query);
			searchService.search($scope.query)
				.then(function(result) {
					console.log('Search results received in controller');
					$scope.searchResults = result;
				}, function(error) {
					console.log('Search results error in controller: ' + error);
				});
		}

		$scope.query = ''
		$scope.search();
	}
]);