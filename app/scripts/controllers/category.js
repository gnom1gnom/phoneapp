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

		$scope.remove = function() {

			$.prompt("Czy napewno usunąć kategorię:" + $scope.category.name, {
				title: "Potwierdź usunięcie",
				buttons: {
					"OK": true,
					"Anuluj": false
				},
				submit: function(e, v, m, f) {
					// use e.preventDefault() to prevent closing when needed or return false. 
					// e.preventDefault(); 
					if (v) {
						delete $scope.category;
						$location.path('/categories');
					}
				}
			});

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