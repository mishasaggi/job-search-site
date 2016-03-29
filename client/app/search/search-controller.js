console.log("in the search controller");
angular.module('app.search', [])
  
  .controller('SearchController', ["$scope", "$location", "UserSearch", function($scope, $location, UserSearch) {
    $scope.userInput = {}
    $scope.userInputError = false;
    $scope.jobResults = false;
    $scope.jobs = [];

    $scope.searchNow = function(){
      console.log("scope vars after input: ", $scope.userInput);
      //validation
      if($scope.userInput.jobTitle === undefined && $scope.userInput.zipcode === undefined) {
        $scope.userInputError = true;
      } else {
        $scope.userInputError = false;

        //call the service method to make an API call to indeed
        UserSearch.getJobs($scope.userInput)
          .then( function(data){
            console.log("jobs data recieved from the server: ", data);
            $scope.jobs = data.data;
            $scope.jobResults = true;
          })
          //callthe service method to save stats to db
          .then (function(){
            UserSearch.saveStats($scope.userInput);
          })
          .then(function(data){
            console.log("save stats response recieved is: ", data);
          })
      }
    }

    // maybe have a button to clear results?

  }]);
