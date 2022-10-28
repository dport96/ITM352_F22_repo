var express = require('express');
var app = express();
const querystring = require('node:querystring');
var products = require("./product_data.json");

app.use(express.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});

app.get("/product_data.js", function (request, response, next) {
    response.type('.js');
    var products_str = `var products = ${JSON.stringify(products)};`;
    response.send(products_str);
});

app.post('/process_form', function (request, response, next) {
    console.log(request.body);
    var q;
    var has_quantities = false;
    for (let i in products) {
        q = request.body['quantity' + i];
        if (typeof q != 'undefined') {
            console.log(q);
            has_quantities = has_quantities || (q > 0);

            // response.send(`Thank you for purchasing ${q} things!`);
        }
    }
    if (has_quantities == true) {
        response.redirect("./invoice.html?" + querystring.stringify(request.body));
    } else {
        response.redirect("./products_display.html?" + querystring.stringify(request.body) + `&error=You need to select something!`);
    }
});

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback