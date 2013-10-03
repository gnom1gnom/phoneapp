'use strict';

var directives = angular.module('phoneappApp.directives', []);

directives.directive('navbar', ['$rootScope', '$location',
	function($rootScope, $location) {
		return {
			link: function(scope, element, attrs) {
				$rootScope.$on('$stateChangeSuccess', function() {
					element.find('li.active').removeClass('active');
					element.find('li:has(a[href="/#' + $location.path() + '"])').addClass('active');
				});
			}
		};
	}
]);

directives.directive('butterbar', ['$rootScope',
	function($rootScope) {
		return {
			link: function(scope, element, attrs) {
				element.addClass(attrs.butterbar);
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

directives.directive('focus', function() {
	return {
		link: function(scope, element, attrs) {
			element[0].focus();
		}
	};
});

var INTEGER_REGEXP = /^\d*$/;
directives.directive('integer', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (INTEGER_REGEXP.test(viewValue)) {
					ctrl.$setValidity('integer', true);
					return viewValue;
				} else {
					ctrl.$setValidity('integer', false);
					return undefined;
				}
			});
		}
	};
});

var FLOAT_REGEXP = /^\d+((\.|\,)\d{1,2})?$/;
directives.directive('price', function() {
	return {
		require: 'ngModel',
		link: function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (FLOAT_REGEXP.test(viewValue)) {
					ctrl.$setValidity('float', true);
					return parseFloat(viewValue.replace(',', '.'));
				} else {
					ctrl.$setValidity('float', false);
					return undefined;
				}
			});
		}
	};
});