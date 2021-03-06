console.log("in the search controller");
angular.module('app.search', [])
  
  .controller('SearchController', ["$scope", "$location", "UserSearch", function($scope, $location, UserSearch) {
    $scope.userInput = {}
    $scope.userInputError = false;
    $scope.jobResults = false;
    $scope.jobs = [];
    $scope.totalJobs;
    $scope.jobsPerPage = 10;
    $scope.currentPage = 0;

    $scope.searchNow = function(){

      var navigator = window.navigator;

      //The request header "User-Agent" is in most browsers incorrect, 
      //this has more coverage in terms of picking up the true client browser
      if( /Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent) ) {
          $scope.userInput.client = 'Mozilla FireFox';
      } else if( /Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent) ){
          $scope.userInput.client = 'Chrome'
      } else if( navigator.userAgent.indexOf('OPR/') != -1 ){
          $scope.userInput.client = 'Opera';
      } else if( navigator.userAgent.indexOf('Trident') != -1 && navigator.userAgent.indexOf('MSIE') == -1 ){
          $scope.userInput.client = 'IE11';
      } else {
        $scope.userInput.client = 'not detected';
      }

      //validation
      if($scope.userInput.jobTitle === undefined && $scope.userInput.zipcode === undefined) {
        $scope.userInputError = true;
      } else {
        $scope.userInputError = false;

        //call the service method to make an API call to indeed
        UserSearch.getJobs($scope.userInput, $scope.currentPage*$scope.jobsPerPage)
          .then( function(data){
            //results per page
            $scope.jobs = data.results;
            //total jobs
            $scope.totalJobs = data.totalJobs;
            $scope.jobResults = true;
          })
          //callthe service method to save stats to db
          .then (function(){
            var now = new Date();
            now = now.toUTCString();
            $scope.userInput.date = now;
            UserSearch.saveStats($scope.userInput);
          })
          .then(function(data){
          })
      }
    }

    $scope.prevPage = function() {
      if ($scope.currentPage > 0) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function() {
      return $scope.currentPage === 0 ? "disabled" : "";
    };

    $scope.nextPage = function() {
      if ($scope.currentPage < $scope.pageCount() - 1) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function() {
      return $scope.currentPage === $scope.pageCount() - 1 ? "disabled" : "";
    };

    $scope.pageCount = function() {
      return Math.ceil($scope.totalJobs/$scope.jobsPerPage);
    };

    $scope.$watch("currentPage", function(newValue, oldValue){
      $scope.searchNow()
    });


  }])



