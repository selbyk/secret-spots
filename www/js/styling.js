var contentHeight = $.mobile.getScreenHeight() - $(".ui-header").outerHeight() - $(".ui-footer").outerHeight();

$("body>[data-role='panel']").panel().enhanceWithin();
$("[data-role='navbar']").navbar();
$("[data-role='header'], [data-role='footer']").toolbar();

$('.ui-loader').css('z-index', 9999);
$('.ui-header').css('z-index', 9996);
$('.ui-footer').css('z-index', 9995);

$('#menu').css('z-index', 9997);
$("#main").css('min-height', contentHeight + 'px');
