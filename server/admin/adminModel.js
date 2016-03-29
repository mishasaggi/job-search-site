// server passes in the database connection in to the model
module.exports = function(db) {

  return {

    login: function(username, password){
      //login after authenticating user
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