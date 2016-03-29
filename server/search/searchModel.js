// server passes in the database connection in to the model
module.exports = function(db){
  return {

    saveStats: function(query, zipcode, date, ip, client){
      console.log("model: database connection passed in is: ", db);
      var collection = db.collection('searchStats');
      return collection.insert({ searchKeywords: query, zipcode: zipcode, dateTime: date, ipAddress: ip, client: client });
    },

    getStats: function(){
      return collection.find().toArray();
    }

  }
}

/*
database schema

collection: searchStats
{
  searchKeywords: (String),
  zipcode: (Number),
  dateTime: (Date),
  ipAddress: (String),
  client: (String)
}
*/