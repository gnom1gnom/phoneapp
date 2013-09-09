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

directives.directive('searchfield',
	function($compile, $searchFacets, $injector) {
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			scope: {
				query: '=',
				criteria: '='
			},
			restrict: 'A',
			template: '<select ng-model="query" ng-options="entry.id as entry.name for entry in dictionary"><option value="" style="display: none;"></option></select>',
			// templateUrl: '/views/search/singleoption.html',
			link: function($scope, iElm, iAttrs, controller) {
				$scope.facet = $searchFacets[$scope.criteria.name];

				if (!(_.isEmpty($scope.facet.dictionary))) {
					var dictionaryDefinition = $scope.facet.dictionary;
					var service = $injector.get(dictionaryDefinition.service);
					var dictionaryPromise = service.prototype.constructor();
					dictionaryPromise.then(
						function(dictionaryResource) {
							var facetKeys = _($scope.criteria.data).keys();

							$scope.dictionary = _.filter(dictionaryResource, function(entry) {
								return _.contains(facetKeys, "" + entry.id);
							});

							$scope.dictionary.splice(0, 0, {
								'name': '',
								'id': '*'
							});

							var watch = 'query["' + $scope.criteria.name + '"]';
							$scope.$parent.$watch(watch, function(newVal, oldVal) {
								if (newVal == '*')
									delete $scope.$parent.query[$scope.criteria.name];
							});
						},
						function(error) {
							console.log('dictionary:' + JSON.stringify(dictionary));
						});

				}
			}
		};
	});

directives.directive('sortable',
	function($compile, $searchFacets) {
		return {
			restrict: 'C',
			scope: {
				clicked: '&',
				options: '='
			},
			template: '{{label}} <i ng-class="' + '{true: \'icon-sort-up\', false: \'icon-sort-down\'}' + '[reverse]" ng-show="atribute==options.predicate"></i>',
			link: function($scope, element, attrs, controller) {
				$scope.atribute = attrs.atribute;
				$scope.label = $searchFacets[$scope.atribute].label;
				$scope.reverse = false;


				if ($scope.options.predicate == $scope.atribute)
					$scope.reverse = $scope.options.reverse;

				element.bind("click", function(event) {
					if ($scope.options.predicate == $scope.atribute)
						$scope.reverse = !($scope.reverse);

					$scope.clicked({
						attribute: $scope.atribute,
						order: $scope.reverse
					});
				});
			}
		};
	}
);