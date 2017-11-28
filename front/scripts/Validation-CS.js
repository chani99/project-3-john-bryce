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

                case "phone":
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

                case "email":
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

                case "image":
                    empty = NotEmpty(input);
                    if (empty == true) {
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

var SendValidation = function() {

    return {
        sendForValidation: function(values, but_id, caller, callback) {

            let validate = new validation();
            let testVal;
            let testName = false;
            let testDescription = false;
            let testImage = true;
            let testEmail = false;
            let testPhone = false;
            let testRole = false;
            let testPassword = true;



            // input validation
            testVal = validate.validateInput(values.name, "name");
            if (testVal == true) {
                $("#name_error").html("");
                $("#inputname").removeClass("error");
                testName = true;
            } else {
                $("#name_error").html(testVal);
                $("#inputname").addClass("error")
                testName = false;
            }


            testVal = validate.validateInput(values.description, "name");
            if (testVal == true) {
                $("#description_error").html("");
                testDescription = true;
                $("#inputdetails").removeClass("error");
            } else {
                $("#description_error").html(testVal);
                $("#inputdetails").addClass("error");
                testDescription = false;
            }

            if ("role" in values) {
                testVal = validate.validateInput(values.role, "name");
                if (testVal == true) {
                    $("#role_error").html("");
                    $("#inputrole").removeClass("error");
                    testRole = true;
                } else {
                    $("#role_error").html(testVal);
                    $("#inputrole").addClass("error")
                    testRole = false;
                }
            }

            if ("phone" in values) {
                testVal = validate.validateInput(values.phone, "phone");
                if (testVal == true) {
                    $("#phone_error").html("");
                    testPhone = true;
                    $("#inputphone").removeClass("error");
                } else {
                    $("#phone_error").html(testVal);
                    $("#inputphone").addClass("error");
                    testPhone = false;
                }


            }

            if ("email" in values) {
                testVal = validate.validateInput(values.email, "email");
                if (testVal == true) {
                    $("#email_error").html("");
                    testEmail = true;
                    $("#inputemail").removeClass("error");
                } else {
                    $("#email_error").html(testVal);
                    $("#inputemail").addClass("error");
                    testEmail = false;
                }

            }

            if ("image" in values) {
                testVal = validate.validateInput(values.image, "image");
                if ((testVal == true) || (testVal == "You must fill all input fields!" && but_id != "new")) {
                    $("#image_error").html("");
                    testImage = true;
                    $("#st_photo").removeClass("error");
                } else {
                    $("#image_error").html(testVal);
                    $("#st_photo").addClass("error")
                    testImage = false;
                }


            }

            if ("password" in values) {
                testVal = validate.validateInput(values.password, "password");
                if (testVal == true) {
                    $("#password_error").html("");
                    testPassword = true;
                    $("#inputpassword").removeClass("error");
                } else {
                    $("#password_error").html(testVal);
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