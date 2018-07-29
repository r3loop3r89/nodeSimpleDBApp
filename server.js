var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(
    bodyParser.urlencoded(
        {
            extended: true
        }
    )
);

app.use(
    bodyParser.json()
);

var routes = require('./api/routes/myRoutes');

routes(app); // REGISTERING THE ROUTES TO THE APP

app.listen(1337);