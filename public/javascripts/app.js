var app = angular.module('buyme', ['ngRoute', 'ngSanitize', 'ngResource', 'restangular'])
  .constant('Config', {})
  .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!');

    $routeProvider
      .when('/', {
        templateUrl: '/views/index',
        controller: 'AuctionsCtrl'
      })
      .when('/account', {
        templateUrl: '/views/users/account'
      })
      .when('/signup', {
        templateUrl: '/views/users/signup',
        controller: 'SignupCtrl'
      })
      .when('/login', {
        templateUrl: '/views/users/login',
        controller: 'LoginCtrl'
      })
      .when('/auctions/create', {
        templateUrl: '/views/auctions/create',
        controller: 'AuctionCreateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }])
  .config(['RestangularProvider', function (RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
  }])
  .run(['$rootScope', 'WebSocketService', function ($rootScope, WebSocketService) {
    $rootScope.closeAlert = function (alert) {
      $rootScope.alerts = _.without($rootScope.alerts, alert);
    };

    $rootScope.$on('login', function (event) {
      WebSocketService.init($rootScope.user.username);
    });

    $rootScope.$on('logout', function (event) {
      WebSocketService.close();
    });
  }]);
