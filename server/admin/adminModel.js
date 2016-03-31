// server passes in the database connection in to the model
module.exports = function(db) {

  return {

    findUser: function(username, password){
      var collection = db.collection('admin');
      return collection.findOne({name: username});
    },

    saveTrackCode: function(code){
      console.log("in save track controller");
      var collection = db.collection('scripts');

      return collection.update({_id: "html tracker"}, { $set: { "trackingCode": code } } );
    }

  }
}
/*
database schema
collection: admin
{
  username: (String),
  password: (String),
  flag: boolean
}
*/