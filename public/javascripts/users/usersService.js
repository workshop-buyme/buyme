app.factory('Users', ['Restangular', function (Restangular) {
  
  // Will do a GET at '/Users' and return a promise
  // which will return a JSON array when resolved
  function all() {
    return Restangular.all('users').getList();
  }

  // Will do a GET at '/Users/:id' and return a promise
  // which will return a JSON object when resolved
  function findById(id) {
    return Restangular.one('users', id).get();
  }

  function create(value) {
    return Restangular.all('users').post(value);
  }

  function update(id, value) {
    if (!value) {
      value = id;
      id = value.id;
    }

    return value.put && value.put() || Restangular.one('users', id).customPUT(value);
  }

  function remove(value) {
    return Restangular.one('users', value.id || value).remove();
  }

  function signup(signupForm) {
    return Restangular.all('users').customPOST(signupForm, 'signup');
  }

  function login(username, password) {
    return Restangular.all('users').customPOST({username: username, password: password}, 'login');
  }

  function logout() {
    return Restangular.one('users', 'logout').get();
  }

  return {
    all: all,
    findById: findById,
    create: create,
    update: update,
    remove: remove,
    signup: signup,
    login: login,
    logout: logout
  };
}]);
