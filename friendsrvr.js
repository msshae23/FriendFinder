var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');




var app = express(); // creating variable for express 
var PORT = process.env.PORT || 3000; // Set port for connection

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));






require('./app/routing/APIroutes.js')(app); 
require('./app/routing/HTMLroutes.js')(app);





app.listen(PORT, function() {
	console.log("App listening on PORT: " + PORT);
});