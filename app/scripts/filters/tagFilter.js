'use strict';

var app = angular.module('phoneappApp');

app.filter('tagFilter', function() {
	return function(tags, scope) {
		return _.filter(tags, function(tag){
			return !(_.contains(scope.product.tag_id, tag.id));
		});
	};
});