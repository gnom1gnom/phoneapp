'use strict';

var app = angular.module('phoneappApp');

app.controller('ProductListCtrl', ['$scope', 'products',
	function($scope, products) {
		$scope.products = products;
	}
]);

app.controller('ProductViewCtrl', ['$scope', '$location', 'product',
	function($scope, $location, product) {
		$scope.product = product;

		$scope.edit = function() {
			$location.path('/edit/' + product.id);
		};
	}
]);

app.controller('ProductEditCtrl', ['$scope', '$location', 'product',
	function($scope, $location, product) {
		$scope.product = product;

		$scope.save = function() {
			$scope.product.$update(function(product) {
				$location.path('/view/' + product.id);
			});
		};

		$scope.remove = function() {
			delete $scope.product;
			$location.path('/');
		};
	}
]);

app.controller('ProductNewCtrl', ['$scope', '$location', 'Product',
	function($scope, $location, Product) {
		$scope.product = new Product({
			ingredients: [{}]
		});

		$scope.save = function() {
			$scope.product.$save(function(product) {
				$location.path('/view/' + product.id);
			});
		};
	}
]);

app.controller('ProductIngredientsCtrl', ['$scope',
	function($scope) {
		$scope.addIngredient = function() {
			var ingredients = $scope.product.ingredients;
			ingredients[ingredients.length] = {};
		};
		$scope.removeIngredient = function(index) {
			$scope.product.ingredients.splice(index, 1);
		};
	}
]);