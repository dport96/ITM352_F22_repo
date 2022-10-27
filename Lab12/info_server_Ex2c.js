var express = require('express');
var app = express();


app.use(express.urlencoded({ extended: true }));

app.all('*', function (request, response, next) {
    console.log(request.method + ' to path ' + request.path);
    next();
});


app.post('/process_form', function (request, response, next) {
    console.log(request.body);
    var q = request.body['quantity0'];
    if (typeof q != 'undefined') {
        // response.send(`Thank you for purchasing ${q} things!`);
    } 
    response.redirect("./invoice.html?" );
});

app.use(express.static(__dirname + '/public'));

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback