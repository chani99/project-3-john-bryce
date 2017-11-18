"use strict";
// admin module
function Admin(data) {
    if ('ctrl' in data && data.ctrl != "") this.ctrl = data.ctrl;
    if ('id' in data && data.id != "") this.id = data.id;
    if ('name' in data && data.name != "") this.name = data.name;
    if ('image' in data && data.image != undefined) this.image = data.image;
    if ('phone' in data && data.phone != "") this.phone = data.phone;
    if ('role' in data && data.role != "") this.role_id = data.role;
    if ('email' in data && data.email != "") this.email = data.email;
    if ('password' in data && data.password != "") this.password = data.password;
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
        values.role = $('#inpurole').val().trim();
        values.image = $('#browse').prop('files')[0];
        values.password = $('#inputpassword').val().trim();


        if (but_id != "new") {
            data.id = but_id;
        }


        //sends all input values for validation in if ok senbs them to sever...
        sendForValidation(values, but_id, function(returned) {
            if (returned.test_name == true && returned.test_phone == true && returned.test_email == true && returned.test_role == true && returned.test_image == true && returned.test_password == true) {
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
        let test_email = false;
        let test_phone = false;
        let test_role = false;
        let test_image = true;
        let test_password = false;


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
            data.role = values.role;
            test_role = true;
        } else {
            $("#role_error").html(temp_val);
            $('#inputrole').addClass("error")
            test_role = false;
        }


        temp_val = validate.validat_input(values.phone, "phone");
        if (temp_val == true) {
            $("#phone_error").html("");
            data.phone = values.phone;
            test_phone = true;
            $('#inputphone').removeClass("error");
        } else {
            $("#phone_error").html(temp_val);
            $('#inputphone').addClass("error");
            test_phone = false;
        }


        temp_val = validate.validat_input(values.email, "email");
        if (temp_val == true) {
            $("#email_error").html("");
            data.email = values.email;
            test_email = true;
            $('#inputemail').removeClass("error");
        } else {
            $("#email_error").html(temp_val);
            $('#inputemail').addClass("error");
            test_email = false;
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

        temp_val = validate.validat_input(values.password, "password");
        if (temp_val == true) {
            $("#password_error").html("");
            data.password = values.password;
            test_password = true;
            $('#inputpassword').removeClass("error");
        } else {
            $("#password_error").html(temp_val);
            $('#inputpassword').addClass("error");
            test_password = false;
        }

        callback({ test_name, test_role, test_phone, test_email, test_image, test_password });
    }





    function sendFileToAjax(image, callback) {
        let form_data = new FormData();
        form_data.append('file', image);
        sendFileToServer(form_data, function(respnse) {
            callback(respnse);
        });
    }


    function wasDone(response_text, type) {
        if (response_text == true) {
            alert("this admin was " + type + " sucssesfuly.");
            let mainscreen = new main_screen();
            mainscreen.loadAdminscreen();
        } else {
            alert(respnse);
        }
    }


    return {

        createAdmin: function(but_id) {
            getFormValues(but_id, function() {
                let admin = new Admin(data);
                sendAJAX("POST", AdminApiUrl, admin, function(respnse) {
                    wasDone(respnse, 'created');
                });
            });

        },

        updateAdmin: function(but_id) {
            getFormValues(but_id, function() {
                let admin = new Admin(data);
                sendAJAX("PUT", AdminApiUrl, admin, function(respnse) {
                    wasDone(respnse, 'updated');

                });
            });
        },


        deleteAdmin: function(but_id) {
            let safe = confirm("Are you sure you want to delete this administrator?");
            if (safe == true) {
                data.id = but_id;
                let admin = new Admin(data);
                sendAJAX("DELETE", AdminApiUrl, admin, function(respnse) {
                    wasDone(respnse, 'deleted');
                });
            }
        },


        GetAllAdmins: function() {
            let admin = new Admin(data);
            sendAJAX("GET", AdminApiUrl, admin, function(returned_data) {
                let column1 = new column1_director();
                column1.allAdmins(returned_data);

            });
        },



        getOneAdmin: function(id) {
            data.id = id;
            let admin = new Admin(data);
            sendAJAX("GET", AdminApiUrl, admin, function(respnse) {
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



// add event to get admin update window
$(document).on('click', '#singleAdmin', function() {
    let column3_model = new column3_director();
    column3_model.UpdateAdmins($(this).data("adminid"), $(this).data("permission"));
});


// add event to save/edit admin
$(document).on('click', '#saveAdmin2', function() {
    let calltype = $(this).data("adid");
    console.log(calltype);
    if (calltype == 'new') {
        let admin_model = new AdminModuleController();
        admin_model.createAdmin(calltype);
    } else {
        let admin_model = new AdminModuleController();
        admin_model.updateAdmin(calltype);
    }
});


//  add event to delete admin
$(document).on('click', '#delete_admin', function() {
    let admin_model = new AdminModuleController();
    admin_model.deleteAdmin($(this).data("deleteadmin"));
});


//  add event to course details
$(document).on('click', '#editAdmin', function() {
    let column3_model = new column3_director();
    column3_model.UpdateAdmins($(this).data("editid"));
});

// add event for + new admin
$('#add_new_administrator').click(function() {
    let column3 = new column3_director();
    column3.newAdminScreen();
});