//route is passing in an interface to the specific db model
module.exports = function(AdminQuery){
  return {

    login: function(req, res){
      var jwt = require('jsonwebtoken');

      console.log("in admin login, request body is: " ,req.body);
      var username = req.body.username;
      var password = req.body.password; //plaintext
      AdminQuery.findUser(username)
      .catch(function(err){
        console.error("in retrieving user: ", err);
      })
      .then(function(data){
        if(!data){
          console.error("user not found");
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {

          // check if password matches
          if (user.password != password) {
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {

            // if user is found and password matches, create a token
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresInMinutes: 1440 // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({
              success: true,
              message: 'Enjoy your token!',
              token: token
            });
          }

        }

      })
    },

    saveTrackCode: function(req, res){
      console.log("in save code, request body is: ", req.body);
      var code = req.body.code;
      AdminQuery.saveTrackCode(code)
      .then(function(data){
        res.send(data);
      })
    }

  }
}
