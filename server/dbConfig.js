var MongoClient = require('mongodb').MongoClient;
var Q = require('q');
var url = 'mongodb://heroku_j949g5nk:4cjn3h5u6pbbodc4t06congrtg@ds011800.mlab.com:11800/heroku_j949g5nk'
var dbPromise = null;

module.exports.secret = 'averyverysecretsecret';

module.exports.getDB = function getDB(){

  if(dbPromise === null){
    //connection pool is either created or in the process
    var defer = Q.defer();
    //initialize conection
    MongoClient.connect(url, function(err, database){

      if(err){
        console.error(err);
        defer.reject(err);
      } else if(err === null){
        console.log("Correctly connected to the db");
        defer.resolve(database);
      }
    })
    return dbPromise = defer.promise;
  } else {
    return dbPromise;
  }

}
