// server passes in the database connection in to the model
module.exports = function(db){
  return {

    saveStats: function(query, zipcode, date, ip){
      console.log("database connection passed in is: ", db);
      var collection = db.collection('searchStats');
      return collection.insert({ searchKeywords: "javascript", zipcode: 78701, dateTime: "Mar28", ipAddress: "1.2.3.4" });
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
  ipAddress: (String)
}
*/