'use strict';

var app = angular.module('phoneappApp');

app.controller('TagListCtrl', ['$scope', 'tags',
	function($scope, tags) {
		$scope.tags = tags;
	}
]);

app.controller('TagViewCtrl', ['$scope', '$location', '$dialog', 'tag',
	function($scope, $location, $dialog, tag) {
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
			var msg = 'Do you want to delete tag: ' + $scope.tag.name;
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
						$scope.tag.$delete(function() {
							$location.path('/tags');
						});
					}
				});
		};
	}
]);

app.controller('TagEditCtrl', ['$scope', '$location', 'tag',
	function($scope, $location, tag) {
		$scope.tag = tag;

		$scope.save = function() {
			$scope.tag.$update(function(tag) {
				$location.path('/viewTag/' + tag.id);
			});
		};

		$scope.cancel = function() {
			$location.path('/viewTag/' + tag.id);
		};
	}
]);

app.controller('TagNewCtrl', ['$scope', '$location', 'Tag',
	function($scope, $location, Tag) {
		$scope.tag = new Tag();

		$scope.save = function() {
			$scope.tag.$save(function(tag) {
				$location.path('/viewTag/' + tag.id);
			});
		};

		$scope.cancel = function() {
			$location.path('/categories');
		};
	}
]);