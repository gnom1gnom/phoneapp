var app = angular.module('phoneappApp');

app.controller('ProductSearchCtrl', ['$scope', 'searchResults',
	function($scope, searchResults) {
		$scope.searchResults = searchResults;
	}
]);
