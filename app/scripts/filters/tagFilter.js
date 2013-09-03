'use strict';

var app = angular.module('phoneappApp');

app.filter('tagFilter', function() {
	return function(tagList, scope) {
		return _.filter(tagList, function(tag){
			return !(_.contains(scope.product.tags, tag.id));
		});
	};
});