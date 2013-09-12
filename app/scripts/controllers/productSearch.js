var app = angular.module('phoneappApp');

app.controller('ProductSearchCtrl', ['$scope', '$location', 'searchService', '$searchFacets', '$stateParams',
	function($scope, $location, searchService, $searchFacets, $stateParams) {
		$scope.search = function() {
			$scope.searchInProgress = true;

			console.log('Searching with query: ' + JSON.stringify($scope.query));
			$location.search($scope.query);

			searchService.search($scope.query)
				.then(function(result) {
					// console.log('Search results facet:' + JSON.stringify(result.facet));

					$scope.searchResults = result;

					var total_found = _.where(result.meta, {
						"Variable_name": "total_found"
					});
					var time = _.where(result.meta, {
						"Variable_name": "time"
					});

					$scope.resultCount = result.meta.total_found;
					$scope.searchTime = result.meta.time;

					$scope.searchInProgress = false;
					delete $scope.searchError;
				}, function(errors) {
					console.error('Search results erros:' + JSON.stringify(errors));

					$scope.searchInProgress = false;
					$scope.searchError = JSON.stringify(errors);
					delete $scope.resultCount;
					delete $scope.searchTime;
				});
		}

		$scope.reset = function() {
			$scope.query = {
				limit: 50
			}
		};

		$scope.suggest = function($viewValue) {
			var suggestQuery = {
				q: $viewValue
			};

			return searchService.suggest(suggestQuery);
		};

		$scope.view = function(path) {
			$location.path(path);
		};


		$scope.sort = function(attribute, order) {
			$scope.sortOptions.predicate = attribute;
			$scope.sortOptions.reverse = order;

			$scope.$apply();
		};

		$scope.searchFacets = $searchFacets;
		$scope.dictionaries = {};

		$scope.sortOptions = {
			predicate: "name",
			reverse: false
		};

		//czysczenie przekazanych parametrów 
		$scope.query = _.parameterCleanu($stateParams, $searchFacets);
		if (_($scope.query).isEmpty()) {
			$scope.query = {
				limit: 50
			}
		} else {
			$scope.search();
		}
	}
]);

// czyści obiekt w kluczy o pustej wartości
_.mixin({
	parameterCleanu: function(object, searchFacets) {
		// console.log('$stateParams: ' + JSON.stringify(object));
		_.each(object, function(value, key) {
			if (!value)
				delete object[key];
			else {
				var facet = searchFacets[key];
				if (_(facet).isObject()) {
					var newValue = value;

					if (facet.type.match(/number/i))
						newValue = parseInt(value);

					if (facet.multiple)
						object[key] = [newValue];
					else
						object[key] = newValue;
				}
			}
		});
		return object;
	}
});