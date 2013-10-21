app.factory('Alerts', ['$rootScope', function ($rootScope) {
  function alert(type, message, push) {
    if (push) {
      if (!$rootScope.alerts) {
        $rootScope.alerts = [];
      }
      $rootScope.alerts.push({type: type, message: message});
    } else {
      $rootScope.alerts = [{type: type, message: message}];
    }
  }

  function success(message, push) {
    alert('success', message, push);
  }

  function info(message, push) {
    alert('info', message, push);
  }

  function warning(message, push) {
    alert('warning', message, push);
  }

  function error(message, push) {
    alert('danger', message, push);
  }

  return {
    success: success,
    info: info,
    warning: warning,
    error: error
  };
}]);