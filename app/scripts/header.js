$( function() {
    $('.menu').on('click', function(e) {
        if(e.target == $(this).get()[0]) {
            $('.menu').removeClass('menu-open');
            $('.hamburger-box').removeClass('active');
            $('body').removeClass('hide');
        }
    })

    $('.hamburger-box').on('click', function() {
        if($(this).hasClass('active')){
            $(this).removeClass('active');
            $('.menu').removeClass('menu-open');
            $('body').removeClass('hide');
        }else{
            $(this).addClass('active');
            $('.menu').addClass('menu-open');
            $('body').addClass('hide');
        }
    })

    $('.menu-close').on('click', function() {
        $('.menu').removeClass('menu-open');
        $('.hamburger-box').removeClass('active');
        $('body').removeClass('hide');
    })

    $('.menu-toggle').bind('click', function() {
        $(this).toggleClass('toggle');
        $(this).parents('.menu-title').siblings('.menu-expand').slideToggle(150);
    })

    $('.toggle-md').bind('click', function(){
        $(this).siblings('.menu-link').toggleClass('active');
    })
});