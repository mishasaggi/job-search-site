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

//Model and Route variables, assigned after database connection is established
var SearchQuery,
    searchRouter,
    AdminQuery,
    adminRouter;

//---DATABASE---
var dbConfig = require('./dbConfig.js');

dbConfig.getDB().then( function(db){
  // console.log("database conection is:", db);

  //----ROUTING----
  //routing is moved inside of then so that we wait for the database connection
  //before requiring files.

  //pass database connection to each model
  SearchQuery = require('./search/searchModel.js')(db);
  AdminQuery = require('./admin/adminModel.js')(db);

  //api routing
  searchRouter = express.Router();
  adminRouter = express.Router();

  //allocate router for type of request by component
  app.use('/api/search', searchRouter);
  app.use('/api/admin', adminRouter);

  //inject routers and db model interface in the files
  require('./search/searchRoutes.js')(searchRouter, SearchQuery);
  require('./admin/adminRoutes.js')(adminRouter, AdminQuery);

})

app.listen(8080);

