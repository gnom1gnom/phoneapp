'use strict';

var directives = angular.module('phoneappApp.searchDirectives', []);

directives.directive('searchfilter', function() {
	return {
		restrict: 'E',
		replace: true,
		link: function postLink(scope, element, attrs) {
			element.text('this is the searchFilter directive');
		}
	};
});

directives.directive('ngenter',
	function() {
		return {
			link: function($scope, element, attrs, controller) {
				element.bind("keydown keypress", function(event) {
					if (event.which === 13) {
						console.log("Pressed: " + event.which);
						$scope.$apply(function() {
							$scope.$eval(attrs.ngenter);
						});

						event.preventDefault();
					}
				});
			}
		};
	}
);

directives.directive('sortable',
	function($compile, $searchFacets) {
		return {
			restrict: 'C',
			scope: {
				clicked: '&',
				predicate: '@'
			},
			template: '{{label}}<i ng-class="' + '{true: \'icon-sort-up\', false: \'icon-sort-down\'}' + '[reverse]" ng-show="name==predicate"></i>',
			link: function($scope, element, attrs, controller) {
				$scope.label = $searchFacets[attrs.atribute].label;
				$scope.name = attrs.atribute;
				$scope.reverse = false;

				element.bind("click", function(event) {
					$scope.reverse = !($scope.reverse);
					$scope.clicked({attribute: $scope.name, order:$scope.reverse});
				});
			}
		};
	}
);