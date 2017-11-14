"use strict";
// admin module
function Admin(data) {
    if ('ctrl' in data && data.ctrl != "") this.ctrl = data.ctrl;
    if ('id' in data && data.id != "") this.id = data.id;
    if ('name' in data && data.name != "") this.name = data.name;
    if ('image' in data && data.image != "") this.image = data.image;
    if ('phone' in data && data.phone != "") this.phone = data.phone;
    if ('role' in data && data.role != "") this.role = data.role;
    if ('email' in data && data.image != "") this.image = data.image;
    if ('password' in data && data.password != "") this.image = data.image;
    if ('inner' in data && data.inner != "") this.inner = data.inner;

}



// admin director
var AdminModuleController = function() {
    let AdminApiMethod = 'Admin';
    let AdminApiUrl = "back/api/api.php";
    var data = {
        ctrl: AdminApiMethod
    };


    function getFormValues(but_id, callback) {
        let image;
        let values = [];

        values.name = $('#inputname').val().trim();
        values.phone = $('#inputphone').val().trim();
        values.email = $('#inputemail').val().trim();
        values.role = $('#inputrole').val().trim();
        values.image = $('#st_photo').prop('files')[0];

        if (but_id != "new") {
            data.id = but_id;
        }


        //sends all input values for validation in if ok senbs them to sever...
        sendForValidation(values, but_id, function(returned) {
            if (returned.test_name && returned.phone && returned.email && returned.role && returned.image) {
                if (values.image != undefined) { //check if a image was uploaded
                    sendFileToAjax(values.image, function(resulet) {
                        if (resulet) {
                            data.image = values.image.name;
                            callback();
                        } else {
                            alert(resulet.text);
                        }
                    });
                } else {
                    callback();
                }
            }

        });
    }

    // function sending data to validation
    function sendForValidation(values, but_id, callback) {
        let validate = new validation();
        let temp_val;
        let test_name = false;
        let test_role = false;
        let test_phone = false;
        let test_role = false;
        let test_image = true;

        // input validation
        temp_val = validate.validat_input(values.name, "name");
        if (temp_val == true) {
            $("#name_error").html("");
            $('#inputname').removeClass("error");
            data.name = values.name;
            test_name = true;
        } else {
            $("#name_error").html(temp_val);
            $('#inputname').addClass("error")
            test_name = false;
        }

        temp_val = validate.validat_input(values.role, "name");
        if (temp_val == true) {
            $("#role_error").html("");
            $('#inputrole').removeClass("error");
            data.name = values.name;
            test_name = true;
        } else {
            $("#role_error").html(temp_val);
            $('#inputrole').addClass("error")
            test_name = false;
        }


        temp_val = validate.validat_input(values.phone, "phone");
        if (temp_val == true) {
            $("#inputphone").html("");
            data.description = values.description;
            test_description = true;
            $('#inputphone').removeClass("error");
        } else {
            $("#phone_error").html(temp_val);
            $('#inputphone').addClass("error");
            test_description = false;
        }


        temp_val = validate.validat_input(values.email, "email");
        if (temp_val == true) {
            $("#email_error").html("");
            data.description = values.description;
            test_description = true;
            $('#inputemail').removeClass("error");
        } else {
            $("#email_error").html(temp_val);
            $('#inputemail').addClass("error");
            test_description = false;
        }


        if ("image" in values) {
            temp_val = validate.validat_input(values.image, "image");
            if (temp_val == true) {
                $("#image_error").html("");
                test_image = true;
                $('#st_photo').removeClass("error");

            } else if (but_id == "new") {
                $("#image_error").html(temp_val);
                $('#st_photo').addClass("error")
                test_image = false;


            }
        }

        callback({ test_name, test_role, test_phone, test_email, test_image });
    }


    function sendFileToAjax(image, callback) {
        let form_data = new FormData();
        form_data.append('file', image);
        sendFileToServer(form_data, function(respnse) {
            callback(respnse);
        });
    }


    function wasDone(response_text) {
        if (response_text == true) {
            alert("your request was done sucssesfuly.");
            let loadmain = new main_screen;
            loadmain.loadAdminscreen();

        } else {
            alert(response_text);
        }

    }


    return {

        createAdmin: function(but_id) {
            getFormValues(but_id, function() {
                let admin = new Admin(data);
                sendAJAX("POST", AdminApiUrl, Admin, function(respnse) {
                    alert("this administrator was created sucssesfuly.");
                    let admin_model = new AdminModuleController();
                    admin_model.GetAllAdmins();
                    admin_model.getOneAdmin(respnse[1]);
                });
            });

        },

        updateAdmin: function(but_id) {
            getFormValues(but_id, function() {
                let admin = new Admin(data);
                sendAJAX("PUT", AdminApiUrl, Admin, function(respnse) {
                    alert("this admin was updated sucssesfuly.");
                    let course_model = new CourseModuleController();
                    admin_model.GetAllAdmins();
                    admin_model.getOneAdmin(data.id);
                });
            });
        },


        deleteAdmin: function(but_id) {
            let safe = confirm("Are you sure you want to delete this administrator?");
            if (safe == true) {
                data.id = but_id;
                let admin = new Admin(data);
                sendAJAX("DELETE", AdminApiUrl, Admin, function(respnse) {
                    wasDone(respnse);
                });
            }
        },


        GetAllAdmins: function() {
            let admin = new Admin(data);
            sendAJAX("GET", AdminApiUrl, Admin, function(returned_data) {
                let column1 = new column1_director();
                column1.allAdmins(returned_data);

            });
        },



        getOneAdmin: function(id) {
            data.id = id;
            let admin = new Admin(data);
            sendAJAX("GET", AdminApiUrl, Admin, function(respnse) {
                if (respnse.constructor != Array) {
                    alert(respnse);
                } else {
                    let column3 = new column3_director();
                    column3.get_one_admin(respnse);
                }
            });
        }

    }

}



// add event to get admin details
$(document).on('click', '#singleAdmin', function() {
    let admin_model = new AdminModuleController();
    admin_model.getOneAdmin($(this).data('adminid'));
});


// add event to save/edit admin
$(document).on('click', '#saveAdmin', function() {
    let calltype = $(this).data("adminid");
    if (calltype == 'new') {
        let admin_model = new AdminModuleController();
        admin_model.createAdmin(calltype);
    } else {
        let admin_model = new AdminModuleController();
        admin_model.updateAdmin(calltype);
    }
});


//  add event to delete admin
$(document).on('click', '#deleteAdmin', function() {
    let admin_model = new AdminModuleController();
    admin_model.deleteAdmin($(this).data("adminid"));
});


//  add event to course details
$(document).on('click', '#editAdmin', function() {
    let column3_model = new column3_director();
    column3_model.UpdateAdmins($(this).data("editid"));
});

// add event for + new course
$('#add_new_admin').click(function() {
    let column3 = new column3_director();
    column3.newAdminScreen();
});