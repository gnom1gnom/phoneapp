'use strict';

angular.module('phoneappApp', ['phoneappApp.tagServices', 'phoneappApp.categoryServices', 'phoneappApp.productServices', 'phoneappApp.directives'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })

    // products
    .when('/products', {
      controller: 'ProductListCtrl',
      resolve: {
        products: ["MultiProductLoader",
          function(MultiProductLoader) {
            return MultiProductLoader();
          }
        ]
      },
      templateUrl: '/views/productList.html'
    })
    .when('/editProduct/:productId', {
      controller: 'ProductEditCtrl',
      resolve: {
        product: ["ProductLoader",
          function(ProductLoader) {
            return ProductLoader();
          }
        ]
      },
      templateUrl: '/views/productForm.html'
    })
    .when('/viewProduct/:productId', {
      controller: 'ProductViewCtrl',
      resolve: {
        product: ["ProductLoader",
          function(ProductLoader) {
            return ProductLoader();
          }
        ]
      },
      templateUrl: '/views/productView.html'
    })
    .when('/newProduct', {
      controller: 'ProductNewCtrl',
      templateUrl: '/views/productForm.html'
    })

    //categories
    .when('/categories', {
      controller: 'CategoryListCtrl',
      resolve: {
        categories: ["MultiCategoryLoader",
          function(MultiCategoryLoader) {
            return MultiCategoryLoader();
          }
        ]
      },
      templateUrl: '/views/categoryList.html'
    })
    .when('/editCategory/:categoryId', {
      controller: 'CategoryEditCtrl',
      resolve: {
        category: ["CategoryLoader",
          function(CategoryLoader) {
            return CategoryLoader();
          }
        ]
      },
      templateUrl: '/views/categoryForm.html'
    })
    .when('/viewCategory/:categoryId', {
      controller: 'CategoryViewCtrl',
      resolve: {
        category: ["CategoryLoader",
          function(CategoryLoader) {
            return CategoryLoader();
          }
        ]
      },
      templateUrl: '/views/categoryView.html'
    })
    .when('/newCategory', {
      controller: 'CategoryNewCtrl',
      templateUrl: '/views/categoryForm.html'
    })

    //tags
    .when('/tags', {
      controller: 'TagListCtrl',
      resolve: {
        tags: ["MultiTagLoader",
          function(MultiTagLoader) {
            return MultiTagLoader();
          }
        ]
      },
      templateUrl: '/views/tagList.html'
    })
    .when('/editTag/:tagId', {
      controller: 'TagEditCtrl',
      resolve: {
        tag: ["TagLoader",
          function(TagLoader) {
            return TagLoader();
          }
        ]
      },
      templateUrl: '/views/tagForm.html'
    })
    .when('/viewTag/:tagId', {
      controller: 'TagViewCtrl',
      resolve: {
        tag: ["TagLoader",
          function(TagLoader) {
            return TagLoader();
          }
        ]
      },
      templateUrl: '/views/tagView.html'
    })
    .when('/newTag', {
      controller: 'TagNewCtrl',
      templateUrl: '/views/tagForm.html'
    })

    .otherwise({
      redirectTo: '/main'
    });
  });