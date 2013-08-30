'use strict';

var app = angular.module('phoneappApp');

app.controller('ProductListCtrl', ['$scope', 'products',
	function($scope, products) {
		$scope.products = products;
	}
]);

app.controller('ProductViewCtrl', ['$scope', '$location', '$dialog', 'product',
	function($scope, $location, $dialog, product) {
		$scope.product = product;

		$scope.opts = {
			backdrop: true,
			keyboard: true,
			backdropClick: true,
			template: 'template/dialog/message.html'
		};

		$scope.edit = function() {
			$location.path('/editProduct/' + product.id);
		};

		$scope.remove = function() {
			var title = 'Usunięcie produktu';
			var msg = 'Czy chcesz usunąć produkt: ' + $scope.product.name;
			var btns = [{
				result: false,
				label: 'Anuluj'
			}, {
				result: true,
				label: 'OK',
				cssClass: 'btn-primary'
			}];

			$dialog.messageBox(title, msg, btns)
				.open()
				.then(function(result) {
					if (result) {
						$scope.product.$delete(function() {
							$location.path('/products');
						});
					}
				});
		};
	}
]);

app.controller('ProductEditCtrl', ['$scope', '$location', 'product',
	function($scope, $location, product) {
		$scope.product = product;

		$scope.save = function() {
			$scope.product.$update(function(product) {
				$location.path('/viewProduct/' + product.id);
			});
		};

		$scope.cancel = function() {
			$location.path('/viewProduct/' + product.id);
		};
	}
]);

app.controller('ProductNewCtrl', ['$scope', '$location', 'Product',
	function($scope, $location, Product) {
		$scope.product = new Product();

		$scope.save = function() {
			$scope.product.$save(function(product) {
				$location.path('/viewProduct/' + product.id);
			});
		};

		$scope.cancel = function() {
			$location.path('/products');
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