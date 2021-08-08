$( function() {
    $('#BackTop').click(function() {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > $(window).height()) {
            $('#BackTop').fadeIn(150);
        } else {
            $('#BackTop').stop().fadeOut(150);
        }
    }).scroll();
});