app.controller('SignupCtrl', ['$scope', '$rootScope', '$location', 'Alerts', 'Users', function ($scope, $rootScope, $location, Alerts, Users) {
  $scope.signupForm = {};

  $scope.signup = function () {
    Users.signup($scope.signupForm).then(function (response) {
      $rootScope.user = response;
      $location.path('/');
      Alerts.success('Welcome aboard ' + $rootScope.user.username + '!');
      $scope.$emit('login');
    }, function (error) {
      Alerts.error('Looks like something went really wrong: ' + error.data);
    });
  };
}]);
