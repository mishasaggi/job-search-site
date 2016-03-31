console.log("in the app");
angular.module('app', [
  'ui.router',
  'ngStorage',
  'app.services',
  'app.search',
  'app.admin'
  ]
)

// routing
  .config(function($httpProvider, $stateProvider, $urlRouterProvider) {

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

    $urlRouterProvider.otherwise('/');

    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function($q, $location, $localStorage) {
      return {
        'request': function (config) {
          console.log("config in request is: ", config);
          config.headers = config.headers || {};
          if ($localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $localStorage.token;
            console.log( config.headers.Authorization );
          }
          return config;
        },
        'responseError': function(response) {
          if(response.status === 401 || response.status === 403) {
            $location.path('/');
          }
          return $q.reject(response);
        }
      };
    }]);

  })

