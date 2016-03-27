//route is passing in an interface to the specific db model
module.exports = function(SearchQuery){
 return {
  saveStats: function() {
    //called by the get Jobs method
  },
  indeedAPI: function() {

  },
  getJobs: function(request, response){
    console.log("the request body is: ", request.body);

    //call the method to save stats to the db

    // call the method make the API call to indeed
  }
 }
}


// controller methods calling model methods to:
// save user query, date and ip address to the data base

// make the api call with the default plus user params.
