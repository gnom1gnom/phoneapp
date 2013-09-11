'use strict';

angular.module('phoneappApp', ['phoneappApp.productSearchService', 'phoneappApp.tagServices', 'phoneappApp.categoryServices',
  'phoneappApp.productServices', 'phoneappApp.directives', 'phoneappApp.searchDirectives',
  'phoneappApp.searchFacets', 'ui.bootstrap', 'ui.router', '$strap.directives'
]).config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('search', {
      url: '/productSearch?category_id&limit&tags&q',
      controller: 'ProductSearchCtrl',
      resolve: {
        searchService: ["ProductSearchResultLoader",
          function(ProductSearchResultLoader) {
            return ProductSearchResultLoader;
          }
        ],
        categories: ["MultiCategoryLoader",
          function(MultiCategoryLoader) {
            return MultiCategoryLoader();
          }
        ]
      },
      templateUrl: '/views/product/searchResults.html',
      reloadOnSearch: false
    })
    .state('products', {
      url: '/products',
      controller: 'ProductListCtrl',
      resolve: {
        products: ["MultiProductLoader",
          function(MultiProductLoader) {
            return MultiProductLoader();
          }
        ]
      },
      templateUrl: '/views/product/productList.html'
    })
    .state('editProduct', {
      url: '/editProduct/:productId',
      controller: 'ProductEditCtrl',
      resolve: {
        product: ["ProductLoader", "$stateParams",
          function(ProductLoader, $stateParams) {
            return ProductLoader($stateParams.productId);
          }
        ],
        categories: ["MultiCategoryLoader",
          function(MultiCategoryLoader) {
            return MultiCategoryLoader();
          }
        ],
        tags: ["MultiTagLoader",
          function(MultiTagLoader) {
            return MultiTagLoader();
          }
        ]
      },
      templateUrl: '/views/product/productForm.html'
    })
    .state('viewProduct', {
      url: '/viewProduct/:productId',
      controller: 'ProductViewCtrl',
      resolve: {
        product: ["ProductLoader", "$stateParams",
          function(ProductLoader, $stateParams) {
            return ProductLoader($stateParams.productId);
          }
        ],
        categories: ["MultiCategoryLoader",
          function(MultiCategoryLoader) {
            return MultiCategoryLoader();
          }
        ],
        tags: ["MultiTagLoader",
          function(MultiTagLoader) {
            return MultiTagLoader();
          }
        ]
      },
      templateUrl: '/views/product/productView.html'
    })
    .state('newProduct', {
      url: '/newProduct',
      controller: 'ProductNewCtrl',
      resolve: {
        categories: ["MultiCategoryLoader",
          function(MultiCategoryLoader) {
            return MultiCategoryLoader();
          }
        ],
        tags: ["MultiTagLoader",
          function(MultiTagLoader) {
            return MultiTagLoader();
          }
        ]
      },
      templateUrl: '/views/product/productForm.html'
    })
    .state('categories', {
      url: '/categories',
      controller: 'CategoryListCtrl',
      resolve: {
        categories: ["MultiCategoryLoader",
          function(MultiCategoryLoader) {
            return MultiCategoryLoader();
          }
        ]
      },
      templateUrl: '/views/category/categoryList.html'
    })
    .state('editCategory', {
      url: '/editCategory/:categoryId',
      controller: 'CategoryEditCtrl',
      resolve: {
        category: ["CategoryLoader", "$stateParams",
          function(CategoryLoader, $stateParams) {
            return CategoryLoader($stateParams.categoryId);
          }
        ]
      },
      templateUrl: '/views/category/categoryForm.html'
    })
    .state('viewCategory', {
      url: '/viewCategory/:categoryId',
      controller: 'CategoryViewCtrl',
      resolve: {
        category: ["CategoryLoader", "$stateParams",
          function(CategoryLoader, $stateParams) {
            return CategoryLoader($stateParams.categoryId);
          }
        ]
      },
      templateUrl: '/views/category/categoryView.html'
    })
    .state('newCategory', {
      url: '/newCategory',
      controller: 'CategoryNewCtrl',
      templateUrl: '/views/category/categoryForm.html'
    })
    .state('tags', {
      url: '/tags',
      controller: 'TagListCtrl',
      resolve: {
        tags: ["MultiTagLoader",
          function(MultiTagLoader) {
            return MultiTagLoader();
          }
        ]
      },
      templateUrl: '/views/tag/tagList.html'
    })
    .state('editTag', {
      url: '/editTag/:tagId',
      controller: 'TagEditCtrl',
      resolve: {
        tag: ["TagLoader", "$stateParams",
          function(TagLoader, $stateParams) {
            return TagLoader($stateParams.tagId);
          }
        ]
      },
      templateUrl: '/views/tag/tagForm.html'
    })
    .state('viewTag', {
      url: '/viewTag/:tagId',
      controller: 'TagViewCtrl',
      resolve: {
        tag: ["TagLoader", "$stateParams",
          function(TagLoader, $stateParams) {
            return TagLoader($stateParams.tagId);
          }
        ]
      },
      templateUrl: '/views/tag/tagView.html'
    })
    .state('newTag', {
      url: '/newTag',
      controller: 'TagNewCtrl',
      templateUrl: '/views/tag/tagForm.html'
    })
});