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

//---DATABASE---

//set up database and create a connection object
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/jobSearcherDB'
var collection;

var mongoConnect = MongoClient.connect(url, function(err, db){
  if(err){
    console.error(err);
  } else {
    console.log("Correctly connected to the db");
    // select a collection when inside the model
    // collection = db.collection('jobSearcher');
  }
});

//pass database connection to each model
var SearchQuery = require('./search/searchModel.js')(mongoConnect)

//----ROUTING----

//api routing
var searchRouter = express.Router();

//allocate router for type of request by component
app.use('/api/search', searchRouter);

//inject routers and db model interface in the files
require('./search/searchRoutes.js')(searchRouter, SearchQuery);


app.listen(8080);
