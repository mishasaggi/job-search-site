console.log("in the admin controller");
angular.module('app.admin', [])

  .controller('AdminController', ["$scope", "$location", "$localStorage", "UserSearch", "AdminDash", function($scope, $location, $localStorage, UserSearch, AdminDash){
    $scope.stats = [];
    $scope.adminResults = false;
    $scope.loginInputError = false;
    $scope.userCred = {};

    $scope.getStats = function(){
      UserSearch.getStats()
        .then(function(data){
          $scope.adminResults = true;
          $scope.stats = data.data;
        })
    }

    $scope.saveTrackCode = function(){
      var codeObj = { code: $scope.trackingCode }
      AdminDash.saveTrackCode(codeObj)
        .then(function(data){
        })
    }

    $scope.login = function(){

      if($scope.userCred.username === undefined || $scope.userCred.password === undefined) {
        $scope.loginInputError = true;
      } else {
        $scope.loginInputError = false;

        AdminDash.login($scope.userCred)
        .then(function(response){
          $localStorage.token = response.data.token;
          $location.path('/admin'); 
        })
      }
    }

    $scope.clearToken = function(){
      $localStorage.$reset();
    }

  }])
