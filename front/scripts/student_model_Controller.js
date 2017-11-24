"use strict";

//student model
function Student(data) {
    if ('ctrl' in data && data.ctrl != "") this.ctrl = data.ctrl;
    if ('id' in data && data.id != "") this.id = data.id;
    if ('name' in data && data.name != "") this.name = data.name;
    if ('phone' in data && data.phone != "") this.phone = data.phone;
    if ('email' in data && data.email != "") this.email = data.email;
    if ('image' in data && data.image != "") this.image = data.image;
    if ('courses' in data) this.courses = data.courses;
    if ('inner' in data) this.inner = data.inner;



}


//student director
var StudentModelController = function() {
    let StudebtApiMethod = 'Student';
    let ApiUrl = "back/api/api.php";
    var data = {
        ctrl: StudebtApiMethod
    };
    let send;


    function getFormValues(but_id, callback) {
        let image;
        let courses = [];
        let values = [];

        values.name = $('#inputname').val().trim();
        values.phone = $('#inputphone').val().trim();
        values.email = $('#inputemail').val().trim();
        values.image = $('#browse').prop('files')[0];

        if (but_id != "new") { data.id = but_id; }

        $("input:checkbox[name='courses']:checked").each(function() { //get courses checked
            courses.push($(this).attr("id"));
        });

        data.courses = courses;

        //sends all input values for validation in if ok senbs them to sever...
        sendForValidation(values, but_id, function(returned) {
            if (returned.test_name == true && returned.test_phone == true && returned.test_email == true && returned.test_image == true) {
                if (values.image != undefined) {
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
        let test_phone = false;
        let test_email = false;
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
            $('#inputemail').addClass("error")
            test_email = false;
        }


        if ("image" in values) {
            temp_val = validate.validat_input(values.image, "image");
            if (temp_val == true) {
                $("#image_error").html("");
                test_image = true;
                $('#browse').removeClass("error");

            } else if (but_id == "new") {
                $("#image_error").html(temp_val);
                $('#browse').addClass("error")
                test_image = false;
            }

        }

        callback({ test_name: test_name, test_phone: test_phone, test_email: test_email, test_image: test_email });
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

    function wasCreated(response_text, id) {
        if (response_text == true) {
            alert("your request was done sucssesfuly.");
            GetAllStudents();
            getStudent(id);

        }
    }


    function readURL(input) {

        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#blah').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }


    function sendFileToAjax(image, callback) {
        let form_data = new FormData();
        form_data.append('file', image);
        sendFileToServer(form_data, function(respnse) {
            callback(respnse);
        });
    }



    return {

        createStudent: function() {
            getFormValues("new", function() {
                let student = new Student(data);
                sendAJAX("POST", ApiUrl, student, function(respnse) {
                    if (respnse[0] == true) {
                        alert("your request was done sucssesfuly.");
                        let student_model = new StudentModelController();
                        student_model.GetAllStudents();
                        student_model.getStudent(respnse[1]);
                    }

                });
            });
        },



        GetAllStudents: function() {
            let student = new Student(data);
            let allStudents = sendAJAX("GET", ApiUrl, student, function(respnse) {
                let column2 = new column2_director();
                column2.allstudends(respnse);
            });
        },



        getStudent: function(id, but_id) {
            data.id = id;
            let manu = 'get_one';
            let student = new Student(data);
            sendAJAX("GET", ApiUrl, student, function(respnse) {
                let column3 = new column3_director();
                column3.get_one_student(respnse);
            });


        },

        GetStudentForCourse: function(id) {
            data.id = id;
            data.inner = true;
            let stedents = new Student(data);
            sendAJAX("GET", ApiUrl, stedents, function(respnse) {
                let column3 = new column3_director();
                column3.getinnerJoinstudents(respnse);

            });
        },



        deleteStudent: function(but_id) {
            let safe = confirm("Are you sure you want to delete this student?");
            if (safe == true) {
                data.id = but_id;
                let student = new Student(data);
                sendAJAX("DELETE", ApiUrl, student, function(respnse) {
                    wasDone(respnse);
                });
            }

        },

        checkfile: function(file) {
            readURL(file);
        },


        updateStudent: function(but_id) {
            getFormValues(but_id, function() {
                let student = new Student(data);
                sendAJAX("PUT", ApiUrl, student, function(respnse) {
                    if (respnse == true) {
                        alert("your request was done sucssesfuly.");
                        let student_model = new StudentModelController();
                        student_model.GetAllStudents();
                        student_model.getStudent(data.id);
                    }

                });
            });
        }


    }

}




// add event to student details
$(document).on('click', '#singleStudent', function() {
    let student_model = new StudentModelController();
    student_model.getStudent($(this).data('studentid'));
});

//add event to student edit
$(document).on('click', '#editStudent', function() {
    let column3 = new column3_director();
    column3.Update_studentTemp("edit", $(this).data('editid'));
});

//add event to save or update student 
$(document).on('click', '#saveStud', function() {
    let student_model = new StudentModelController();
    let student_id = $(this).data('savestudent');
    if (student_id == 'new') {
        student_model.createStudent();
    } else { student_model.updateStudent(student_id); }
});

//add event to student delete
$(document).on('click', '#delete_student', function() {
    let student_model = new StudentModelController();
    student_model.deleteStudent($(this).data('deletestudent'));
});


$(document).on('change', '#browse', function(e) {
    let student_model = new StudentModelController();
    student_model.checkfile(this);

});

// add event for + new student
$('#add_new_student').click(function() {
    let column3 = new column3_director();
    column3.newStudentScreen();
});



// $(document).on('change', '#browse', function() {
//     let student_model = new StudentModelController();
//     let file = $('#browse').prop('files')[0];
//     student_model.checkfile(file);
// });