var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var morgan = require('morgan');
var dbConfig = require('./dbConfig.js');
var jwt = require('jsonwebtoken');


var app = express();

app.use(bodyParser.urlencoded({extended: false}));
//parse json urls
app.use(bodyParser.json());
//logs http requests to console
app.use(morgan('dev'));

app.set('superSecret', dbConfig.secret);

//serve static files
//protected static route
app.use('/app/admin/admin.html', function(req, res, next) {
  console.log("req path is: ", req.path);

    console.log("in admin routes auth function");
      // check header or url parameters or post parameters for token
      var token = req.body.token || req.query.token || req.headers['x-access-token'];
      // decode token
      if(token){
        // verifies secret and checks exp
        jwt.verify(token, app.get('superSecret'), function(err, decoded) {
          if (err) {
            return res.json({ success: false, message: 'Failed to authenticate token.' });
          } else {
            // if everything is good, save to request for use in other routes
            req.decoded = decoded;
            next();
          }
        });
      } else {
        // if there is no token, return an error
        return res.status(403).send({
            success: false,
            message: 'No token provided.'
        }).redirect('/');
      }
  })
//unprotected routes
app.use(express.static(__dirname + '/../client')); // !! might need to change for protected routes
app.use('/node_modules', express.static(__dirname + '/../node_modules'))

//Model and Route variables, assigned after database connection is established
var SearchQuery,
    searchRouter,
    AdminQuery,
    adminRouter;

//---DATABASE---

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

