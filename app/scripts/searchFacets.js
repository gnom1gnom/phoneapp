angular.module("phoneappApp.searchFacets", [], ["$provide",
  function($provide) {
    $provide.value('$searchFacets', {
      "name": {
        "attribute": "name",
        "label": "Name",
        "type": "string",
        "multiple": false
      },
      "description": {
        "attribute": "description",
        "label": "Description",
        "type": "string",
        "multiple": false
      },
      "stock": {
        "attribute": "stock",
        "label": "Stock",
        "type": "number",
        "multiple": false
      },
      "created": {
        "attribute": "created",
        "label": "Created",
        "type": "date",
        "multiple": false
      },
      "id": {
        "attribute": "id",
        "label": "Id",
        "type": "number",
        "multiple": false
      },
      "price": {
        "attribute": "price",
        "label": "Price",
        "type": "number",
        "multiple": false
      },
      "updated": {
        "attribute": "updated",
        "label": "Updated",
        "type": "date",
        "multiple": false
      },
      "category_id": {
        "attribute": "category_id",
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
        "attribute": "tags",
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