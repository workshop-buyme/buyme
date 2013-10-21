app.controller("OffersCtrl", ["$scope", "Offers", function ($scope, Offers) {

  $scope.offer = Offers.all();
  $scope.selectedOffer = undefined;

  $scope.selectOffer = function (item) {
    $scope.selectedOffer =  item;
  };

}]);