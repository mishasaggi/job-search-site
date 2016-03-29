// server passes in the database connection in to the model
module.exports = function(db) {

  return {

    login: function(username, password){
      //login after authenticating user
    },

    saveTrackCode: function(code){
      console.log("in save track controller");
      var collection = db.collection('admin');

      return collection.insert({trackingCode: code});
    }

  }
}
/*
database schema
collection: admin
{
  username: (String),
  password: (String)
}
*/