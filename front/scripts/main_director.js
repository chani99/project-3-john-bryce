"use strict";

var main_screen = function() {
    // let column1ApiMethod = "Student";
    // let ApiUrl = "back/api/api.php";
    // var column1_data = {};



    function login(user) {
        $.ajax("front/views/login_temp.html").always(function(logoutemp) {
            var c = logoutemp;
            c = c.replace("{{name}}", user.userName);
            c = c.replace("{{role}}", user.permission);
            c = c.replace("{{imgsrc}}", "back/uploads/" + user.image);
            let d = document.createElement("div");
            d.innerHTML = c;
            $("#login").append(d);
        });
    }

    function permission(response) {
        if (response.permission === "sales") {
            $("#nav_Administration").hide();
        }
    }

    return {

        login_screen: function() {

            $.ajax("front/views/login_form_temp.html").always(function(loginTemplate) {
                $("#screen2").hide();
                $("#screen1").hide();
                $("#navlist").hide();
                var c = loginTemplate;
                let d = document.createElement("div");
                d.innerHTML = c;
                $("#loginform").append(d);
            });

        },

        handleLogin: function() {
            let user = {
                "user": $("#loginame").val(),
                "password": $("#inputPassword").val()
            };
            sendLoginAjax(user, function(response) {
                if (response.status === true) {
                    $("#login_error").html("");
                    $("#loginform").hide();
                    login(response);
                    permission(response);
                    $("#screen1, #navlist, #nav_Administration, #add_new_course").show();
                    if (response.permission === "sales") {
                        $("#nav_Administration, #add_new_course").hide();
                    }
                    var permission_for_storage = JSON.stringify(response.permission);
                    localStorage.setItem("permission", permission_for_storage);


                    let main = new main_screen();
                    main.loadmaindcreen(response.permission);

                } else {
                    $("#login_error").html(response);
                }

            });
        },

        logout: function() {
            sendlogoutAJAX("logout", "back/api/logoutAPI.php", function() {
                $("#screen2, #screen1, #navlist").hide();
                $("#loginform").show();
                $("#login").html("");
            });
        },

        loadmaindcreen: function(permission) {
            //get cuorse list & student list
            let column33 = new column3_director();
            column33.main_screen(function() {
                $("#add_new_administrator").data("permission", permission);
                $("#screen2").hide();
                $("#screen1").show();
                let courseController = new CourseModuleController();
                courseController.GetAllCourse(permission);
                let studentController = new StudentModelController();
                studentController.GetAllStudents();




            });

        },

        loadAdminscreen: function() {
            //get cuorse list & student list
            let column33 = new column3_director();
            $("#screen1").hide();
            $("#screen2").show();

            column33.main_screen2(function() {
                let AdminController = new AdminModuleController();
                AdminController.GetAllAdmins();
            });
        }





    }
}



// add event for nav bar school
$("#nav_school").click(function() {
    let loadmain = new main_screen();
    loadmain.loadmaindcreen();
});


// add event for nav bar school
$("#nav_Administration").click(function() {
    let loadmain = new main_screen();
    loadmain.loadAdminscreen();
});


$(document).on("click", "#submitlogin", function() {
    let login = new main_screen();
    login.handleLogin();
});

// add event for logout
$(document).on("click", "#logout", function() {
    let loadmain = new main_screen();
    loadmain.logout();
});