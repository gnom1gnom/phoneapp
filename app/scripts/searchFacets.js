angular.module("phoneappApp.searchFacets", [], ["$provide",
  function($provide) {
    $provide.value('$searchFacets', {
      "name": {
        "label": "Name",
        "type": "string",
        "multiple": false
      },
      "description": {
        "label": "Description",
        "type": "string",
        "multiple": false
      },
      "stock": {
        "label": "Stock",
        "type": "number",
        "multiple": false
      },
      "created": {
        "label": "Created",
        "type": "date",
        "multiple": false
      },
      "id": {
        "label": "Id",
        "type": "number",
        "multiple": false
      },
      "price": {
        "label": "Price",
        "type": "number",
        "multiple": false
      },
      "updated": {
        "label": "Updated",
        "type": "date",
        "multiple": false
      },
      "category_id": {
        "label": "Category",
        "type": "number",
        "multiple": false,
        "dictionary": {
          "service": "MultiCategoryLoader",
          "key": "id",
        },
        "controll": "singleDropdown"
      },
      "tags": {
        "label": "Tags",
        "type": "number",
        "multiple": true,
        "dictionary": {
          "service": "MultiTagLoader",
          "key": "id"
        },
        "controll": "multipleDropdown"
      }
    });
  }
]);