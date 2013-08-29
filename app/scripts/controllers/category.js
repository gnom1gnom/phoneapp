'use strict';

var app = angular.module('phoneappApp');

app.controller('CategoryListCtrl', ['$scope', 'categories',
	function($scope, categories) {
		$scope.categories = categories;
	}
]);

app.controller('CategoryViewCtrl', ['$scope', '$location', 'category',
	function($scope, $location, category) {
		$scope.category = category;

		$scope.edit = function() {
			$location.path('/editCategory/' + category.id);
		};
	}
]);

app.controller('CategoryEditCtrl', ['$scope', '$location', 'category',
	function($scope, $location, category) {
		$scope.category = category;

		$scope.save = function() {
			$scope.category.$update(function(category) {
				$location.path('/viewCategory/' + category.id);
			});
		};

		$scope.remove = function() {
			delete $scope.category;
			$location.path('/categories');
		};
	}
]);

app.controller('CategoryNewCtrl', ['$scope', '$location', 'Category',
	function($scope, $location, Category) {
		$scope.category = new Category({
			ingredients: [{}]
		});

		$scope.save = function() {
			$scope.category.$save(function(category) {
				$location.path('/viewCategory/' + category.id);
			});
		};
	}
]);