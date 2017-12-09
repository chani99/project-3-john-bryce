"use strict";

//student model
function Student(data) {
    if ("ctrl" in data && data.ctrl) this.ctrl = data.ctrl;
    if ("id" in data && data.id) this.id = data.id;
    if ("name" in data && data.name) this.name = data.name;
    if ("phone" in data && data.phone) this.phone = data.phone;
    if ("email" in data && data.email) this.email = data.email;
    if ("image" in data && data.image) this.image = data.image;
    if ("courses" in data) this.courses = data.courses;
    if ("inner" in data) this.inner = data.inner;



}


//student director
var StudentModelController = function() {
    let StudebtApiMethod = "Student";
    let ApiUrl = "back/api/api.php";
    var data = {
        ctrl: StudebtApiMethod
    };
    let send;
    let myAjax = new SendAJAX();


    function getFormValues(butId, callback) {
        let image;
        let courses = [];
        let values = [];

        values.name = $("#inputname").val().trim();
        values.phone = $("#inputphone").val().trim();
        values.email = $("#inputemail").val().trim();
        values.image = $("#browse_s").prop("files")[0];

        if (butId !== "new") { data.id = butId; }

        $("input:checkbox[name='courses']:checked").each(function() { //get courses checked
            courses.push($(this).attr("id"));
        });

        data.courses = courses;

        //sends all input values for validation in if ok senbs them to sever...
        let sendForCheck = new SendValidation();
        sendForCheck.sendForValidation(values, butId, "student", function(returned) {
            if (returned.testName === true && returned.testPhone === true && returned.testEmail === true && returned.testImage === true) {
                data.name = values.name;
                data.phone = values.phone;
                data.email = values.email;

                //check if a image was uploaded and if was get the croped image
                // and send it for croping at server 
                if (values.image) {
                    let column3 = new Column3Director();
                    column3.getImageCropSize(function(crop_sizes) {
                        myAjax.sendFileToCrop(crop_sizes, function(resulet) {
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


    function wasDone(response_text) {
        if (response_text === true) {
            alert("your request was done sucssesfuly.");
            let loadmain = new MainScreen();
            loadmain.loadmaindcreen();

        } else {
            alert(response_text);
        }

    }



    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $("#blah").attr("src", e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    function sendFileToAjax(image, callback) {
        let formData = new FormData();
        formData.append("file", image);
        myAjax.sendFileToServer(formData, function(respnse) {
            callback(respnse);
        });
    }



    return {

        createStudent: function() {
            getFormValues("new", function() {
                let student = new Student(data);
                myAjax.sendAJAX("POST", ApiUrl, student, function(respnse) {
                    if (respnse[0] === true) {
                        alert("your request was done sucssesfuly.");
                        let studentModel = new StudentModelController();
                        studentModel.getAllStudents();
                        studentModel.getStudent(respnse[1]);
                    }

                });
            });
        },



        getAllStudents: function() {
            let student = new Student(data);
            let allStudents = myAjax.sendAJAX("GET", ApiUrl, student, function(respnse) {
                let column2 = new Column2Director();
                column2.allstudends(respnse);
            });
        },



        getStudent: function(id, butId) {
            data.id = id;
            let manu = "get_one";
            let student = new Student(data);
            myAjax.sendAJAX("GET", ApiUrl, student, function(respnse) {
                let column3 = new Column3Director();
                column3.getOneStudent(respnse);
            });


        },

        getStudentForCourse: function(id) {
            data.id = id;
            data.inner = true;
            let stedents = new Student(data);
            myAjax.sendAJAX("GET", ApiUrl, stedents, function(respnse) {
                let column3 = new Column3Director();
                column3.getinnerJoinstudents(respnse);

            });
        },



        deleteStudent: function(butId) {
            let safe = confirm("Are you sure you want to delete this student?");
            if (safe === true) {
                data.id = butId;
                let student = new Student(data);
                myAjax.sendAJAX("DELETE", ApiUrl, student, function(respnse) {
                    wasDone(respnse);
                });
            }

        },

        checkfile: function(file) {
            readURL(file);
        },


        updateStudent: function(butId) {
            getFormValues(butId, function() {
                let student = new Student(data);
                myAjax.sendAJAX("PUT", ApiUrl, student, function(respnse) {
                    if (respnse === true) {
                        alert("your request was done sucssesfuly.");
                        let studentModel = new StudentModelController();
                        studentModel.getAllStudents();
                        studentModel.getStudent(data.id);
                    }

                });
            });
        }


    }

}




// add event to student details
$(document).on("click", "#singleStudent", function() {
    let studentModel = new StudentModelController();
    location.hash = "student " + $(this).data("studentid") + " details";
    studentModel.getStudent($(this).data("studentid"));
});

//add event to student edit
$(document).on("click", "#editStudent", function() {
    location.hash = "edit student " + $(this).data("editid");
    let column3 = new Column3Director();
    column3.updateStudentTemp("edit", $(this).data("editid"));
});

//add event to save or update student 
$(document).on("click", "#saveStud", function() {
    let studentModel = new StudentModelController();
    let studentId = $(this).data("savestudent");
    if (studentId === "new") {
        studentModel.createStudent();
    } else { studentModel.updateStudent(studentId); }
});

//add event to student delete
$(document).on("click", "#delete_student", function() {
    let studentModel = new StudentModelController();
    studentModel.deleteStudent($(this).data("deletestudent"));
});


$(document).on("change", "#browse", function(e) {
    let studentModel = new StudentModelController();
    studentModel.checkfile(this);

});

// add event for + new student
$("#add_new_student").click(function() {
    $(this).data("new student")
    let column3 = new Column3Director();
    column3.newStudentScreen();
});


// add event to show image
$(document).on("change", "#browse_s", function(e) {
    let image = $("#browse_s").prop("files")[0];
    let column3 = new Column3Director();
    column3.uploadFile(image);

});