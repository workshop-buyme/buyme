app.factory('WebSocketService', ['Restangular', '$rootScope', '$log', function (Restangular, $rootScope, $log) {

  var wsSocket;

  function sendMessage(msg) {
    if(wsSocket) {
      wsSocket.send(
        JSON.stringify(
          { msg: msg }
        )
      );
    }
  }

  function receiveEvent(event) {
    console.log(event);
    var data = JSON.parse(event.data);
    // Handle errors
    if(data.error) {
      console.log("WS Error ", data.error);
      if(wsSocket) wsSocket.close();
      // TODO manage error
      return;
    } else {
      console.log("WS received ", data);
      
      switch (data.kind) {
        case 'auction': $rootScope.$broadcast('auction-' + data.action, data.value); break;
        case 'offer': $rootScope.$broadcast('offer-' + data.action, data.value); break;
        case 'connected': break;
        case 'disconnected': break;
        default: $log.error('Unknow WS message type: ' + data.kind);
      }
    }
  }

  // Will do a GET at '/websocket/:id' and return a promise
  // which will return a JSON object when resolved
  function initWebsocket(id) {
    Restangular.one('websocketurl', id).get().then( function(url) {

      var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
      wsSocket = new WS(url);

      wsSocket.onmessage = receiveEvent;
    });

  }

  return {
    sendMessage: sendMessage,
    initWebsocket: initWebsocket
  };
}]);
