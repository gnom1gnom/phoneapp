'use strict';

var services = angular.module('phoneappApp.tagServices', ['ngResource']);

services.factory('Tag', ['$resource',
  function($resource) {
    return $resource('http://llewandowski.waw.eo.pl\\:3000/api/tags/:id', {id: '@id'}, {
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

services.factory('MultiTagLoader', ['Tag', '$q',
  function(Tag, $q) {
    return function() {
      var delay = $q.defer();
      Tag.query(function(categoires) {
        delay.resolve(categoires);
      }, function() {
        delay.reject('Unable to fetch tag');
      });
      return delay.promise;
    };
  }
]);

services.factory('TagLoader', ['Tag', '$route', '$q',
  function(Tag, $route, $q) {
    return function() {
      var delay = $q.defer();
      Tag.get({
        id: $route.current.params.tagId
      }, function(product) {
        delay.resolve(product);
      }, function() {
        delay.reject('Unable to fetch tag ' + $route.current.params.productId);
      });
      return delay.promise;
    };
  }
]);