'use strict';

var app = angular.module('phoneappApp');

app.filter('categoryFilter', function() {
	return function(categories, scope) {
		return _.filter(categories, function(category){
			return !(_.contains(scope.product.category_id, category.id));
		});
	};
});