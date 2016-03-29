// server passes in the router and db model interface
module.exports = function(app, SearchQuery){

  var searchController = require('./searchController.js')(SearchQuery);

  console.log("in the search router. query is: ", SearchQuery, "and controller is: ", searchController);
  app.post('/getJobs', searchController.getJobs);
  app.post('/saveStats', searchController.saveStats);
}
