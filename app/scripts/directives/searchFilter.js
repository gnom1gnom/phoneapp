'use strict';

var directives = angular.module('phoneappApp.searchDirectives', []);

directives.directive('searchfilter', function () {
    return {
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {
        element.text('this is the searchFilter directive');
      }
    };
  });
