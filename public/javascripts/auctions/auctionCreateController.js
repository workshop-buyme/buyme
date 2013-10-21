app.controller('AuctionCreateCtrl', ['$scope', '$location', 'Alerts', 'Auctions', function ($scope, $location, Alerts, Auctions) {
  $scope.auctionForm = {};
  
  $scope.create = function () {
    Auctions.create(_.extend($scope.auctionForm, {
      startDate: Date.now(),
      endDate: Date.now() + $scope.auctionForm.duration * 1000,
      seller: $scope.user.username,
      hasEnded: false,
      maxOffer: $scope.auctionForm.startPrice,
      offers: []
    })).then(function (auction) {
      Alerts.success('Looks like your auction just got the 1st place!');
      $location.path('/');
    }, function (error) {
      Alerts.error('Holy cow, an error just occured: ' + angular.toJson(error.data));
    });
  };
}]);