'use strict';

angular.module('app', [])

  .controller('SearchController', function($scope){
    $scope.results = [];
    $scope.userInput = {
      jobTitle: "",
      zipcode: ""
    }

    $scope.fetchJobs = function() {
      console.log("control in fetch jobs now");
      console.log("user-entered: ", $scope.userInput);
      //http post
    }

  })
