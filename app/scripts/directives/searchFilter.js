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

var getDictionary = function(facet, dictionaries, $q, $injector) {
	var delay = $q.defer();
	var dictionaryDefinition = facet.dictionary;

	if (_(dictionaries).isUndefined()) {
		console.warn('Dictionary chache is undefined');
		return getInjectedDictionaryPromise(dictionaryDefinition.service, $injector);
	}

	if (_(dictionaries[facet.attribute]).isObject()) {
		console.log("Getting " + facet.attribute + " dictionary from cache");
		delay.resolve(dictionaries[facet.attribute].list);
	} else {
		console.warn("Acquiring dictionary " + facet.attribute + " for cache");
		var dictionaryPromise = getInjectedDictionaryPromise(dictionaryDefinition.service, $injector);

		dictionaryPromise.then(function(dictionaryResource) {
			console.log("Putting dictionary " + facet.attribute + " to cache");
			dictionaries[facet.attribute] = {};
			dictionaries[facet.attribute].list = dictionaryResource;
			dictionaries[facet.attribute].map = _.dictionaryToMap(dictionaryResource);
			delay.resolve(dictionaries[facet.attribute].list);
		}, function(error) {
			delay.reject(error);
		})
	}

	return delay.promise;
};

var getInjectedDictionaryPromise = function(dictionaryName, $injector) {
	var service = $injector.get(dictionaryName);
	var dictionaryPromise = service.prototype.constructor();
	return dictionaryPromise;
};

// czyści obiekt w kluczy o pustej wartości
_.mixin({
	dictionaryToMap: function(dictionary) {
		var dictionaryMap = {};
		_.each(dictionary, function(entry) {
			dictionaryMap[entry.id] = entry.name;
		});
		return dictionaryMap;
	}
});

directives.directive('searchfield',
	function($compile, $searchFacets, $injector, $q) {
		var singleDropdownTemplate = _.template('<select bs-select class="input-xlarge single" ng-model="<%= ngmodel %>" ng-options="entry.id as entry.name for entry in dictionary"></select>');
		// var singleDropdownTemplate = _.template('<select ng-model="<%= ngmodel %>" ng-options="entry.id as entry.name for entry in dictionary"></select>');

		var multipleDropdownTemplate = _.template('<select bs-select class="input-xlarge" ng-model="<%= ngmodel %>" ng-options="entry.id as entry.name for entry in dictionary" multiple></select>');
		// var multipleDropdownTemplate = _.template('<select ng-model="<%= ngmodel %>" ng-options="entry.id as entry.name for entry in dictionary" multiple></select>');

		var getTemplate = function(contentType, model) {
			var template = '';

			switch (contentType) {
				case 'singleDropdown':
					template = singleDropdownTemplate({'ngmodel': model});
					break;
				case 'multipleDropdown':
					template = multipleDropdownTemplate({'ngmodel': model});
					break;
			}

			return template;
		};

		return {
			scope: {
				query: '=',
				criteria: '=',
				dictionaries: '='
			},
			restrict: 'A',
			link: function($scope, iElm, iAttrs, controller) {
				$scope.facet = $searchFacets[$scope.criteria.name];

				if (!(_.isEmpty($scope.facet.dictionary))) {
					var dictionaryPromise = getDictionary($scope.facet, $scope.dictionaries, $q, $injector);
					dictionaryPromise.then(
						function(dictionaryResource) {
							var facetKeys = _($scope.criteria.data).keys();

							$scope.dictionary = _.filter(dictionaryResource, function(entry) {
								return _.contains(facetKeys, "" + entry.id);
							});

							if ($scope.facet.controll == "singleDropdown") {
								$scope.dictionary.splice(0, 0, {
									'name': '',
									'id': '*'
								});
							}

							$scope.model = "query['" + $scope.criteria.name + "']";

							// inject the control from template
							iElm.html(getTemplate($scope.facet.controll, $scope.model));
							$compile(iElm.contents())($scope);

							// fade in .facet-container
							iElm.parent(".facet-container").fadeIn();

							$scope.$parent.$watch($scope.model, function(newVal, oldVal) {
								switch ($scope.facet.controll) {
									case 'singleDropdown':
										if (newVal == '*')
											delete $scope.$parent.query[$scope.criteria.name];
										break;
									case 'multipleDropdown':
										if (_(newVal).isEmpty())
											delete $scope.$parent.query[$scope.criteria.name];
										break;
								}
							});
						},
						function(error) {
							console.log('Error while getting dictionary:' + JSON.stringify(error));
						});

				}
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