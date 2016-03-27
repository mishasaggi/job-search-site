console.log("in the app");
angular.module('app', [
  'ui.router',
  'app.search'
  ]
)

// routing
  .config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/search/search.html',
      controller: 'SearchController'
    })
    .state('admin', {
      url: '/admin',
      templateUrl: 'app/admin/admin.html',
      controller: 'AdminController'
    })
  })
