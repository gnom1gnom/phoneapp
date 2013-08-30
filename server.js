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

var products_map = {
  '1': {
    "created": "2013-08-29T04:13:52.279+0200",
    "category_id": "1",
    "name": "produkt 1",
    "price": 100,
    "id": 1,
    "stock": 0,
    "description": 'gagagsgsgagsagsagsadsad',
    "tags": []
  },
  '2': {
    "created": "2013-08-29T04:13:52.279+0200",
    "category_id": "1",
    "name": "produkt 2",
    "price": 100,
    "id": 2,
    "stock": 0,
    "description": null,
    "tags": []
  }
};

var categories_map = {
  '1': {
    "name": "Kategoria 2",
    "id": 1
  },
  '2': {
    "name": "Kategoria 3",
    "id": 2
  },
  '3': {
    "name": "Kategoria 1",
    "id": 3
  }
};

var next_id = 3;
var next_cat_id = 3;

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

  product.name = req.body.name;
  product.created = req.body.created;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.description = req.body.description;

  //product.category_id = req.body.category_id;
  //product.tags = req.body.tags;

  products_map[product.id] = product;

  res.send(product);
});

app.put('/products/:id', function(req, res) {
  var product = {};

  console.log('Updating product: ');
  console.log(req.body.name);
  console.log(req.body.created);
  console.log(req.body.price);
  console.log(req.body.stock);
  console.log(req.body.description);

  product.id = req.params.id;
  product.name = req.body.name;
  product.created = req.body.created;
  product.price = req.body.price;
  product.stock = req.body.stock;
  product.description = req.body.description;
  
  //product.category_id = req.body.category_id;
  //product.tags = req.body.tags;


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

app.listen(port);
app.set('port', port);
console.log('Now serving the app at http://localhost:' + port + '/');