var logger = function () {
    var _handleMsg = function (msg, type) {
        switch (type) {
            default: _console(msg, type);
        }
    };

    var _alert = function (msg, type) {
        alert(type[0].toUpperCase() + type.substring(1) + ": " + msg);
    };

    var _console = function (msg, type) {
        if (type == 'undefined') type = 'log';
        $('#logs ul').prepend(
        $('<li>').attr('class', type + ' ui-li-static ui-body-inherit').append(
        $('<span>').attr('class', 'msg').append(msg)));
    };

    // New Closure
    function Logger() {
        this.console_level = 'log';
    }

    Logger.prototype.log = function (msg) {
        _handleMsg(msg, 'log');
    };
    Logger.prototype.info = function (msg) {
        _handleMsg(msg, 'info');
    };
    Logger.prototype.warn = function (msg) {
        _handleMsg(msg, 'warn');
    };
    Logger.prototype.error = function (msg) {
        _handleMsg(msg, 'error');
    };
    Logger.prototype.debug = function (msg) {
        _handleMsg(msg, 'debug');
    };

    Logger.prototype.handleConsole = function () {
        var console = window.console;
        if (!console) return;

        function intercept(method) {
            var original = console[method];
            console[method] = function () {
                logger[method](arguments[0]);
                if (original.apply) {
                    // Do this for normal browsers
                    original.apply(console, arguments);
                } else {
                    // Do this for IE
                    var message = Array.prototype.slice.apply(arguments).join(' ');
                    original(message);
                }
            };
        }
        var methods = ['log', 'warn', 'error', 'info', 'debug'];
        for (var i = 0; i < methods.length; i++)
        intercept(methods[i]);
    };

    Logger.prototype.showLogs = function () {
        $('#logs').css('z-index', -1);
    };
    Logger.prototype.hideLogs = function (msg) {
        $('#logs').css('z-index', 9998);
        $("#menu").panel("close");
    };

    return new Logger();
}();

logger.handleConsole();
