$( function() {
    $('.page-item').on('click', function () {
        $('.page-item').removeClass('active');
        $(this).addClass('active');
    })
});