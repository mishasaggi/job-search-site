angular.module('app.services', [])

  .factory('UserSearch', ["$http", function($http){

    var getJobs = function(query, start){
      var totalJobs, results;
       return $http.post('/api/search/getJobs', {query: query, start: start}).then(function(response){
        return { results: response.data.results,
                  totalJobs: response.data.totalResults }
      })

    }

    var saveStats = function(stats){
      return $http.post('/api/search/saveStats', stats);
    }

    var getStats = function(){
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
      return $http.post('/api/admin/track', code);
    }

    var login = function(userCred){
      return $http.post('/api/admin/login', userCred);

    }

    return {
      saveTrackCode: saveTrackCode,
      login: login
    }

  }])
