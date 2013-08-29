'use strict';

var app = angular.module('phoneappApp');

app.controller('TagListCtrl', ['$scope', 'tags',
	function($scope, tags) {
		$scope.tags = tags;
	}
]);

app.controller('TagViewCtrl', ['$scope', '$location', 'tag',
	function($scope, $location, tag) {
		$scope.tag = tag;

		$scope.edit = function() {
			$location.path('/editTag/' + tag.id);
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

		$scope.remove = function() {
			delete $scope.tag;
			$location.path('/tags');
		};
	}
]);

app.controller('TagNewCtrl', ['$scope', '$location', 'Tag',
	function($scope, $location, Tag) {
		$scope.tag = new Tag({
			ingredients: [{}]
		});

		$scope.save = function() {
			$scope.tag.$save(function(tag) {
				$location.path('/viewTag/' + tag.id);
			});
		};
	}
]);