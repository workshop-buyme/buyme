app.controller('LoginCtrl', ['$scope', '$rootScope', '$location', 'Alerts', 'Users', 'WebSocketService', function ($scope, $rootScope, $location, Alerts, Users, WebSocketService) {
  $scope.loginForm = {};

  $scope.login = function () {
    Users.login($scope.loginForm.username, $scope.loginForm.password).then(function (user) {
      $rootScope.user = _.clone( _.omit(user, "password") );
      $location.path("/");
      Alerts.success('Welcome back ' + $rootScope.user.username + '!');
      $scope.$emit('login');
    }, function (error) {
      Alerts.error('Nice try, but wrong credentials dude.');
    });
  };
}]);