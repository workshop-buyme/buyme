app.factory("Offers", ["Restangular", function (Restangular) {
  
  // Will do a GET at "/Offers" and return a promise
  // which will return a JSON array when resolved
  function all() {
    return Restangular.all("offers").getList();
  }

  // Will do a GET at "/Offers/:id" and return a promise
  // which will return a JSON object when resolved
  function findById(id) {
    return Restangular.one("offers", id).get();
  }

  function create(value) {
    return Restangular.all("offers").post(value);
  }

  function update(id, value) {
    if (!value) {
      value = id;
      id = value.id;
    }

    return value.put && value.put() || Restangular.one("offers", id).customPUT(value);
  }

  function remove(value) {
    return Restangular.one("offers", value.id || value).remove();
  }

  return {
    all: all,
    findById: findById,
    create: create,
    update: update,
    remove: remove
  };
}])