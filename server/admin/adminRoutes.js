// server passes in the router and db model interface
module.exports = function(app, AdminQuery, jwt, secret){

  var adminController = require('./adminController.js')(AdminQuery, jwt, secret);

  app.post('/track', adminController.saveTrackCode);
  app.post('/login', adminController.login);

}