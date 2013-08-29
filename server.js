var express = require("express"),ingredientName
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
    "id": "1",
    "title": "Samsung Galaxy",
    "description": "Smartfon, który myśli naprawdę jak Ty.",
    "ingredients": [{
      "amount": "1",
      "amountUnits": "szt",
      "ingredientName": "Cortex-A7"
    }],
    "instructions": "Wireless charging (market dependent)"
  },
  '2': {
    id: 2,
    'title': 'Product 2',
    'description': 'Description 2',
    'instructions': 'Instruction 2',
    "ingredients": [{
      "amount": 13,
      "amountUnits": 'pounds',
      "ingredientName": 'Awesomeness'
    }]
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
  product.title = req.body.title;
  product.description = req.body.description;
  product.ingredients = req.body.ingredients;
  product.instructions = req.body.instructions;

  products_map[product.id] = product;

  res.send(product);
});

app.post('/products/:id', function(req, res) {
  var product = {};
  product.id = req.params.id;
  product.title = req.body.title;
  product.description = req.body.description;
  product.ingredients = req.body.ingredients;
  product.instructions = req.body.instructions;

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

app.post('/categories/:id', function(req, res) {
  var category = {};
  category.id = req.params.id;
  category.name = req.body.name;

  categories_map[category.id] = category;

  res.send(category);
});

app.listen(port);
app.set('port', port);
console.log('Now serving the app at http://localhost:' + port + '/');