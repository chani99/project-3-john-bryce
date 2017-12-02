"use strict";
// course module
function Course(data) {
    if ("ctrl" in data && data.ctrl !== "") this.ctrl = data.ctrl;
    if ("id" in data && data.id !== "") this.id = data.id;
    if ("name" in data && data.name !== "") this.name = data.name;
    if ("description" in data && data.description != "") this.description = data.description;
    if ("image" in data && data.image !== "") this.image = data.image;
    if ("inner" in data && data.inner !== "") this.inner = data.inner;

}



// course director
var CourseModuleController = function() {
    let CourseApiMethod = "Course";
    let CourseApiUrl = "back/api/api.php";
    var data = {
        ctrl: CourseApiMethod
    };


    function getFormValues(but_id, callback) {
        let image;
        let values = [];

        values.name = $("#inputname").val().trim();
        values.description = $("#inputdetails").val().trim();
        values.image = $("#st_photo").prop("files")[0];

        if (but_id !== "new") {
            data.id = but_id;
        }


        //sends all input values for validation in if ok senbs them to sever...
        let sendForCheck = new SendValidation();
        sendForCheck.sendForValidation(values, but_id, "courses", function(returned) {
            if (returned.testName === true && returned.testDescription === true && returned.testImage === true) {
                data.name = values.name;
                data.description = values.description;

                if (values.image !== undefined) { //check if a image was uploaded
                    sendFileToAjax(values.image, function(resulet) {
                        if (resulet[0]) {
                            data.image = resulet[1];
                            callback();
                        } else {
                            alert(resulet);
                        }
                    });
                } else {
                    callback();
                }
            }

        });
    }
    //change the url of the image and show it on screen
    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#courseImage").attr("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    function sendFileToAjax(image, callback) {
        let form_data = new FormData();
        form_data.append("file", image);
        sendFileToServer(form_data, function(respnse) {
            callback(respnse);
        });
    }


    function wasDone(response_text) {
        if (response_text === true) {
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
                    if (respnse[0] === true) {
                        alert("this caouse was created sucssesfuly.");
                        let courseModel = new CourseModuleController();
                        courseModel.GetAllCourse();
                        courseModel.getOneCourse(respnse[1]);
                    } else {
                        alert(respnse);

                    }
                });
            });

        },

        updateCourses: function(but_id) {
            getFormValues(but_id, function() {
                let course = new Course(data);
                sendAJAX("PUT", CourseApiUrl, course, function(respnse) {
                    if (respnse === true) {
                        alert("this caouse was updated sucssesfuly.");
                        let course_model = new CourseModuleController();
                        course_model.GetAllCourse();
                        course_model.getOneCourse(data.id);
                    } else {
                        alert(respnse);
                    }
                });
            });
        },


        deleteCourse: function(but_id) {
            let safe = confirm("Are you sure you want to delete this course?");
            if (safe === true) {
                data.id = but_id;
                let course = new Course(data);
                sendAJAX("DELETE", CourseApiUrl, course, function(respnse) {
                    wasDone(respnse);
                });
            }
        },


        GetAllCourse: function(permission) {
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, function(returned_data) {
                let column1 = new column1_director();
                column1.allcourses(returned_data, permission);
            });

        },


        GetCourseForStudent: function(id) {
            data.id = id;
            data.inner = true;
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, function(respnse) {
                let column3 = new column3_director();
                column3.getinnerJoin(respnse);

            });
        },


        checkfile: function(file) {
            readURL(file);
        },


        getOneCourse: function(id, permission) {
            data.id = id;
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, function(respnse) {
                if (respnse.constructor != Array) {
                    alert(respnse);
                } else {
                    let column3 = new column3_director();
                    column3.get_one_course(respnse, permission);

                }
            });
        }

    }

}



// add event to get course details
$(document).on("click", "#singleCourse", function() {
    location.hash = "course " + $(this).data("courseid") + " details";
    let course_model = new CourseModuleController();
    course_model.getOneCourse($(this).data("courseid"), $(this).data("permission"));
});


// add event to save/edit course
$(document).on("click", "#saveCourse", function() {
    let calltype = $(this).data("curseid");
    if (calltype === "new") {
        let course_model = new CourseModuleController();
        course_model.createCourse(calltype);
    } else {
        let course_model = new CourseModuleController();
        course_model.updateCourses(calltype);
    }
});


//  add event to delete course
$(document).on("click", "#deleteCourse", function() {
    let course_model = new CourseModuleController();
    course_model.deleteCourse($(this).data("curseid"));
});


//  add event to course details
$(document).on("click", "#editCourse", function() {
    location.hash = "edit course " + $(this).data("editid");
    let column3_model = new column3_director();
    column3_model.UpdateCourses($(this).data("editid"));
});

// add event for + new course
$("#add_new_course").click(function() {
    location.hash = "add new course";
    let column3 = new column3_director();
    column3.newCourseScreen();
});

$(document).on("change", "#st_photo", function(e) {
    let course_model = new CourseModuleController();
    course_model.checkfile(this);

});