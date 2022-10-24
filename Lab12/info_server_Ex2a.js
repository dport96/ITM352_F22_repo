var express = require('express');
var app = express();

app.all('*', function (request, response, next) {
    response.type('txt');
    response.send(request.method + ' <b>to path</b> ' + request.path);
});

app.listen(8080, () => console.log(`listening on port 8080`)); // note the use of an anonymous function here to do a callback