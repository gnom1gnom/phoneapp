var express = require("express"),
  ingredientName
  app = express(),
  port = parseInt(process.env.PORT, 10) || 8080;

app.configure(function() {
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
});

var search_result = {
  "facet": {
    "category_id": [{
      "@groupby": "3",
      "weight": "1",
      "@count": "2",
      "id": "3"
    }, {
      "@groupby": "2",
      "weight": "1",
      "@count": "1",
      "id": "2"
    }, {
      "@groupby": "1",
      "weight": "1",
      "@count": "1",
      "id": "1"
    }],
    "tags": [{
      "@groupby": "5",
      "weight": "1",
      "@count": "1",
      "id": "1"
    }]
  },
  "data": [{
    "name": "Product 4",
    "description": "Lorem ipsum",
    "stock": "5",
    "tags": "",
    "created": "2013",
    "category_id": "3",
    "weight": "1",
    "id": "4",
    "price": "100.989998",
    "updated": "2013"
  }, {
    "name": "Product 3",
    "description": "",
    "stock": "0",
    "tags": "",
    "created": "2013",
    "category_id": "3",
    "weight": "1",
    "id": "3",
    "price": "299.989990",
    "updated": "0"
  }, {
    "name": "Product 2",
    "description": "",
    "stock": "20",
    "tags": "",
    "created": "2013",
    "category_id": "2",
    "weight": "1",
    "id": "2",
    "price": "199.990005",
    "updated": "0"
  }, {
    "name": "Product 1",
    "description": "Lorem dolor amet sum...",
    "stock": "10",
    "tags": "5",
    "created": "2013",
    "category_id": "1",
    "weight": "1",
    "id": "1",
    "price": "99.989998",
    "updated": "0"
  }],
  "meta": [{
    "Value": "4",
    "Variable_name": "total"
  }, {
    "Value": "4",
    "Variable_name": "total_found"
  }, {
    "Value": "0.000",
    "Variable_name": "time"
  }]
};

var products_map = {
  '1': {
    "created": "2013-08-29T04:13:52.279+0200",
    "category_id": 3,
    "name": "produkt 1",
    "price": 110.11,
    "id": 1,
    "stock": 10,
    "description": 'To jest opis produktu 1',
    "tags": [2, 3]
  },
  '2': {
    "created": "2013-08-29T04:13:52.279+0200",
    "category_id": 4,
    "name": "produkt 2",
    "price": 120.12,
    "id": 2,
    "stock": 20,
    "description": 'To jest opis produktu 2',
    "tags": [3, 5]
  },
  '3': {
    "created": "2013-08-29T04:13:52.279+0200",
    "category_id": 1,
    "name": "produkt 3",
    "price": 130.99,
    "id": 3,
    "stock": 30,
    "description": 'To jest opis produktu 3',
    "tags": [1]
  },
  '4': {
    "created": "2013-08-29T04:13:52.279+0200",
    "category_id": 5,
    "name": "produkt 4",
    "price": 140,
    "id": 4,
    "stock": 40,
    "description": 'To jest opis produktu 4',
    "tags": []
  }
};

var categories_map = {
  '1': {
    "name": "Kategoria 1",
    "id": 1
  },
  '2': {
    "name": "Kategoria 2",
    "id": 2
  },
  '3': {
    "name": "Kategoria 3",
    "id": 3
  },
  '4': {
    "name": "Kategoria 4",
    "id": 4
  },
  '5': {
    "name": "Kategoria 5",
    "id": 5
  },
  '6': {
    "name": "Kategoria 6",
    "id": 6
  }
};

var tags_map = {
  '1': {
    "name": "Tag 1",
    "id": 1
  },
  '2': {
    "name": "Tag 2",
    "id": 2
  },
  '3': {
    "name": "Tag 3",
    "id": 3
  },
  '4': {
    "name": "Tag 4",
    "id": 4
  },
  '5': {
    "name": "Tag 5",
    "id": 5
  },
  '6': {
    "name": "Tag 6",
    "id": 6
  }
};

var next_id = 5;
var next_cat_id = 7;
var next_tag_id = 7;

app.get('/search', function(req, res) {
  console.log('Searching for ' + req.query.q);

  setTimeout(function() {
    res.send(search_result);
  }, 500);
});

app.get('/products', function(req, res) {
  var products = [];

  for (var key in products_map) {
    products.push(products_map[key]);
  }

  // Simulate delay in server
  setTimeout(function() {
    res.send(products);
  }, 500);
});

app.get('/products/:id', function(req, res) {
  console.log('Requesting product with id', req.params.id);
  res.send(products_map[req.params.id]);
});

app.post('/products', function(req, res) {
  var product = {};
  product.id = next_id++;

  console.log('Saving product: ' + req.params);
  console.log('\tName: ' + req.body.name);
  console.log('\tCreated: ' + req.body.created);
  console.log('\tPrice: ' + req.body.price);
  console.log('\tStock: ' + req.body.stock);
  console.log('\tDescription: ' + req.body.description);
  console.log('\tCategory ids: ' + req.body.category_id);
  console.log('\tTag ids: ' + req.body.tags);

  product.name = req.body.name;
  product.created = req.body.created;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.description = req.body.description;
  product.category_id = req.body.category_id;
  product.tags = req.body.tags;

  products_map[product.id] = product;

  res.send(product);
});

app.put('/products/:id', function(req, res) {
  var product = {};

  console.log('Updating product: ');
  console.log('\tName: ' + req.body.name);
  console.log('\tCreated: ' + req.body.created);
  console.log('\tPrice: ' + req.body.price);
  console.log('\tStock: ' + req.body.stock);
  console.log('\tDescription: ' + req.body.description);
  console.log('\tCategory ids: ' + req.body.category_id);
  console.log('\tTag ids: ' + req.body.tags);

  product.id = req.params.id;
  product.name = req.body.name;
  product.created = req.body.created;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.description = req.body.description;
  product.category_id = req.body.category_id;
  product.tags = req.body.tags;


  products_map[product.id] = product;

  res.send(product);
});

app.get('/categories', function(req, res) {
  var categories = [];

  for (var key in categories_map) {
    categories.push(categories_map[key]);
  }

  // Simulate delay in server
  setTimeout(function() {
    res.send(categories);
  }, 500);
});

app.get('/categories/:id', function(req, res) {
  console.log('Requesting category with id', req.params.id);
  res.send(categories_map[req.params.id]);
});

app.post('/categories', function(req, res) {
  var category = {};
  category.id = next_cat_id++;
  category.name = req.body.name;

  categories_map[category.id] = category;

  res.send(category);
});

app.put('/categories/:id', function(req, res) {
  var category = {};
  category.id = req.params.id;
  category.name = req.body.name;

  categories_map[category.id] = category;

  res.send(category);
});

app.get('/tags', function(req, res) {
  var tags = [];

  for (var key in tags_map) {
    tags.push(tags_map[key]);
  }

  // Simulate delay in server
  setTimeout(function() {
    res.send(tags);
  }, 500);
});

app.get('/tags/:id', function(req, res) {
  console.log('Requesting tag with id', req.params.id);
  res.send(tags_map[req.params.id]);
});

app.post('/tags', function(req, res) {
  var tag = {};
  tag.id = next_tag_id++;
  tag.name = req.body.name;

  tags_map[tag.id] = tag;

  res.send(tag);
});

app.put('/tags/:id', function(req, res) {
  var tag = {};
  tag.id = req.params.id;
  tag.name = req.body.name;

  tags_map[tag.id] = tag;

  res.send(tag);
});

app.listen(port);
app.set('port', port);
console.log('Now serving the app at http://localhost:' + port + '/');