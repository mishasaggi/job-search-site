angular.module('app.services', [])

  .factory('UserSearch', ["$http", function($http){

    var getJobs = function(query, start){
      console.log("in the search factory, getJobs. query is: ", query,"and " ,start);
      var totalJobs, results;
       return $http.post('/api/search/getJobs', {query: query, start: start}).then(function(response){
        console.log("get RESPONSE is", response);
        return { results: response.data.results,
                  totalJobs: response.data.totalResults }
      })

    }

    var saveStats = function(stats){
      console.log("in the search factory, saveStats. input is: ", stats);
      return $http.post('/api/search/saveStats', stats);
    }

    var getStats = function(){
      console.log("in the search factory, getstats.");
      return $http.get('/api/search/getStats'); 
    }

    return {
      getJobs: getJobs,
      saveStats: saveStats,
      getStats: getStats
    }

  }])

  .factory('AdminDash', ["$http", "$localStorage", function($http){

    var saveTrackCode = function(code){
      console.log("in the tracking service, code is: ", code);
      return $http.post('/api/admin/track', code);
    }

    var login = function(userCred){
      console.log("in the login service, code is: ", userCred);
      return $http.post('/api/admin/login', userCred);

    }

    return {
      saveTrackCode: saveTrackCode,
      login: login
    }

  }])
