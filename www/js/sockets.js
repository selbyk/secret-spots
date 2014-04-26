var dispatcher = new WebSocketRails('wss://secrspo.herokuapp.com/websocket');

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

$(function () {
    setInterval(function () {
        if (dispatcher.state == 'undefined') dispatcher = new WebSocketRails('wss://secrspo.herokuapp.com/websocket');
        else {
            var status = dispatcher.state;
            if (status == 'disconnected') {
                logger.error('Websocket status: ' + status);
                logger.warn('Websocket reconnecting...');
                dispatcher.reconnect();
            } else {
                logger.info('Websocket status: ' + status);
            }
        }
    }, 10000);
});
