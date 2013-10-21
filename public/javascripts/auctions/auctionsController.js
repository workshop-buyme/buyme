app.controller('AuctionsCtrl', ['$scope', '$location', 'Alerts', 'Auctions', function ($scope, $location, Alerts, Auctions) {
  $scope.auctions = [];

  Auctions.all().then(function (auctions) {
    $scope.auctions = _.sortBy(auctions, function (auction) {
      return -auction.startDate;
    });

    $scope.$on('auction-new', function (event, auction) {
      $scope.$apply(function () {
        $scope.auctions.unshift(auction);
      });
    });

    $scope.$on('auction-ended', function (event, idAuction) {
      $scope.$apply(function () {
        var scopeAuction = _.find($scope.auctions, function (a) {
          return a.id === idAuction;
        });

        if (scopeAuction) {
          scopeAuction.hasEnded = true;
        }
      });
    });

    $scope.$on('offer-new', function (event, auction) {
      $scope.$apply(function () {
        var scopeAuction = _.find($scope.auctions, function (a) {
          return a.id === auction.id;
        });

        if (scopeAuction) {
          scopeAuction.maxOffer = auction.maxOffer;
          scopeAuction.offers = auction.offers;
        }
      });
    });
  });

  $scope.offerForms = {};

  $scope.makeOffer = function (auction) {
    var offerAmount = $scope.offerForms[auction.id];
    var auctionMaxPrice = auction.offers.length ? _.last(auction.offers).amount : auction.startPrice;
    if (offerAmount && offerAmount > auctionMaxPrice) {
      Auctions.addOffer(auction.id, {amount: offerAmount, buyer: $scope.user.username}).then(function (updated) {
        auction.offers = updated.offers;
        $scope.offerForms[auction.id] = undefined;
        Alerts.success('You just took the lead! Will you keep it until the end?');
      }, function (error) {
        Alerts.error('God dammit... an error just occured: ' + angular.toJson(error.data));
      });
    } else {
      Alerts.error('Sorry, but you need to put more money on it.');
    }
  };

  $scope.remove = function (auction) {
    Auctions.remove(auction).then(function () {
      $scope.auctions = _.without($scope.auctions, auction);
      Alerts.success('So be it dude, nobody will be able to buy your stuff anymore.');
    }, function (error) {
      Alerts.error('Holy cow, an error just occured: ' + angular.toJson(error.data));
    });
  };

}]);