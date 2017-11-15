"use strict";

var main_screen = function() {
    // let column1ApiMethod = 'Student';
    // let ApiUrl = "back/api/api.php";
    // var column1_data = {};

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

    function permission(response) {
        switch (response.role) {
            case '6':
                $('#nav_Administration').hide();
                break;


        }
    }

    return {
        handleLogin: function() {
            let user = {
                "user": $("#loginame").val(),
                "password": $("#inputPassword").val()
            };
            sendLoginAjax(user, function(response) {
                if (response.status == true) {
                    login(response);
                    permission(response);
                } else {
                    $('#login_error').html(response.messege);
                }

            });
        },

        loadmaindcreen: function() {
            //get cuorse list & student list
            let column33 = new column3_director();
            column33.main_screen(function() {
                let courseController = new CourseModuleController();
                let studentController = new StudentModelController();

                courseController.GetAllCourse();
                studentController.GetAllStudents();
                $('#screen2').hide();
                $('#screen1').show();

            });

        },

        loadAdminscreen: function() {

            //get cuorse list & student list
            let column33 = new column3_director();
            $('#screen1').hide();
            $('#screen2').show();

            column33.main_screen2(function() {
                let AdminController = new AdminModuleController();
                AdminController.GetAllAdmins();



            });

        }





    }
}



// add event for nav bar school
$('#nav_school').click(function() {
    let loadmain = new main_screen();
    loadmain.loadmaindcreen();
});


// add event for nav bar school
$('#nav_Administration').click(function() {
    let loadmain = new main_screen();
    loadmain.loadAdminscreen();
});


$(document).on('click', '#submitlogin', function() {
    let login = new main_screen();
    login.handleLogin();
});


// Temporary to treat later


// move to navbar controler