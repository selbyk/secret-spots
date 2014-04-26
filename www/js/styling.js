var headerHeight = $(".ui-header").outerHeight();
var footerHeight = $(".ui-footer").outerHeight();
var contentHeight = $.mobile.getScreenHeight() - headerHeight - footerHeight;

$(function () {
  headerHeight = $(".ui-header").outerHeight();
  footerHeight = $(".ui-footer").outerHeight();
  contentHeight = $.mobile.getScreenHeight() - headerHeight - footerHeight;

  $("body>[data-role='panel']").panel().enhanceWithin();
  $("[data-role='navbar']").navbar();
  $("[data-role='header'], [data-role='footer']").toolbar();

  $('.ui-loader').css('z-index', 9999);
  $('.ui-header').css('z-index', 9996);
  $('.ui-footer').css('z-index', 9995);

  $('#menu').css('z-index', 9997);
  $("#main").css('min-height', contentHeight + 'px');
  $(".ui-content").css('min-height', contentHeight + 'px');
});
