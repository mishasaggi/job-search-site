var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

//parse json urls
app.use(bodyParser.json());
//serve static files
app.use(express.static(__dirname + '/../client'));
app.use('/node_modules', express.static(__dirname + '/../node_modules'))

//----ROUTING----

//serving views
app.get('/', function(request, response){
  response.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

//api routing


app.listen(8080);
