// server passes in the router and db model interface
module.exports = function(app, SearchQuery){
  var searchController = require('./searchController.js')(SearchQuery);

  app.post('./getJobs', searchController.getJobs);
}
