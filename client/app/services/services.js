angular.module('app.services', [])

  .factory('UserQuery', ["$http", function($http){
    //methods for making requests to the server
    var getJobs = function(query){
      return $http.post('/api/search/getJobs', query);
    }

  }])
