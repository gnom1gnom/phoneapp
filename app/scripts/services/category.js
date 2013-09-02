'use strict';

var services = angular.module('phoneappApp.categoryServices', ['ngResource']);

services.factory('Category', ['$resource',
  function($resource) {
    // return $resource('http://llewandowski.waw.eo.pl\\:3000/api/categories/:id', {
    return $resource('/categories/:id', {
      id: '@id'}, {
      query: {
        method: 'GET',
        isArray: true
      },
      update: {
        method: 'PUT'
      },
      delete: {
        method: 'DELETE'
      },
      save: {
        method: 'POST'
      }
    });
  }
]);

services.factory('MultiCategoryLoader', ['Category', '$q',
  function(Category, $q) {
    return function() {
      var delay = $q.defer();
      Category.query(function(categoires) {
        delay.resolve(categoires);
      }, function() {
        delay.reject('Unable to fetch category');
      });
      return delay.promise;
    };
  }
]);

services.factory('CategoryLoader', ['Category', '$route', '$q',
  function(Category, $route, $q) {
    return function() {
      var delay = $q.defer();
      Category.get({
        id: $route.current.params.categoryId
      }, function(product) {
        delay.resolve(product);
      }, function() {
        delay.reject('Unable to fetch category ' + $route.current.params.categoryId);
      });
      return delay.promise;
    };
  }
]);