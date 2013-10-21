app.factory('Auctions', ['Restangular', function (Restangular) {
  
  // Will do a GET at '/Auctions' and return a promise
  // which will return a JSON array when resolved
  function all() {
    return Restangular.all('auctions').getList();
  }

  // Will do a GET at '/Auctions/:id' and return a promise
  // which will return a JSON object when resolved
  function findById(id) {
    return Restangular.one('auctions', id).get();
  }

  function create(value) {
    return Restangular.all('auctions').post(value);
  }

  function update(id, value) {
    if (!value) {
      value = id;
      id = value.id;
    }

    return value.put && value.put() || Restangular.one('auctions', id).customPUT(value);
  }

  function remove(value) {
    return Restangular.one('auctions', value.id || value).remove();
  }

  function addOffer(idAuction, offer) {
    return Restangular.one('auctions', idAuction).post('offers', offer);
  }

  return {
    all: all,
    findById: findById,
    create: create,
    update: update,
    remove: remove,
    addOffer: addOffer
  };
}])