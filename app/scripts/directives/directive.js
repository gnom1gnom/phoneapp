'use strict';

var directives = angular.module('phoneappApp.directives', []);

directives.directive('butterbar', ['$rootScope',
	function($rootScope) {
		return {
			link: function(scope, element, attrs) {
				element.addClass('loading')
				element.addClass('hide');

				$rootScope.$on('$routeChangeStart', function() {
					element.removeClass('hide');
				});

				$rootScope.$on('$routeChangeSuccess', function() {
					element.addClass('hide');
				});
			}
		};
	}
]);

directives.directive('focus',
	function() {
		return {
			link: function(scope, element, attrs) {
				element[0].focus();
			}
		};
	});

directives.directive('nav',
	function() {
		return {
			link: function(scope, element, attrs) {
				element.click(function() {
					element.siblings().removeClass('active');
					element.addClass('active');
				});
			}
		};
	});