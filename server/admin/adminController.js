//route is passing in an interface to the specific db model
module.exports = function(AdminQuery, jwt, secret){
  return {

    login: function(req, res){
      // var dbConfig = require('../dbConfig.js');
      // var jwt = require('jsonwebtoken');

      console.log("in admin login, request body is: " ,req.body);
      console.log("checking appget: ")
      var username = req.body.username;
      var password = req.body.password; //plaintext
      AdminQuery.findUser(username)
      .catch(function(err){
        console.error("in retrieving user: ", err);
      })
      .then(function(user){
        if(!user){
          console.error("user not found");
          res.json({ success: false, message: 'Authentication failed. User not found.' });
        } else {
          console.log("user recieved from model is: ", user);
          // check if password matches
          if (user.passhash != password) {
            console.log("password does not match");
            res.json({ success: false, message: 'Authentication failed. Wrong password.' });
          } else {
            console.log("have a match");
            // if user is found and password matches, create a token
            var token = jwt.sign(user, secret, {
              expiresIn: 5000 // in seconds
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
