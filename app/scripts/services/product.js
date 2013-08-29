'use strict';

var services = angular.module('phoneappApp.productServices', ['ngResource']);

services.factory('Product', ['$resource',
  function($resource) {
    return $resource('/products/:id', {
      id: '@id'
    });
  }
]);

services.factory('MultiProductLoader', ['Product', '$q',
  function(Product, $q) {
    return function() {
      var delay = $q.defer();
      Product.query(function(products) {
        delay.resolve(products);
      }, function() {
        delay.reject('Unable to fetch products');
      });
      return delay.promise;
    };
  }
]);

services.factory('ProductLoader', ['Product', '$route', '$q',
  function(Product, $route, $q) {
    return function() {
      var delay = $q.defer();
      Product.get({
        id: $route.current.params.productId
      }, function(product) {
        delay.resolve(product);
      }, function() {
        delay.reject('Unable to fetch product ' + $route.current.params.productId);
      });
      return delay.promise;
    };
  }
]);