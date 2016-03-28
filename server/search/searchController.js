//route is passing in an interface to the specific db model
module.exports = function(SearchQuery){
  return {
    saveStats: function() {
      //called by the get Jobs method
    },

    getJobs: function(req, res){
      console.log("in the controller method. the request body is: ", req.body);
      var userQuery = req.body;
      userQuery.IP = '70.113.67.152' //temp test data
      userQuery.client = 'Chrome' //temp test data
      // indeed API call
      var publisherKey = require('../api-publisher-id.js').publisherId;
      var request = require('request');
      var url = 'http://api.indeed.com/ads/apisearch?publisher=' + publisherKey + '&format=json&q=' + userQuery.jobTitle + '&l=' + userQuery.zipcode + '&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=0&co=us&chnl=FJR&userip=' + userQuery.IP + '&useragent=' + userQuery.client +'&v=2' ;

      request({url: url , json: true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          console.log(body);
          res.send(body.results);
        }
      })

      //call the method to save stats to the db
    }
  }
}
