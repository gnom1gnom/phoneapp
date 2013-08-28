var express = require("express"),
  app     = express(),
  port    = parseInt(process.env.PORT, 10) || 8080;

app.configure(function(){
  app.use(express.methodOverride());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/app'));
  app.use(app.router);
});

var products_map = {
  '1': {
    "id": "1",
    "title": "Cookies",
    "description": "Delicious, crisp on the outside, chewy on the outside, oozing with chocolatey goodness cookies. The best kind",
    "ingredients": [
      {
        "amount": "1",
        "amountUnits": "packet",
        "ingredientName": "Chips Ahoy"
      }
    ],
    "instructions": "1. Go buy a packet of Chips Ahoy\n2. Heat it up in an oven\n3. Enjoy warm cookies\n4. Learn how to bake cookies from somewhere else"
  },
  '2': {
    id: 2,
    'title': 'Product 2',
    'description': 'Description 2',
    'instructions': 'Instruction 2',
    ingredients: [
      {amount: 13, amountUnits: 'pounds', ingredientName: 'Awesomeness'}
    ]
  }
};
var next_id = 3;

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

app.listen(port);
app.set('port', port);
console.log('Now serving the app at http://localhost:' + port + '/');
