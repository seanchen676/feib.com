$( function() {
    $('.menu').on('click', function(e) {
        if(e.target == $(this).get()[0]) {
            $('.menu').removeClass('menu-open');
            $('.hamburger-box').removeClass('active');
            $('body').removeClass('modal-open');
        }
    })

    $('.hamburger-box').bind('click', function() {
        $(this).toggleClass('active');
        $('.menu').toggleClass('menu-open');
        $('body').toggleClass('modal-open');
    })

    $('.menu-close').on('click', function() {
        $('.menu').removeClass('menu-open');
        $('.hamburger-box').removeClass('active');
        $('body').removeClass('modal-open');
    })

    $('.menu-toggle').bind('click', function() {
        $(this).toggleClass('toggle');
        $(this).parents('.menu-title').siblings('.menu-expand').slideToggle(150);
    })

    $('.toggle-md').bind('click', function(){
        $(this).siblings('.menu-link').toggleClass('active');
    })

    $('.anchor-link').on('click', function() {
        var hrefLink = $(this).attr('href');
        $('html,body').animate({
            scrollTop: $(hrefLink).offset().top
        }, 500)
    })
});