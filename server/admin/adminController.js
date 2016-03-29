//route is passing in an interface to the specific db model
module.exports = function(AdminQuery){
  return {
    login: function(req, res){
      console.log("in admin login, request is: " ,req);
    }
  }
}