/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        $(document).on("pagebeforeshow", ".ui-page", function () {
            if (map.foreground) {
                $('#map-container').css('z-index', -1);
                map.foreground = false;
            }
        });
        $(document).on("pageshow", ".page-map", function () {
            if (!map.foreground) {
                $('#map-container').css('z-index', 9994);
                map.foreground = true;
            }
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        dispatcher = new WebSocketRails('secrspo.herokuapp.com/websocket');
        navigator.geolocation.getCurrentPosition(function (position) {
            user.position = position;
            user.lat = position.coords.latitude;
            user.lng = position.coords.longitude;
            map.updateUserLocation();
            logger.log("location retrieved");
        },

        function () {
            logger.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        });
        navigator.geolocation.watchPosition(function (position) {
            user.position = position;
            user.lat = position.coords.latitude;
            user.lng = position.coords.longitude;
            map.updateUserLocation();
            logger.log("location updated");
        },

        function (error) {
            logger.log('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        }, {
            timeout: 30000
        });
        map.init();
        $.mobile.changePage('pages/map.html');
        var contentHeight = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight();
        $("body>[data-role='panel']").panel().enhanceWithin();
        $("[data-role='navbar']").navbar();
        $("[data-role='header'], [data-role='footer']").toolbar();
        $('.ui-loader').css('z-index', 9999); // note: it appears 'zIndex' no longer works
        $('.ui-header').css('z-index', 9996); // note: it appears 'zIndex' no longer works
        $('.ui-footer').css('z-index', 9995); // note: it appears 'zIndex' no longer works
        $('#menu').css('z-index', 9997);
        $("#main").css('min-height', contentHeight + 'px');
        $('#map-container').css({
            position: "absolute",
            marginLeft: 0,
            marginTop: 0,
            top: $(".ui-header").outerHeight(),
            left: 0,
            width: $("body").outerWidth() + 'px',
            height: contentHeight + 'px'
        });

        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};
