"use strict";

$(document).ready(function() {
    $("#loginform").hide();



    let loadmain = new main_screen();
    loadmain.loadmaindcreen();






    // Temporary to treat later
    let user = { name: "chani", role: "owner", image: "chani.jpg" };
    login(user);


    // move to navbar controler
    function login(user) {
        $.ajax('front/views/login_temp.html').always(function(logoutemp) {
            var c = logoutemp;
            c = c.replace("{{name}}", user.name);
            c = c.replace("{{role}}", user.role);
            c = c.replace("{{imgsrc}}", "back/images/" + user.image);
            let d = document.createElement('div');
            d.innerHTML = c;
            $('#login').append(d);
        });
    }

    // add event for + new student
    $('#add_new_student').click(function() {
        let column3 = new column3_director();
        column3.newStudentScreen();
    });

    // add event for + new course
    $('#add_new_course').click(function() {
        let column3 = new column3_director();
        column3.newCourseScreen();
    });


});