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
        // UserQuery.getJobs($scope.userInput)

        //test data
        $scope.jobs.push({
          jobtitle: "java dev",
          company: "moto",
          formattedLocation: "ATX",
          snippet: "blah blah...",
          formattedRelativeTime: "3 days ago",
          url: "http://faculty.washington.edu/krumme/guides/links.html"
        }, {
          jobtitle: "go dev",
          company: "google",
          formattedLocation: "MA",
          snippet: "blah blah...",
          formattedRelativeTime: "3 days ago",
          url: "www.apple.com"
        })
        $scope.results = true;
      }
    }

    // maybe have a button to clear results?

  }]);
