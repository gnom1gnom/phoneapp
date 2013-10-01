'use strict';

var app = angular.module('phoneappApp');

app.controller('TagListCtrl', ['$scope', 'tags',
	function($scope, tags) {
		$scope.tags = tags;
	}
]);

app.controller('TagViewCtrl', ['$scope', '$location', '$dialog', 'tag', '$errorDictionary',
	function($scope, $location, $dialog, tag, $errorDictionary) {
		$scope.tag = tag;

		$scope.opts = {
			backdrop: true,
			keyboard: true,
			backdropClick: true,
			template: 'template/dialog/message.html'
		};

		$scope.edit = function() {
			$location.path('/editTag/' + tag.id);
		};

		$scope.remove = function() {
			var title = 'Delete tag';
			var msg = 'Do you want to delete tag: ' + $scope.tag.name + "?";
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
			$scope.tag.$delete(function() {
				delete $scope.tag;
				$location.path('/tags');
			}, function(error) {
				console.error(JSON.stringify(error));
				var title = 'Delete tag error';
				var msg = 'Cannot delete tag: ' + $errorDictionary.describe(error) + ".";

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

app.controller('TagEditCtrl', ['$scope', '$location', 'tag', '$errorDictionary',
	function($scope, $location, tag, $errorDictionary) {
		$scope.tag = tag;

		$scope.save = function() {
			$scope.tag.$update(function(tag) {
				$location.path('/viewTag/' + tag.id);
			}, function(error) {
				console.error(JSON.stringify(error));
				var title = 'Save tag error';
				var msg = 'Cannot save tag: ' + $errorDictionary.describe(error) + ".";

				var btns = [{
					result: true,
					label: 'OK',
					cssClass: 'btn-danger'
				}];
				$dialog.messageBox(title, msg, btns).open()
			});
		};

		$scope.cancel = function() {
			$location.path('/viewTag/' + tag.id);
		};
	}
]);

app.controller('TagNewCtrl', ['$scope', '$location', 'Tag', '$errorDictionary',
	function($scope, $location, Tag, $errorDictionary) {
		$scope.tag = new Tag();

		$scope.save = function() {
			$scope.tag.$save(function(tag) {
				$location.path('/viewTag/' + tag.id);
			}, function(error) {
				console.error(JSON.stringify(error));
				var title = 'Create tag error';
				var msg = 'Cannot create tag: ' + $errorDictionary.describe(error) + ".";

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