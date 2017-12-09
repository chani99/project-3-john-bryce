"use strict";

var MainScreen = function() {
    let myAjax = new SendAJAX();



    function login(user) {
        $.ajax("front/views/login_temp.html").always(function(logoutemp) {
            var c = logoutemp;
            c = c.replace("{{name}}", user.userName);
            c = c.replace("{{role}}", user.permission);
            c = c.replace("{{imgsrc}}", "uploads/" + user.image);
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
                location.hash = "login";

            });

        },

        handleLogin: function() {
            let user = {
                "user": $("#loginame").val(),
                "password": $("#inputPassword").val()
            };
            myAjax.sendLoginAjax(user, function(response) {
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


                    let main = new MainScreen();
                    main.loadmaindcreen(response.permission);

                } else {
                    $("#login_error").html(response);
                }

            });
        },

        logout: function() {
            myAjax.sendlogoutAJAX("logout", "back/api/logoutAPI.php", function() {
                localStorage.clear();
                $("#screen2, #screen1, #navlist").hide();
                $("#loginform").show();
                $("#login, #Administratos").html("");
                location.hash = "login";

            });
        },

        loadmaindcreen: function(permission2) {
            //get cuorse list & student list
            let column33 = new Column3Director();;
            column33.main_screen(function() {
                $("#add_new_administrator").data("permission", permission2);
                let permission = localStorage.getItem("permission");
                permission = JSON.parse(permission);
                $("#screen2").hide();
                $("#screen1").show();
                let courseController = new CourseModuleController();
                courseController.getAllCourse(permission);
                let studentController = new StudentModelController();
                studentController.getAllStudents();
                permission === "" ? location.hash = "school" : location.hash = "main";

            });

        },

        loadAdminscreen: function() {
            //get cuorse list & student list
            let column33 = new Column3Director();;
            $("#screen1").hide();
            $("#screen2").show();
            location.hash = "administration screen";
            column33.mainScreen2(function() {
                let AdminController = new AdminModuleController();
                AdminController.getAllAdmins();
            });
        }





    }
}



// add event for nav bar school
$("#nav_school").click(function() {
    let loadmain = new MainScreen();
    loadmain.loadmaindcreen();
});


// add event for nav bar school
$("#nav_Administration").click(function() {
    let loadmain = new MainScreen();
    loadmain.loadAdminscreen();
});


$(document).on("click", "#submitlogin", function() {
    let login = new MainScreen();
    login.handleLogin();
});

// add event for logout
$(document).on("click", "#logout", function() {
    let loadmain = new MainScreen();
    loadmain.logout();
});