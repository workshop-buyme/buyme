app.controller('NavCtrl', ['$scope', '$rootScope', '$location', 'Alerts', 'Users', function ($scope, $rootScope, $location, Alerts, Users) {
  $scope.logout = function () {
    Users.logout().then(function () {
      $location.path('/');
      Alerts.success('See you soon ' + $rootScope.user.username + '!');
      $rootScope.user = undefined;
      $scope.$emit('logout');
    });
  };
}]);