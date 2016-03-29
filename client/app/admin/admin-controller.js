console.log("in the admin controller");
angular.module('app.admin', [])

  .controller('AdminController', ["$scope", "$location", "UserSearch", "AdminDash", function($scope, $location, UserSearch, AdminDash){

    $scope.stats = [];
    $scope.adminResults = false;

    $scope.getStats = function(){
      console.log("in get stats controller function");
      UserSearch.getStats()
        .then(function(data){
          console.log("stats data recieved from the server is: ", data.data);
          $scope.adminResults = true;
          $scope.stats = data.data;
        })
    }
  }])