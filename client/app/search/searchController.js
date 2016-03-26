angular.module('app.search', [])
  .controller('SearchController', ["$scope", "UserQuery", function($scope, UserQuery) {
    $scope.userInput = {
      jobTitle: "",
      zipcode: 0,
    }
    $scope.userInputError = false;

    $scope.searchNow = function(){
      //validation
      if($scope.userInput.jobTitle === undefined || $scope.userInput.zipcode === undefined) {
        $scope.userInputError = true;
      } else {
        $scope.userInputError = false;
        //call the service method
        UserQuery.getJobs($scope.userInput)
          //change view to render results
          .then(function(){
            $location.path("/search");
          })
      }
    }

  }]);
