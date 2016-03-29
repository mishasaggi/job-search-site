angular.module('app.services', [])

  .factory('UserSearch', ["$http", function($http){
    //methods for making requests to the server
    var getJobs = function(query){
      console.log("in the search factory, getJobs. query is: ", query);
      return $http.post('/api/search/getJobs', query);
    }

    var saveStats = function(stats){
      console.log("in the search factory, saveStats. input is: ", stats);
      return $http.post('/api/search/saveStats', stats);
    }

    var getStats = function(){
      console.log("in the admin factory");
      return $http.get('/api/search/getStats'); 
    }

    return {
      getJobs: getJobs,
      saveStats: saveStats,
      getStats: getStats
    }

  }])

  .factory('AdminDash', ["$http", function($http){

    return {

    }

  }]);
