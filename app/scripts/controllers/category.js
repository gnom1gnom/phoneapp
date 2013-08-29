'use strict';

var app = angular.module('phoneappApp');

app.controller('CategoryListCtrl', ['$scope', 'categories',
	function($scope, categories) {
		$scope.categories = categories;
	}
]);

app.controller('CategoryViewCtrl', ['$scope', '$location', '$dialog', 'category',
	function($scope, $location, $dialog, category) {
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
			var title = 'Usunięcie kategorii';
			var msg = 'Czy chcesz usunąć kategorię: ' + $scope.category.name;
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
						$scope.category.$delete(function() {
							$location.path('/categories');
						});
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

		$scope.cancel = function() {
			$location.path('/viewCategory/' + category.id);
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

		$scope.cancel = function() {
			$location.path('/categories');
		};
	}
]);