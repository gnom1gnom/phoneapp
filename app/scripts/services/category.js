'use strict';

var services = angular.module('phoneappApp.categoryServices', ['ngResource']);

services.factory('Category', ['$resource',
  function($resource) {
    return $resource('http://llewandowski.waw.eo.pl\\:3000/api/categories/:id', {
    // return $resource('/categories/:id', {
      id: '@id'
    }, {
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

services.factory('CategoryLoader', ['Category', '$q',
  function(Category, $q) {
    return function(idParam) {
      var delay = $q.defer();
      Category.get({
        id: idParam
      }, function(product) {
        delay.resolve(product);
      }, function() {
        delay.reject('Unable to fetch category ' + idParam);
      });
      return delay.promise;
    };
  }
]);