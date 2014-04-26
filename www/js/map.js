var map = {
    foreground: false,
    _object: null,
    _userCircle: null,
    options: {
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
    },
    init: function () {
        if (user.position !== null)
            this.options.center = new google.maps.LatLng(user.position.coords.latitude, user.position.coords.longitude);
        this._object = new google.maps.Map($("#map-container"), this.options);
        this.updateUserLocation();
    },
    updateUserLocation: function () {
        if (user.position !== null) {
            var pos = new google.maps.LatLng(user.position.coords.latitude, user.position.coords.longitude);
            if (this._userCircle !== null) this._userCircle.setMap(null);
            this._userCircle = new google.maps.Marker({
                position: pos,
                title: "Your Location",
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 10,
                    strokeColor: '#6199df',
                    strokeOpacity: 0.8
                }
            });
            this._userCircle.setMap(this._object);
            this._object.panTo(pos);
        }
    }
};
