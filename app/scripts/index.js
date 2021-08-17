$( function() {
    $('#ranking-tabs').tabs();
    $('#calculator-tabs').tabs();
    $('#singleInvestment-tabs').tabs();
    $('#dollarCostAveraging-tabs').tabs();
    $('#news-tabs').tabs();
    $('#board-tabs').tabs();
    var swiperPc = new Swiper('.swiper-container-pc', {
        navigation: {
            nextEl: '.swiper-container-pc .swiper-button-next',
            prevEl: '.swiper-container-pc .swiper-button-prev',
        },
        pagination: {
            el: '.swiper-container-pc .swiper-pagination',
            clickable: true,
        },
        loop: true,
        noSwiping: false,
        allowTouchMove: false,
        breakpoints: {
            1024: {
                noSwiping: true,
                allowTouchMove: true,
            },
        },
    });

    var swiperMobile = new Swiper('.swiper-container-mobile', {
        pagination: {
            el: '.swiper-container-mobile .swiper-pagination',
        },
        loop: true,
    });

    swiperPc.on('slideChange', function () {
        if((this.realIndex+1) < 10){
            $('.swiper-count').text('0'+(this.realIndex+1));
        }else{
            $('.swiper-count').text(this.realIndex+1);
        };
    });

    swiperPc.on('slideChangeTransitionEnd', function() {
        var swiperPcIndex = $('.swiper-container-pc').find('.swiper-slide-active').attr('data-swiper-slide-index');
        swiperMobile.slideToLoop(parseInt(swiperPcIndex));
    })

    swiperMobile.on('slideChangeTransitionEnd', function() {
        var swiperMobileIndex = $('.swiper-container-mobile').find('.swiper-slide-active').attr('data-swiper-slide-index');
        swiperPc.slideToLoop(parseInt(swiperMobileIndex));
    })

    $('.swiper-slide').on('click', function() {
        $('.swiper-slide').removeClass('active');
        $(this).addClass('active');
        var tab = $(this).data('tab');
        $('.board-tabs-content').removeClass('active');
        $('#board-tabs-'+tab).addClass('active');
    });

    $('#ranking-prev-arrow').on('click', function(){
        var pageItems = $(this).siblings('.pagination').find('.page-item');
        var activeItem = $(this).siblings('.pagination').find('.page-item.active .page-link');
        var pageValue = parseInt(activeItem.text());
        if(pageValue > 1){
            pageItems.removeClass('active');
            pageItems.eq(pageValue-2).addClass('active');
        }
    })

    $('#ranking-next-arrow').on('click', function(){
        var pageItems = $(this).siblings('.pagination').find('.page-item');
        var activeItem = $(this).siblings('.pagination').find('.page-item.active .page-link');
        var pageValue = parseInt(activeItem.text());
        if(pageValue < pageItems.length){
            pageItems.removeClass('active');
            pageItems.eq(pageValue).addClass('active');
        }
    })

    $('.page-item').on('click', function () {
        $('.page-item').removeClass('active');
        $(this).addClass('active');
    })

    $('.ranking-tabs-item').on('click', function () {
        var tab = $(this).data('tab');
        $('.page-item').removeClass('active');
        $('#ranking-tabs-'+tab).find('.page-item').eq(0).addClass('active');
    })

    $('#board-tabs-btn-right').on('click', function(e) {
        var ulWidth = $('.board-tabs-list').get()[0].clientWidth;
        var scrollLeft = $('.board-tabs-list').get()[0].scrollLeft;
        $('.board-tabs-list').animate( { scrollLeft: scrollLeft+ulWidth }, 300);
    })
    
    $('#board-tabs-btn-left').on('click', function(e) {
        var ulWidth = $('.board-tabs-list').get()[0].clientWidth;
        var scrollLeft = $('.board-tabs-list').get()[0].scrollLeft;
        $('.board-tabs-list').animate( { scrollLeft: scrollLeft-ulWidth }, 300);
    })

    var boardTabsItemIndex = 0;
    $('.board-tabs-active-line').css('left', $('.board-tabs-item').first().get()[0].offsetLeft).css('width', $('.board-tabs-item').first().get()[0].clientWidth);
    $('.board-tabs-item').on('click', function() {
        boardTabsItemIndex = $(this).index();
        var itemRef = {
            index: $(this).index(),
            width: $(this).get()[0].clientWidth,
            left: $(this).get()[0].offsetLeft,
        }
        if(itemRef){
            $('.board-tabs-active-line').css('left', itemRef.left).css('width', itemRef.width);
        }
    })

    $(window).resize(function(){
        var itemRef = {
            width: $('.board-tabs-item').eq(boardTabsItemIndex).get()[0].clientWidth,
            left: $('.board-tabs-item').eq(boardTabsItemIndex).get()[0].offsetLeft,
        }
        if(itemRef){
            $('.board-tabs-active-line').css('left', itemRef.left).css('width', itemRef.width);
        }
    });

    var calculatorTabsItemIndex = 0;
    $('.calculator-tabs-active-line').css('left', $('.calculator-tabs-item').first().get()[0].offsetLeft).css('width', $('.calculator-tabs-item').first().get()[0].clientWidth);
    $('.calculator-tabs-item').on('click', function() {
        calculatorTabsItemIndex = $(this).index();
        var itemRef = {
            index: $(this).index(),
            width: $(this).get()[0].clientWidth,
            left: $(this).get()[0].offsetLeft,
        }
        if(itemRef){
            $('.calculator-tabs-active-line').css('left', itemRef.left).css('width', itemRef.width);
        }
    })

    $(window).resize(function(){
        var itemRef = {
            width: $('.calculator-tabs-item').eq(calculatorTabsItemIndex).get()[0].clientWidth,
            left: $('.calculator-tabs-item').eq(calculatorTabsItemIndex).get()[0].offsetLeft,
        }
        if(itemRef){
            $('.calculator-tabs-active-line').css('left', itemRef.left).css('width', itemRef.width);
        }
    });

    $('.keyword-input').on('input', function(){
        if($(this).val() == ''){
            $(this).css('color', '#E60000');
        }else{
            $(this).css('color', '#333333');
        }
    })

    $('.dropdown-item').on('click', function(){
        var text = $(this)[0].innerText;
        $(this).parents('.dropdown-menu').siblings('.btn').text(text);
        $(this).parents('.select-pc').siblings('.select-mobile').find('select').val(text);
    })

    $('.filter-select').on('change', function(){
        var text = $(this).val();
        $(this).parents('.select-mobile').siblings('.select-pc').find('.btn').text(text);
    })
    

    $('.range-control').rangeslider({
        polyfill: false,
    });

    $('.calculator-tabs-item').on('click', function(){
        var text = $(this).attr('aria-controls');
        var childtext = $(this).parents('.calculator-tabs-list').siblings('#'+text).find('.ui-state-active').attr('aria-controls');
        $(this).parents('.calculator-tabs-list').siblings('#'+text).find('#'+childtext).find('.range-control').rangeslider('update', true);
    })

    $('.calculator-common-tabs-item').on('click', function(){
        var text = $(this).attr('aria-controls');
        $(this).parents('.calculator-common-tabs-list').siblings('#'+text).find('.range-control').rangeslider('update', true);
    })

    $('.range-control').on('input', function(){
        var value = $(this).val();
        $(this).parents('.input-range-group').siblings('.input-text-group').find('input').val(toCurrency(value));
    })

    function toCurrency(num){
        var num_parts = num.toString().split('.');
        num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        return num_parts.join('.');
    }

    function inputNumber(e){
        var code = e.keyCode;
        if((code < 48 || code > 57) && code !== 190 && code !== 8 && code !== 9 && (code < 96 || code > 105) ) {
            e.preventDefault();
        }
    }

    function InputCheckMax(value, max){
        if(value >= max){
            return max;
        }else{
            return value;
        }
    }

    function InputCheckMin(value, min){
        if(value <= min){
            return min;
        }else{
            return value;
        }
    }

    $('.calculator-input').on('keydown', function(e){
        inputNumber(e);
    })

    $('.calculator-input').on('input', function(e){
        var value = $(this).val().split(',').join('');
        var min = $(this).data('min');
        var max = $(this).data('max');
        var result = InputCheckMax(value, max);
        if(result <= min){
            $(this).parents('.input-text-group').siblings('.input-range-group').find('input').val(min).change();
        }else{
            $(this).parents('.input-text-group').siblings('.input-range-group').find('input').val(result).change();
        }
        $(this).val(toCurrency(result));
    })

    $('.calculator-input').on('focus', function(){
        $(this).parents('.input-text-group').css('border', '1px solid #EE5142');
    })

    $('.calculator-input').on('blur', function(e){
        var value = $(this).val().split(',').join('');
        var min = $(this).data('min');
        var result = InputCheckMin(value, min);
        $(this).val(toCurrency(result));
        $(this).parents('.input-text-group').css('border', '1px solid #E2DED4');
    })

    $('.community-preview-img').bind('mouseenter mouseleave touchstart touchend', function(){
        $(this).toggleClass('active');
        $(this).siblings('.community-list').find('.community-link').first().toggleClass('active');
    })

    $('.community-link').bind('mouseenter mouseleave touchstart touchend', function(){
        $(this).toggleClass('active');
    })

    $('.community-link:first').bind('mouseenter mouseleave touchstart touchend', function(){
        $(this).parents('.community-list').siblings('.community-preview-img').toggleClass('active');
    })

    var hash = window.location.hash.replace('#','.');
    if(hash){
        if(hash === '.section-board'){
            smoothOffset(hash);
            
        }else{
            smoothOffset('.section-ranking');
            $(hash).click();
        }
    }

    $('.section-ranking-link').on('click', function() {
        var tabsName = $(this).data('tabs');
        $(tabsName).click();
    })

    $('.anchor-link').on('click', function() {
        var hrefLink =  $(this).data('href');
        $('.menu').removeClass('menu-open');
        $('.hamburger-box').removeClass('active');
        $('body').removeClass('hide');
        smoothOffset(hrefLink);
    })

    function smoothOffset(el) {
        var scrollOffset = $(el).offset().top;
        var scrollFix = 0;
        if($(window).width() <= 1024){
            scrollFix = 60;
        }
        if($(window).width() <= 768){
            scrollFix = 50;
        }
        $('html,body').animate({
            scrollTop: scrollOffset - scrollFix
        }, 500)
    }
});