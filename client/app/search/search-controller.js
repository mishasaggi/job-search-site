console.log("in the controller");
angular.module('app.search', [])
  .controller('SearchController', ["$scope", "$location", "UserQuery", function($scope, $location, UserQuery) {
    $scope.userInput = {}
    $scope.userInputError = false;
    $scope.results = false;
    $scope.jobs = [];

    $scope.searchNow = function(){
      console.log("scope vars after input: ", $scope.userInput);
      //validation
      if($scope.userInput.jobTitle === undefined && $scope.userInput.zipcode === undefined) {
        $scope.userInputError = true;
      } else {
        $scope.userInputError = false;

        //call the service method
        UserQuery.getJobs($scope.userInput)
          .then( function(data){
            console.log("data recieved from the server: ", data);
            $scope.jobs = data.data;
            $scope.results = true;
          })
      }
    }

    // maybe have a button to clear results?

  }]);
