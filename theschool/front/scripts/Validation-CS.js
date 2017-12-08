"use strict";
var Validation = function() {

    function notEmpty(input) {
        if ((input === "") || (!input)) {
            return "You must fill all input fields!";
        } else {
            return true;
        }
    }

    function matchTextPattern(input) {
        var pattern = /[0-9a-zA-Zא-ת\s!?=+-.,"]+$/m;
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
        validateInput: function(input, type) {
            let empty;
            let pattern;
            switch (type) {
                case "name":
                    empty = notEmpty(input);
                    pattern = matchTextPattern(input);
                    if ((empty === true) && (pattern === true)) {
                        return true;
                    } else if (empty !== true) {
                        return empty;
                    } else {
                        return pattern;
                    }

                    break;

                case "phone":
                    empty = notEmpty(input);
                    pattern = matchPhonePattern(input);
                    if ((empty === true) && (pattern === true)) {
                        return true;
                    } else if (empty !== true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case "email":
                    empty = notEmpty(input);
                    pattern = matchEmailPattern(input);
                    if ((empty === true) && (pattern === true)) {
                        return true;
                    } else if (empty !== true) {
                        return empty;
                    } else {
                        return pattern;
                    }
                    break;

                case "image":
                    empty = notEmpty(input);
                    if (empty === true) {
                        if (input.size > 1000000) {
                            return "file can't be larger then 1 MB";
                        } else {
                            return true;
                        }

                    } else {
                        return empty;

                    }

                    break;

                case "password":
                    empty = notEmpty(input);
                    if (empty === true) {
                        return true;
                        return empty;
                    }
                    break;

                default:
            }
        }
    }



}

// function sending data to validation

var SendValidation = function() {

    return {
        sendForValidation: function(values, but_id, caller, callback) {

            let validate = new Validation();
            let tempVal;
            let testName = false;
            let testDescription = false;
            let testImage = true;
            let testEmail = false;
            let testPhone = false;
            let testRole = false;
            let testPassword = true;



            // input validation
            tempVal = validate.validateInput(values.name, "name");
            if (tempVal === true) {
                $("#name_error").html("");
                $("#inputname").removeClass("error");
                testName = true;
            } else {
                $("#name_error").html(tempVal);
                $("#inputname").addClass("error")
                testName = false;
            }


            tempVal = validate.validateInput(values.description, "name");
            if (tempVal === true) {
                $("#description_error").html("");
                testDescription = true;
                $("#inputdetails").removeClass("error");
            } else {
                $("#description_error").html(tempVal);
                $("#inputdetails").addClass("error");
                testDescription = false;
            }

            if ("role" in values) {
                tempVal = validate.validateInput(values.role, "name");
                if (tempVal === true) {
                    $("#role_error").html("");
                    $("#inputrole").removeClass("error");
                    testRole = true;
                } else {
                    $("#role_error").html(tempVal);
                    $("#inputrole").addClass("error")
                    testRole = false;
                }
            }

            if ("phone" in values) {
                tempVal = validate.validateInput(values.phone, "phone");
                if (tempVal === true) {
                    $("#phone_error").html("");
                    testPhone = true;
                    $("#inputphone").removeClass("error");
                } else {
                    $("#phone_error").html(tempVal);
                    $("#inputphone").addClass("error");
                    testPhone = false;
                }


            }

            if ("email" in values) {
                tempVal = validate.validateInput(values.email, "email");
                if (tempVal === true) {
                    $("#email_error").html("");
                    testEmail = true;
                    $("#inputemail").removeClass("error");
                } else {
                    $("#email_error").html(tempVal);
                    $("#inputemail").addClass("error");
                    testEmail = false;
                }

            }

            if ("image" in values) {
                tempVal = validate.validateInput(values.image, "image");
                if ((tempVal === true) || (tempVal === "You must fill all input fields!" && but_id !== "new")) {
                    $("#image_error").html("");
                    testImage = true;
                    $("#st_photo").removeClass("error");
                } else {
                    $("#image_error").html(tempVal);
                    $("#st_photo").addClass("error");
                    testImage = false;
                }


            }

            if ("password" in values) {
                tempVal = validate.validateInput(values.password, "password");
                if (tempVal === true) {
                    $("#password_error").html("");
                    testPassword = true;
                    $("#inputpassword").removeClass("error");
                } else {
                    $("#password_error").html(tempVal);
                    $("#inputpassword").addClass("error");
                    testPassword = false;
                }
            }

            switch (caller) {
                case "courses":
                    callback({ testName: testName, testDescription: testDescription, testImage: testImage });
                    break;
                case "admin":
                    callback({ testName: testName, testRole: testRole, testPhone: testPhone, testEmail: testEmail, testImage: testImage, testPassword: testPassword });
                    break;
                case "student":
                    callback({ testName: testName, testPhone: testPhone, testEmail: testEmail, testImage: testImage });
                    break;
            }


        }
    }


}