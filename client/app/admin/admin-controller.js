console.log("in the admin controller");
angular.module('app.admin', [])

  .controller('AdminController', ["$scope", "$location", "$localStorage", "UserSearch", "AdminDash", function($scope, $location, $localStorage, UserSearch, AdminDash){
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

    $scope.saveTrackCode = function(){
      console.log("in save track controller func, code entered is: ", $scope.trackingCode);
      var codeObj = { code: $scope.trackingCode }
      AdminDash.saveTrackCode(codeObj)
        .then(function(data){
          console.log("response from server- saveTrackCode: ", data);
        })
    }

    $scope.login = function(){
      console.log("in login controller. vars are: ", $scope.userCred);
      AdminDash.login($scope.userCred)
      .then(function(response){
        console.log("response from server- login: ", response)
        $localStorage.token = response.data.token;
        $location.path('/admin'); 
        // $route.reload(); //check if reload is needed for the auth request
      })
    }

    $scope.clearToken = function(){
      $localStorage.$reset();
    }

  }])
