'use strict';

angular.module('phoneappApp', ['phoneappApp.productSearchService', 'phoneappApp.tagServices', 'phoneappApp.categoryServices',
  'phoneappApp.productServices', 'phoneappApp.directives', 'phoneappApp.searchDirectives',
  'phoneappApp.searchFacets', 'ui.bootstrap'
])
  .config(function($routeProvider) {
    $routeProvider
      .when('/main', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
    // search
    .when('/productSearch?category_id', {
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
      templateUrl: '/views/product/productList.html'
    })
      .when('/editProduct/:productId', {
        controller: 'ProductEditCtrl',
        resolve: {
          product: ["ProductLoader",
            function(ProductLoader) {
              return ProductLoader();
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
      .when('/viewProduct/:productId', {
        controller: 'ProductViewCtrl',
        resolve: {
          product: ["ProductLoader",
            function(ProductLoader) {
              return ProductLoader();
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
      .when('/newProduct', {
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
      templateUrl: '/views/category/categoryList.html'
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
        templateUrl: '/views/category/categoryForm.html'
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
        templateUrl: '/views/category/categoryView.html'
      })
      .when('/newCategory', {
        controller: 'CategoryNewCtrl',
        templateUrl: '/views/category/categoryForm.html'
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
      templateUrl: '/views/tag/tagList.html'
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
        templateUrl: '/views/tag/tagForm.html'
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
        templateUrl: '/views/tag/tagView.html'
      })
      .when('/newTag', {
        controller: 'TagNewCtrl',
        templateUrl: '/views/tag/tagForm.html'
      })

    // .otherwise({
    //   redirectTo: '/main'
    // });
  });