// inject all dependencies
angular.module('app', [
  'ngRoute',
  'app.search'
  ])

// routing
  .config(["routeProvider", "$httpProvider", function($routeProvider, $httpProvider){
    $routeProvider
      .when('/', {
        templateUrl: 'index.html'
      })
      .when('/search', {
        templateUrl: 'app/search/search.html',
        controller: 'SearchController'
      })
      .otherwise('/');

  }])
