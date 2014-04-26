function loading(showOrHide) {
    $('.ui-loader').css('z-index', 9999); // note: it appears 'zIndex' no longer works
    setTimeout(function(){
        $.mobile.loading(showOrHide, {
            text: 'Loadingg....',
            textVisible: true,
            theme: 'b',
            html: ''
        });
    }, 1);
}
