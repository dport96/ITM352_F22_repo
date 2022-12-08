var express = require('express');
var app = express();

var session = require('express-session');
var products_data = require(__dirname + '/products_data.json');

app.use(express.urlencoded({ extended: true }));
app.use(session({secret: "MySecretKey", resave: true, saveUninitialized: true}));

app.all('*', function (request, response, next) {
    console.log(`Got a ${request.method} to path ${request.path}`);
    // need to initialize an object to store the cart in the session. We do it when there is any request so that we don't have to check it exists
    // anytime it's used
    if(typeof request.session.cart == 'undefined') { request.session.cart = {}; } 
    next();
});

app.post("/get_products_data", function (request, response) {
    response.json(products_data);
});

app.post("/addToCart", function (request, response) {
    // add quantities to session for cart
    if(typeof request.session.cart == 'undefined') {request.session.cart = {}}; // in case cart not yet defined
    request.session.cart[request.query.products_key] = request.query.quantities;
    response.send(`${request.query.quantities.reduce((a, b) => Number(a) + Number(b), 0)} items added to cart`);
    console.log(request.session.cart);
});


app.post("/get_cart", function (request, response) {
    response.json(request.session.cart);
});

app.use(express.static(__dirname + '/public'));
app.listen(8080, () => console.log(`listening on port 8080`));