function Map(div) {
    // New Closure
    function map(div) {
        this.element = div;
        this.visible = true;
        this.mapObject = null;
        this.userMarker = null;
        this.options = {
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.TERRAIN,
            center: new google.maps.LatLng(30.8819275, -91.3456801),
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            panControl: false,
            zoomControl: false,
            scaleControl: false,
            streetViewControl: false,
            draggable: false
        };
    }

    map.prototype.initialize = function () {
        $(this.element).css({
            position: "absolute",
            marginLeft: 0,
            marginTop: 0,
            top: $(".ui-header").outerHeight(),
            left: 0,
            width: $("body").outerWidth() + 'px',
            height: contentHeight + 'px'
        });

        $(this.element).css('z-index', 9994);

        if (user.position !== null)
            this.options.center = new google.maps.LatLng(user.position.coords.latitude, user.position.coords.longitude);

        this.mapObject = new google.maps.Map($(this.element)[0], this.options);
        this.updateUserLocation();
    };

    map.prototype.show = function () {
        logger.info('show map');
        if (!this.visible) {
            $(this.element).css('z-index', 9994);
            this.visible = true;
        }
    };

    map.prototype.hide = function () {
        logger.info('hide map');
        if (this.visible) {
            $(this.element).css('z-index', -1);
            this.visible = false;
        }
    };

    map.prototype.updateUserLocation = function () {
        if (user.position !== null) {
            var pos = new google.maps.LatLng(user.position.coords.latitude, user.position.coords.longitude);
            if (this.userMarker !== null) this.userMarker.setMap(null);
            this.userMarker = new google.maps.Marker({
                position: pos,
                title: "Your Location",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    strokeColor: '#6199df',
                    strokeOpacity: 0.8
                }
            });
            this.userMarker.setMap(this.mapObject);
            this.mapObject.panTo(pos);
        }
    };

    return new map(div);
};

var map = new Map('#map-container');

function initializeMap() {
    map.initialize();

    $(document).on("pagebeforeshow", ".ui-page", map.hide);
    $(document).on("pageshow", ".page-map", map.show;

    navigator.geolocation.watchPosition(function (position) {
        user.position = position;
        user.lat = position.coords.latitude;
        user.lng = position.coords.longitude;
        map.updateUserLocation();
        logger.log("location updated");
    }, function (error) {
        logger.log('code: ' + error.code + '\n' +
            'message: ' + error.message + '\n');
    }, {
        timeout: 30000
    });
}
