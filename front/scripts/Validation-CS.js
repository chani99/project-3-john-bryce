"use strict";
var validation = function() {

    function NotEmpty(input) {
        if ((input == "") || (input == undefined)) {
            return "You must fill all input fields!";
        } else {
            return true;
        }
    }

    function matchTextPattern(input) {
        var pattern = /[0-9a-zA-Zא-ת\s!?=+-.,']+$/m;
        if (!pattern.test(input)) {
            return "The field contains invalid characters, only letters or numbers must be entered!";

        } else {
            return true;
        }

    }

    function matchPhonePattern(input) {
        if ((input.length === 10) || (input.length === 9)) {
            return true;

        } else {
            return "The phone number should contain 9 or 10 digits!";

        }

    }

    function matchEmailPattern(input) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!mailformat.test(input)) {
            return "Tho email is invalid!";
        } else {
            return true;
        }

    }



    return {
        validat_input: function(input, type) {
            let empty;
            let pattern;
            switch (type) {
                case 'name':
                    empty = NotEmpty(input);
                    pattern = matchTextPattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'phone':
                    empty = NotEmpty(input);
                    pattern = matchPhonePattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'email':
                    empty = NotEmpty(input);
                    pattern = matchEmailPattern(input);
                    if ((empty == true) && (pattern == true)) {
                        return true;
                    } else if (empty != true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case 'image':
                    empty = NotEmpty(input);
                    if (empty == true) {
                        if (input.size > 1000000) {
                            return "file can't be larger then 1MB";
                        } else {
                            return true;
                        }

                    } else {
                        return empty;

                    }

                    break;

                case 'password':
                    empty = NotEmpty(input);
                    if (empty == true) {
                        return true;
                        return empty;
                    }
                    break;




                    break;
                default:
            }
        }
    }



}

// function sending data to validation

var sendValidation = function() {

    return {
        sendForValidation: function(values, but_id, caller, callback) {

            let validate = new validation();
            let temp_val;
            let test_name = false;
            let test_description = false;
            let test_image = true;
            let test_email = false;
            let test_phone = false;
            let test_role = false;
            let test_password = true;



            // input validation
            temp_val = validate.validat_input(values.name, "name");
            if (temp_val == true) {
                $("#name_error").html("");
                $('#inputname').removeClass("error");
                test_name = true;
            } else {
                $("#name_error").html(temp_val);
                $('#inputname').addClass("error")
                test_name = false;
            }


            temp_val = validate.validat_input(values.description, "name");
            if (temp_val == true) {
                $("#description_error").html("");
                test_description = true;
                $('#inputdetails').removeClass("error");
            } else {
                $("#description_error").html(temp_val);
                $('#inputdetails').addClass("error");
                test_description = false;
            }

            if ("role" in values) {
                temp_val = validate.validat_input(values.role, "name");
                if (temp_val == true) {
                    $("#role_error").html("");
                    $('#inputrole').removeClass("error");
                    test_role = true;
                } else {
                    $("#role_error").html(temp_val);
                    $('#inputrole').addClass("error")
                    test_role = false;
                }
            }

            if ("phone" in values) {
                temp_val = validate.validat_input(values.phone, "phone");
                if (temp_val == true) {
                    $("#phone_error").html("");
                    test_phone = true;
                    $('#inputphone').removeClass("error");
                } else {
                    $("#phone_error").html(temp_val);
                    $('#inputphone').addClass("error");
                    test_phone = false;
                }


            }

            if ("email" in values) {
                temp_val = validate.validat_input(values.email, "email");
                if (temp_val == true) {
                    $("#email_error").html("");
                    test_email = true;
                    $('#inputemail').removeClass("error");
                } else {
                    $("#email_error").html(temp_val);
                    $('#inputemail').addClass("error");
                    test_email = false;
                }

            }

            if ("image" in values) {
                temp_val = validate.validat_input(values.image, "image");
                if ((temp_val == true) || (temp_val == "You must fill all input fields!" && but_id != "new")) {
                    $("#image_error").html("");
                    test_image = true;
                    $('#st_photo').removeClass("error");
                } else {
                    $("#image_error").html(temp_val);
                    $('#st_photo').addClass("error")
                    test_image = false;
                }


            }

            if ("password" in values) {
                temp_val = validate.validat_input(values.password, "password");
                if (temp_val == true) {
                    $("#password_error").html("");
                    test_password = true;
                    $('#inputpassword').removeClass("error");
                } else {
                    $("#password_error").html(temp_val);
                    $('#inputpassword').addClass("error");
                    test_password = false;
                }
            }

            switch (caller) {
                case "courses":
                    callback({ test_name: test_name, test_description: test_description, test_image: test_image });
                    break;
                case "admin":
                    callback({ test_name: test_name, test_role: test_role, test_phone: test_phone, test_email: test_email, test_image: test_image, test_password: test_password });
                    break;
                case "student":
                    callback({ test_name: test_name, test_phone: test_phone, test_email: test_email, test_image: test_email });
                    break;
            }


        }
    }
}