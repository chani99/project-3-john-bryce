"use strict";
// admin module
function Admin(data) {
    if ("ctrl" in data && data.ctrl !== "") this.ctrl = data.ctrl;
    if ("id" in data && data.id !== "") this.id = data.id;
    if ("name" in data && data.name !== "") this.name = data.name;
    if ("image" in data && data.image !== undefined) this.image = data.image;
    if ("phone" in data && data.phone !== "") this.phone = data.phone;
    if ("role" in data && data.role !== "") this.role_id = data.role;
    if ("email" in data && data.email !== "") this.email = data.email;
    if ("password" in data && data.password !== "") this.password = data.password;
    if ("inner" in data && data.inner !== "") this.inner = data.inner;

}



// admin director
var AdminModuleController = function() {
    let AdminApiMethod = "Admin";
    let AdminApiUrl = "back/api/api.php";
    var data = {
        ctrl: AdminApiMethod
    };


    function getFormValues(but_id, callback) {
        let image;
        let values = [];
        let GetLohalStotage = localStorage.getItem("permission");
        let my_role = JSON.parse(GetLohalStotage);


        values.name = $("#inputname").val().trim();
        values.phone = $("#inputphone").val().trim();
        values.email = $("#inputemail").val().trim();
        values.role = $("#inpurole").val().trim();
        values.image = $("#browse_a").prop("files")[0];




        //checks if admin is alowd to handle the passwod
        if (but_id === "new") {
            values.password = $("#inputpassword").val().trim();
        }

        if (but_id !== "new") {
            data.id = but_id;

            if (my_role === "owner" && $("#inputpassword").val().trim() !== "") {
                values.password = $("#inputpassword").val().trim();

            } else if (my_role === "manager" && values.role === "7" && $("#inputpassword").val().trim() !== "") {
                values.password = $("#inputpassword").val().trim();
            }

        }



        //sends all input values for validation in if ok senbs them to sever...
        let sendForCheck = new SendValidation();
        sendForCheck.sendForValidation(values, but_id, "admin", function(returned) {
            if (returned.testName === true && returned.testPhone === true && returned.testEmail === true && returned.testRole === true && returned.testImage === true && returned.testPassword === true) {
                data.role = values.role;
                data.name = values.name;
                data.phone = values.phone;
                data.email = values.email;
                if (values.password != undefined) {
                    data.password = values.password;
                }

                //check if a image was uploaded and if was get the croped image
                // and send it for croping at server 
                if (values.image !== undefined) {
                    let column3 = new column3_director();
                    column3.getImageCropSize(function(crop_sizes) {
                        sendFileToCrop(crop_sizes, function(resulet) {
                            if (resulet[0]) {
                                data.image = resulet[1];
                                callback();
                            } else {
                                alert(resulet);
                            }
                        });
                    });

                } else {
                    //if no image was loaded then send upated/new data to server
                    callback();
                }
            }

        });
    }


    function sendFileToAjax(image, callback) {
        let form_data = new FormData();
        form_data.append("file", image);
        sendFileToServer(form_data, function(respnse) {
            callback(respnse);
        });
    }


    function wasDone(response_text, type) {
        if (response_text === true) {
            alert("this admin was " + type + " sucssesfuly.");
            let mainscreen = new main_screen();
            mainscreen.loadAdminscreen();
        } else {
            alert(response_text);
        }
    }

    //change the url of the image and show it on screen
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#blah").attr("src", e.target.result);

            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    return {

        createAdmin: function(but_id) {
            getFormValues(but_id, function() {
                let admin = new Admin(data);
                sendAJAX("POST", AdminApiUrl, admin, function(respnse) {
                    wasDone(respnse, "created");
                });
            });

        },

        updateAdmin: function(but_id) {
            getFormValues(but_id, function() {
                let admin = new Admin(data);
                sendAJAX("PUT", AdminApiUrl, admin, function(respnse) {
                    wasDone(respnse, "updated");

                });
            });
        },


        deleteAdmin: function(but_id) {
            let safe = confirm("Are you sure you want to delete this administrator?");
            if (safe == true) {
                data.id = but_id;
                let admin = new Admin(data);
                sendAJAX("DELETE", AdminApiUrl, admin, function(respnse) {
                    wasDone(respnse, "deleted");
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

        checkfile: function(file) {
            readURL(file);
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
$(document).on("click", "#singleAdmin", function() {
    let column3_model = new column3_director();
    column3_model.UpdateAdmins($(this).data("adminid"), $(this).data("permission"));
});


// add event to save/edit admin
$(document).on("click", "#saveAdmin2", function() {
    let calltype = $(this).data("adid");
    console.log(calltype);
    if (calltype == "new") {
        let admin_model = new AdminModuleController();
        admin_model.createAdmin(calltype);
    } else {
        let admin_model = new AdminModuleController();
        admin_model.updateAdmin(calltype);
    }
});


//  add event to delete admin
$(document).on("click", "#delete_admin", function() {
    let admin_model = new AdminModuleController();
    admin_model.deleteAdmin($(this).data("deleteadmin"));
});


//  add event to course details
$(document).on("click", "#editAdmin", function() {
    let column3_model = new column3_director();
    column3_model.UpdateAdmins($(this).data("editid"));
});

// add event for + new admin
$("#add_new_administrator").click(function() {
    let column3 = new column3_director();
    column3.newAdminScreen($(this).data("permission"));
});

// add event for show image
$(document).on("change", "#browse_a", function(e) {
    let image = $("#browse_a").prop("files")[0];
    let column3 = new column3_director();
    column3.uploadFile(image);

});