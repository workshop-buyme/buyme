app.controller("UsersCtrl", ["$scope", "Users", function ($scope, Users) {

  $scope.user = Users.all();
  $scope.selectedUser = undefined;

  $scope.selectUser = function (item) {
    $scope.selectedUser =  item;
  };

}]);