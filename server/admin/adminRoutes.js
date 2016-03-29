// server passes in the router and db model interface
module.exports = function(app, AdminQuery, SearchQuery){

  var adminController = require('./adminController.js')(AdminQuery),

  console.log("in the adminrouter. query models are: ", SearchQuery, AdminQuery);
}