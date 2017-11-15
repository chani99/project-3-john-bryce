"use strict";

$(document).ready(function() {

    $.ajax('front/views/login_form_temp.html').always(function(loginTemplate) {
        $('#screen2').hide();
        $('#screen1').hide();
        $('#navlist').hide();
        var c = loginTemplate;
        let d = document.createElement('div');
        d.innerHTML = c;
        $('#loginform').append(d);
    });


    // let loadmain = new main_screen();
    // loadmain.loadmaindcreen();




    // $("#loginform").hide();












});