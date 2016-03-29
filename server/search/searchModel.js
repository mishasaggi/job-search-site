// server passes in the database connection in to the model
module.exports = function(db){
  return {

    saveStats: function(query, zipcode, date, ip, client){
      // console.log("model savest: database connection passed in is: ", db);
      var collection = db.collection('searchStats');
      return collection.insert({ searchKeywords: query, zipcode: zipcode, dateTime: date, ipAddress: ip, client: client });
    },

    getStats: function(){
      // console.log("model getst: database connection passed in is: ", db);
      var collection = db.collection('searchStats');
      // console.log("collection is: ", collection);
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
