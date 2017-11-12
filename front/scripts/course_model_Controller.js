// course module
function Course(data) {
    if ('ctrl' in data && data.ctrl != "") this.ctrl = data.ctrl;
    if ('id' in data && data.id != "") this.id = data.id;
    if ('name' in data && data.name != "") this.name = data.name;
    if ('description' in data && data.description != "") this.description = data.description;
    if ('image' in data && data.image != "") this.image = data.image;
    if ('inner' in data && data.inner != "") this.inner = data.inner;

}



// course director
var CourseModuleController = function() {
    let CourseApiMethod = 'Course';
    let CourseApiUrl = "back/api/api.php";
    var data = {
        ctrl: CourseApiMethod
    };


    function getFormValues(but_id, callback) {
        let image;
        let values = [];

        values.name = $('#inputname').val().trim();
        values.description = $('#inputdetails').val().trim();

        if (but_id != "new") {
            data.id = but_id;
        }


        //sends all input values for validation in if ok senbs them to sever...
        sendForValidation(values, function(returned) {
            if (returned.test_name == true && returned.test_description == true) {
                values.image = $('#st_photo').prop('files')[0];
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
    function sendForValidation(values, callback) {
        let validate = new validation();
        let temp_val;
        let test_name = false;
        let test_description = false;
        let test_image = false;


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


        temp_val = validate.validat_input(values.description, "name");
        if (temp_val == true) {
            $("#description_error").html("");
            data.description = values.description;
            test_description = true;
            $('#inputdetails').removeClass("error");
        } else {
            $("#description_error").html(temp_val);
            $('#inputdetails').addClass("error");
            test_description = false;
        }


        if ("image" in values) {
            temp_val = validate.validat_input(values.image, "image");
            if (temp_val == true) {
                $("#image_error").html("");
                test_image = true;
                $('#st_photo').removeClass("error");

            } else {
                $("#image_error").html(temp_val);
                $('#st_photo').addClass("error")

                test_image = false;

            }
        }

        callback({ test_name, test_description, test_image });
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
            loadmain.loadmaindcreen();

        } else {
            alert(response_text);
        }

    }


    return {

        createCourse: function(but_id) {
            getFormValues(but_id, function() {
                let course = new Course(data);
                sendAJAX("POST", CourseApiUrl, course, function(respnse) {
                    alert("this caouse was created sucssesfuly.");
                    let course_model = new CourseModuleController();
                    course_model.GetAllCourse();
                    course_model.getOneCourse(respnse[1]);
                });
            });

        },

        updateCourses: function(but_id) {
            getFormValues(but_id, function() {
                let course = new Course(data);
                sendAJAX("PUT", CourseApiUrl, course, function(respnse) {
                    alert("this caouse was updated sucssesfuly.");
                    let course_model = new CourseModuleController();
                    course_model.GetAllCourse();
                    course_model.getOneCourse(data.id);
                });
            });
        },


        deleteCourse: function(but_id) {
            let safe = confirm("Are you sure you want to delete this course?");
            if (safe == true) {
                data.id = but_id;
                let course = new Course(data);
                sendAJAX("DELETE", CourseApiUrl, course, function(respnse) {
                    wasDone(respnse);
                });
            }
        },


        GetAllCourse: function() {
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, function(returned_data) {
                let column1 = new column1_director();
                column1.allcourses(returned_data);

            });
        },


        GetCourseForStudent: function(id) {
            data.id = id;
            data.inner = true;
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, function(respnse) {
                column3 = new column3_director();
                column3.getinnerJoin(respnse);

            });
        },


        getOneCourse: function(id) {
            data.id = id;
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, function(respnse) {
                if (respnse.constructor != Array) {
                    alert(respnse);
                } else {
                    column3 = new column3_director();
                    column3.get_one_course(respnse);
                }
            });
        }

    }

}



// add event to get course details
$(document).on('click', '#singleCourse', function() {
    let course_model = new CourseModuleController();
    course_model.getOneCourse($(this).data('courseid'));
});


// add event to save/edit course
$(document).on('click', '#saveCourse', function() {
    let calltype = $(this).data("curseid");
    if (calltype == 'new') {
        let course_model = new CourseModuleController();
        course_model.createCourse(calltype);
    } else {
        let course_model = new CourseModuleController();
        course_model.updateCourses(calltype);
    }
});


//  add event to delete course
$(document).on('click', '#deleteCourse', function() {
    let course_model = new CourseModuleController();
    course_model.deleteCourse($(this).data("curseid"));
});


//  add event to course details
$(document).on('click', '#editCourse', function() {
    let column3_model = new column3_director();
    column3_model.UpdateCourses($(this).data("editid"));
});