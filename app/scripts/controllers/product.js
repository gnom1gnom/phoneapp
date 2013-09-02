'use strict';

var app = angular.module('phoneappApp');

app.controller('ProductListCtrl', ['$scope', 'products',
	function($scope, products) {
		$scope.products = products;
	}
]);

app.controller('ProductViewCtrl', ['$scope', '$location', '$dialog', 'product', 'categories',
	function($scope, $location, $dialog, product, categories) {
		$scope.product = product;

		$scope.product.categories = _.filter(categories, function(category){
			return _.contains(product.category_id, category.id);
		});

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

app.controller('ProductEditCtrl', ['$scope', '$location', 'product', 'categories',
	function($scope, $location, product, categories) {
		$scope.product = product;
		$scope.categories = categories;

		$scope.product.categories = _.filter(categories, function(category){
			return _.contains(product.category_id, category.id);
		});

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

app.controller('ProductNewCtrl', ['$scope', '$location', 'Product', 'categories',
	function($scope, $location, Product, categories) {
		$scope.product = new Product();
		$scope.product.categories = [];
		$scope.product.category_id = [];
		
		$scope.categories = categories;

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

app.controller('ProductCategoriesCtrl', ['$scope',
	function($scope) {
		$scope.addCategory = function() {
			var categories = $scope.product.categories;
			var category_id = $scope.product.category_id;

			categories[categories.length] = $scope.addedCategory;
			category_id[category_id.length] = $scope.addedCategory.id;

			delete $scope.addedCategory;
		};
		$scope.removeCategory = function(index) {
			$scope.product.categories.splice(index, 1);
			$scope.product.category_id.splice(index, 1);
		};
	}
]);