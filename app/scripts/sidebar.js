$( function() {
    $('.sidebar-toggle').bind('click', function(){
        $(this).parents('.sidebar').toggleClass('sidebar-close');
    })
});