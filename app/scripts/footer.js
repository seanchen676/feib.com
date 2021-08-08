$( function() {
    $('.warning-btn').bind('click', function(){
        $(this).toggleClass('open');
        $('.warning-expand').slideToggle(300);
    })
});