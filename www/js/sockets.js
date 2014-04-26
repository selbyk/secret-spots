dispatcher.on_open = function (data) {
    logger.info('Websocket connection opened');
};

dispatcher.on_error = function (data) {
    logger.error('Error with websockets');
};

dispatcher.on_close = function (data) {
    logger.warn('Websocket connection closed');
};

var success = function (response) {
    if (response.message == "undefined") logger.error("Server replied with error! \n" + JSON.stringify(response));
    else logger.info("Success! \n" + response.message);
};

var failure = function (response) {
    if (response.message == "undefined") logger.error("Server replied with error! \n" + JSON.stringify(response));
    else logger.error("Server replied with error! \n" + response.message);
};


document.addEventListener("deviceready", function(){
    var dispatcher = new WebSocketRails('wss://secrspo.herokuapp.com/websocket');
    var connecting = false;
    setInterval(function () {
        if (dispatcher.state == 'undefined') dispatcher = new WebSocketRails('wss://secrspo.herokuapp.com/websocket');
        else {
            var status = dispatcher.state;
            if (status == 'disconnected') {
                logger.error('Websocket status: ' + status);
                logger.warn('Websocket reconnecting...');
                dispatcher.reconnect();
            } if (status == 'connecting') {
                logger.info('Websocket status: ' + status);
                if(connecting == true) {
                    logger.warn('Websocket connection stale, reconnecting...');
                    dispatcher.reconnect();
                    connecting = false;
                } else connecting = true;
            } else {
                logger.log('Websocket status: ' + status);
            }
        }
    }, 10000);
});
