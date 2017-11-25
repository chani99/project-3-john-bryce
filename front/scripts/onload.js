"use strict";

$(document).ready(function() {
    let login = new main_screen();
    login.login_screen();


    route('/', 'home', function() {});
    route('/school', 'nav_school', function() {});
    route('/administrator', 'nav_Administration', function() {});
    route('*', 'error404', function() {});


});