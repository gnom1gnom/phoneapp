angular.module("phoneappApp.searchFacets", [], ["$provide",
  function($provide) {
    $provide.value('$searchFacets', {
      "name": {
        "label": "Name"
      },
      "description": {
        "label": "Description"
      },
      "stock": {
        "label": "Stock"
      },
      "created": {
        "label": "Created"
      },
      "id": {
        "label": "Id"
      },
      "price": {
        "label": "Price"
      },
      "updated": {
        "label": "Updated"
      },
      "category_id": {
        "label": "Category",
        "dictionary": {
          "service": "MultiCategoryLoader",
          "key": "id"
        },
        "controll" : "singleDropdown"
      },
      "tags": {
        "label": "Tags",
        "dictionary": {
          "service": "MultiTagLoader",
          "key": "id"
        },
        "controll" : "multipleDropdown"
      }
    });
  }
]);