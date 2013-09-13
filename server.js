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

var search_result =

{
  "facet": [{
    "name": "category_id",
    "data": {
      "190": 6,
      "191": 5,
      "194": 6,
      "197": 8,
      "199": 5,
      "200": 6,
      "201": 10,
      "203": 9,
      "205": 8,
      "209": 6
    }
  }, {
    "name": "tags",
    "data": {
      "261": 16,
      "262": 16,
      "263": 16,
      "264": 16,
      "265": 22,
      "268": 20,
      "271": 18,
      "274": 15,
      "280": 16,
      "281": 15
    }
  }, {
    "name": "price",
    "data": {
      "261": 16,
      "262": 16,
      "263": 16,
      "264": 16,
      "265": 22,
      "268": 20,
      "271": 18,
      "274": 15,
      "280": 16,
      "281": 15
    }
  }],
  "data": [{
    "name": "obdzwaniałobyś lizbo",
    "stock": 30,
    "description": "efod ułomków haftnięć trylionie",
    "tags": [
      "280",
      "268",
      "269",
      "279",
      "261",
      "275"
    ],
    "created": "1378800941",
    "category_id": "200",
    "price": "299.00",
    "updated": null,
    "id": "1996"
  }, {
    "name": "jednostopniowym korygowałobym jotacji",
    "stock": 86,
    "description": "usiałeś eksonami chomiki gruzińskiego",
    "tags": [
      "272",
      "258",
      "274",
      "280"
    ],
    "created": "1378800941",
    "category_id": "203",
    "price": "299.00",
    "updated": null,
    "id": "1997"
  }, {
    "name": "najoczywistsza adnotowania",
    "stock": 79,
    "description": "denaturowało bazyliszkowymi asportami notowska lubie antrachinonowe iloosobową ejdetyczne obwiałobyś obieliła likwidowa cudaczniejszemu oktawów",
    "tags": [
      "261",
      "277"
    ],
    "created": "1378800941",
    "category_id": "209",
    "price": "254.09",
    "updated": null,
    "id": "1998"
  }, {
    "name": "frezjowemu kołtunami",
    "stock": 11,
    "description": "jonoliftom obrazoburstw flokowałabyś deminutywność memłały współżyłby tropikalnej mailowanych",
    "tags": [
      "264",
      "257",
      "263",
      "279"
    ],
    "created": "1378800941",
    "category_id": "198",
    "price": "876.64",
    "updated": null,
    "id": "2000"
  }, {
    "name": "odrzucającą goleniowej",
    "stock": 10,
    "description": "fajansiarza cerebrotonikiem wlazły lepnika internistka humifikacją schrypłybyście siódemka koszerowany jadzącym bosmańsku modrzewniku ircowałybyście holistyczni",
    "tags": [
      "272",
      "279",
      "280",
      "281"
    ],
    "created": "1378800941",
    "category_id": "205",
    "price": "709.30",
    "updated": null,
    "id": "2001"
  }, {
    "name": "małpicach aeroplanowymi embriotrofem",
    "stock": 67,
    "description": "chutnejem uskromnień banjolami cierniczkowi odliczały utorowałabym ujaiłabym wyprostowywanej iłowcu kleruchowie napuszających",
    "tags": [
      "265",
      "262",
      "274"
    ],
    "created": "1378800941",
    "category_id": "191",
    "price": "240.68",
    "updated": null,
    "id": "2002"
  }, {
    "name": "kateringową oddzwaniające penalistkę",
    "stock": 86,
    "description": "odszywanie odważałybyście yumpiech trajkocemy wymurować głośnościami biorytmolog koszerowany udławiłoś",
    "tags": [
      "264",
      "268"
    ],
    "created": "1378800941",
    "category_id": "203",
    "price": "276.63",
    "updated": null,
    "id": "2003"
  }, {
    "name": "obznajmilibyśmy mantykę maksisprawom fitoterapeuty gruzińskiego",
    "stock": 25,
    "description": "utrudzasz iszczenia znakarze mąciłybyście",
    "tags": [
      "277",
      "270",
      "273",
      "256"
    ],
    "created": "1378800941",
    "category_id": "197",
    "price": "735.65",
    "updated": null,
    "id": "2004"
  }, {
    "name": "bosmańsku kryptokokowym jednolufowa",
    "stock": 31,
    "description": "zaśniecisz cantedeskiami yunnanów ekscerpcyjną eklogami yachtu galonom nabrzęknięci chreię anolitem transponowałoś",
    "tags": [
      "268",
      "279"
    ],
    "created": "1378800941",
    "category_id": "196",
    "price": "346.18",
    "updated": null,
    "id": "2006"
  }, {
    "name": "zestrajałoby embriotrofem grajewianką bazyliszkowymi",
    "stock": 36,
    "description": "pręcikowymi odliczały denaturowało pedantycznego fechtować chomiki wkolejałbym",
    "tags": [
      "256",
      "261",
      "260"
    ],
    "created": "1378800941",
    "category_id": "206",
    "price": "518.90",
    "updated": null,
    "id": "2007"
  }],
  "meta": {
    "total": 100
  }
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
  // res.send(500, { error: 'something blew up' });
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