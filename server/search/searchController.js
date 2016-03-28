//route is passing in an interface to the specific db model
module.exports = function(SearchQuery){
 return {
  saveStats: function() {
    //called by the get Jobs method
  },
  indeedAPI: function() {

  },
  getJobs: function(request, response){
    console.log("in the controller method. the request body is: ", request.body);

    //test data
    var results = [{
      jobtitle: "java dev",
      company: "moto",
      formattedLocation: "ATX",
      snippet: "blah blah...",
      formattedRelativeTime: "3 days ago",
      url: "http://faculty.washington.edu/krumme/guides/links.html"
      },{
      jobtitle: "go dev",
      company: "google",
      formattedLocation: "MA",
      snippet: "blah blah...",
      formattedRelativeTime: "3 days ago",
      url: "www.apple.com"
    }]
    response.send(results);
    //call the method to save stats to the db

    // call the method make the API call to indeed
  }
 }
}


// controller methods calling model methods to:
// save user query, date and ip address to the data base

// make the api call with the default plus user params.
