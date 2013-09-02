'use strict';

var app = angular.module('phoneappApp');

app.controller('ProductListCtrl', ['$scope', 'products',
	function($scope, products) {
		$scope.products = products;
	}
]);

app.controller('ProductViewCtrl', ['$scope', '$location', '$dialog', 'product', 'categories', 'tags',
	function($scope, $location, $dialog, product, categories, tags) {
		$scope.product = product;

		$scope.product.category = _.find(categories, function(category) {
			return product.category_id == category.id;
		});

		$scope.product.tagObjs = _.filter(tags, function(tag) {
			return _.contains(product.tags, tag.id);
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

app.controller('ProductEditCtrl', ['$scope', '$location', 'product', 'categories', 'tags',
	function($scope, $location, product, categories, tags) {
		$scope.product = product;
		$scope.categoryList = categories;
		$scope.tagList = tags;

		$scope.product.category = _.find(categories, function(category) {
			return product.category_id == category.id;
		});

		$scope.product.tagObjs = _.filter(tags, function(tag) {
			return _.contains(product.tags, tag.id);
		});

		$scope.save = function() {
			$scope.product.$update(function(product) {
				$location.path('/viewProduct/' + product.id);
			});
		};

		$scope.cancel = function() {
			$location.path('/viewProduct/' + product.id);
		};

		$scope.$watch('product.category', function(newVal, oldVal) {
			if(_.isObject(newVal))
				$scope.product.category_id = newVal.id;
		});
	}
]);

app.controller('ProductNewCtrl', ['$scope', '$location', 'Product', 'categories', 'tags',
	function($scope, $location, Product, categories, tags) {
		$scope.product = new Product();
		$scope.product.tags = [];
		$scope.product.tagObjs = [];

		$scope.categoryList = categories;
		$scope.tagList = tags;

		$scope.save = function() {
			$scope.product.$save(function(product) {
				$location.path('/viewProduct/' + product.id);
			});
		};

		$scope.cancel = function() {
			$location.path('/products');
		};

		$scope.$watch('product.category', function(newVal, oldVal) {
			if(_.isObject(newVal))
				$scope.product.category_id = newVal.id;
		});
	}
]);

app.controller('ProductTagCtrl', ['$scope',
	function($scope) {
		$scope.addTag = function() {
			var tagObjs = $scope.product.tagObjs;
			var tags = $scope.product.tags;

			tagObjs[tagObjs.length] = $scope.addedTag;
			tags[tags.length] = $scope.addedTag.id;

			delete $scope.addedTag;
		};
		$scope.removeTag = function(index) {
			$scope.product.tagObjs.splice(index, 1);
			$scope.product.tags.splice(index, 1);
		};
	}
]);