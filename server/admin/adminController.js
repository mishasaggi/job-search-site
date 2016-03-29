//route is passing in an interface to the specific db model
module.exports = function(AdminQuery){
  return {

    login: function(req, res){
      console.log("in admin login, request body is: " ,req.body);
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
