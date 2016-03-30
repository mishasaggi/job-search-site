//route is passing in an interface to the specific db model
module.exports = function(SearchQuery){
  return {

    getJobs: function(req, res){

      console.log("in savestats jobs controller, request body is: ", req.body);
      var userQuery = req.body;
      var requestIp = require('request-ip');
      userQuery.IP = requestIp.getClientIp(req);

      // indeed API call
      var publisherKey = require('../api-publisher-id.js').publisherId;
      var request = require('request');
      var url = 'http://api.indeed.com/ads/apisearch?publisher=' + publisherKey + '&format=json&q=' + userQuery.jobTitle + '&l=' + userQuery.zipcode + '&sort=&radius=&st=&jt=&start=&limit=&fromage=&filter=&latlong=0&co=us&chnl=FJR&userip=' + userQuery.IP + '&useragent=' + userQuery.client +'&v=2' ;

      request({url: url , json: true}, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.send(body.results);
        }
      })

    },

    saveStats: function(req, res) {

      console.log("in savestats stats controller, request body is: ", req.body);
      var requestIp = require('request-ip');
      var clientIp = requestIp.getClientIp(req);
      //request object
      var reqObj = {
        query: req.body.jobTitle,
        zipcode: req.body.zipcode,
        date: req.body.date,
        ip: clientIp,
        client: req.body.client
      }
      //calls the model method
      SearchQuery.saveStats( reqObj.query, reqObj.zipcode ,reqObj.date, reqObj.ip, reqObj.client )
      .then(function(data){
        res.sendStatus(200);
      })

    },

    getStats: function(req, res) {

      SearchQuery.getStats()
      .then(function(data){
        // console.log(data);
        res.send(data);
      })
    },

    getTrackCode: function(req, res){

      SearchQuery.getTrackCode()
      .then(function(data){
        console.log("GET TRACK", data.trackingCode);
        res.send((data.trackingCode));
      })
    }
  }
}
