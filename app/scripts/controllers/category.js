'use strict';

var app = angular.module('phoneappApp');

app.controller('CategoryListCtrl', ['$scope', 'categories',
	function($scope, categories) {
		$scope.categories = categories;
	}
]);

app.controller('CategoryViewCtrl', ['$scope', '$location', '$dialog', 'category', '$errorDictionary',
	function($scope, $location, $dialog, category, $errorDictionary) {
		$scope.category = category;

		$scope.opts = {
			backdrop: true,
			keyboard: true,
			backdropClick: true,
			template: 'template/dialog/message.html'
		};

		$scope.edit = function() {
			$location.path('/editCategory/' + category.id);
		};

		$scope.remove = function() {
			var title = 'Delete category';
			var msg = 'Do you want to delete category: ' + $scope.category.name + "?";
			var btns = [{
				result: false,
				label: 'Cancel'
			}, {
				result: true,
				label: 'OK',
				cssClass: 'btn-primary'
			}];

			$dialog.messageBox(title, msg, btns)
				.open()
				.then(function(result) {
					if (result) {
						$scope.delete();
					}
				});
		};

		$scope.delete = function() {
			$scope.category.$delete(function() {
				delete $scope.category;
				$location.path('/categories');
			}, function(error) {
				console.error(JSON.stringify(error));
				var title = 'Delete category error';
				var msg = 'Cannot delete category: ' + $errorDictionary.describe(error) + ".";

				var btns = [{
					result: true,
					label: 'OK',
					cssClass: 'btn-danger'
				}];
				$dialog.messageBox(title, msg, btns).open()
			});
		}
	}
]);

app.controller('CategoryEditCtrl', ['$scope', '$location', 'category', '$errorDictionary',
	function($scope, $location, category, $errorDictionary) {
		$scope.category = category;

		$scope.save = function() {
			$scope.category.$update(function(category) {
				$location.path('/viewCategory/' + category.id);
			}, function(error) {
				console.error(JSON.stringify(error));
				var title = 'Save category error';
				var msg = 'Cannot save category: ' + $errorDictionary.describe(error) + ".";

				var btns = [{
					result: true,
					label: 'OK',
					cssClass: 'btn-danger'
				}];
				$dialog.messageBox(title, msg, btns).open()
			});
		};

		$scope.cancel = function() {
			$location.path('/viewCategory/' + category.id);
		};
	}
]);

app.controller('CategoryNewCtrl', ['$scope', '$location', 'Category', '$errorDictionary',
	function($scope, $location, Category, $errorDictionary) {
		$scope.category = new Category();

		$scope.save = function() {
			$scope.category.$save(function(category) {
				$location.path('/viewCategory/' + category.id);
			}, function(error) {
				console.error(JSON.stringify(error));
				var title = 'Save category error';
				var msg = 'Cannot save category: ' + $errorDictionary.describe(error) + ".";

				var btns = [{
					result: true,
					label: 'OK',
					cssClass: 'btn-danger'
				}];
				$dialog.messageBox(title, msg, btns).open()
			});
		};

		$scope.cancel = function() {
			$location.path('/categories');
		};
	}
]);