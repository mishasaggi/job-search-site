angular.module('app.services', [])

  .factory('UserQuery', ["$http", function($http){
    //methods for making requests to the server
    var getJobs = function(query){
      console.log("in the search factory. query is: ", query);
      return $http.post('/api/search/getJobs', query);
    }

    return {
      getJobs: getJobs
    }

  }]);
