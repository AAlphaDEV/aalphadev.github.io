var current_ppage;

/*** Start of scroll disabler ***/

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null;
    window.onwheel = null;
    window.ontouchmove = null;
    document.onkeydown = null;
}

/*** End of scroll disabler ***/

$(function() {
	//jQuery page scrolling using jQuery Easing plugin
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    //PPages
    $('.to-ppage1').data('ppage', '#ppage1');
    $('.to-ppage2').data('ppage', '#ppage2');
    $('.to-ppage3').data('ppage', '#ppage3');
    $('.to-ppage4').data('ppage', '#ppage4');
    $('.to-ppage5').data('ppage', '#ppage5');
    $('.ppage').hide();

    $('.ppage-link').on('click', function(event) {
        current_ppage = $(this).data('ppage');

        $(current_ppage).fadeToggle(200);
        disableScroll();

        return false;
    });
    $('.close-ppage').on('click', function(event) {
        $(current_ppage).fadeToggle(200);
        enableScroll();

        return false;
    });
    
    $('section:not(.success)').hover(function() {
        $(this).css('background', '#D7D7D7');
    }, function() {
        $(this).css('background', '#ffffff');
    });
    
    $('.success').hover(function() {
        $(this).css('background', '#748698');
    }, function() {
        $(this).css('background', '#4C5E70');
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

//Closes the Responsive menu on item click (little screen)
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});
