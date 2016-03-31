// server passes in the router and db model interface
module.exports = function(app, AdminQuery){

  var adminController = require('./adminController.js')(AdminQuery);

  console.log("in the admin router. query is: ", AdminQuery, "and controller is: ", adminController);
  app.post('/track', adminController.saveTrackCode);
  app.post('/login', adminController.login);

}