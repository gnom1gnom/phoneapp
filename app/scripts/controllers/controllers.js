'use strict';

var app = angular.module('guthub',
    ['guthub.directives', 'guthub.services']);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        controller: 'ListCtrl',
        resolve: {
          products: ["MultiProductLoader", function(MultiProductLoader) {
            return MultiProductLoader();
          }]
        },
        templateUrl:'/views/list.html'
      }).when('/edit/:productId', {
        controller: 'EditCtrl',
        resolve: {
          product: ["ProductLoader", function(ProductLoader) {
            return ProductLoader();
          }]
        },
        templateUrl:'/views/productForm.html'
      }).when('/view/:productId', {
        controller: 'ViewCtrl',
        resolve: {
          product: ["ProductLoader", function(ProductLoader) {
            return ProductLoader();
          }]
        },
        templateUrl:'/views/viewProduct.html'
      }).when('/new', {
        controller: 'NewCtrl',
        templateUrl:'/views/productForm.html'
      }).otherwise({redirectTo:'/'});
}]);

app.controller('ListCtrl', ['$scope', 'products',
    function($scope, products) {
  $scope.products = products;
}]);

app.controller('ViewCtrl', ['$scope', '$location', 'product',
    function($scope, $location, product) {
  $scope.product = product;

  $scope.edit = function() {
    $location.path('/edit/' + product.id);
  };
}]);

app.controller('EditCtrl', ['$scope', '$location', 'product',
    function($scope, $location, product) {
  $scope.product = product;

  $scope.save = function() {
    $scope.product.$save(function(product) {
      $location.path('/view/' + product.id);
    });
  };

  $scope.remove = function() {
    delete $scope.product;
    $location.path('/');
  };
}]);

app.controller('NewCtrl', ['$scope', '$location', 'Product',
    function($scope, $location, Product) {
  $scope.product = new Product({
    ingredients: [ {} ]
  });

  $scope.save = function() {
    $scope.product.$save(function(product) {
      $location.path('/view/' + product.id);
    });
  };
}]);

app.controller('IngredientsCtrl', ['$scope',
    function($scope) {
  $scope.addIngredient = function() {
    var ingredients = $scope.product.ingredients;
    ingredients[ingredients.length] = {};
  };
  $scope.removeIngredient = function(index) {
    $scope.product.ingredients.splice(index, 1);
  };
}]);
