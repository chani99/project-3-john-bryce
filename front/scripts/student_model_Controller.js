//student model
function Student(data) {
    if ('ctrl' in data && data.ctrl != "") this.ctrl = data.ctrl;
    if ('id' in data && data.id != "") this.id = data.id;
    if ('name' in data && data.name != "") this.name = data.name;
    if ('phone' in data && data.phone != "") this.phone = data.phone;
    if ('email' in data && data.email != "") this.email = data.email;
    if ('image' in data && data.image != "") this.image = data.image;
    if ('courses' in data && data.courses != "") this.courses = data.courses;

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

        if (but_id == "new") {
            values.image = $('#browse').prop('files')[0];
        }

        if (but_id != "new") {
            data.id = but_id;
        }

        $("input:checkbox[name='courses']:checked").each(function() { //get courses checked
            courses.push($(this).attr("id"));
        });
        data.courses = courses;


        sendForValidation(values, function(returned) {
            if (returned.test_name == true && returned.text_phone == true && returned.text_email == true) {
                if ("image" in values && returned.test_image == true) {
                    sendFileToAjax(image, function(resulet) {
                        if (resulet) {
                            data.image = image.name;
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


    function sendForValidation(values, callback) {
        let validate = new validation();
        let temp_val;
        let test_name = false;
        let test_phone = false;
        let test_email = false;
        let test_image = false;


        // input validation
        temp_val = validate.validat_input(values.name, "name");
        if (temp_val == true) {
            $("#name_error").html("");
            data.name = values.name;
            test_name = true;
        } else {
            $("#name_error").html(temp_val);
            test_name = false;
        }


        temp_val = validate.validat_input(values.phone, "phone");
        if (temp_val == true) {
            $("#phone_error").html("");
            data.phone = values.phone;
            test_phone = true;

        } else {
            $("#phone_error").html(temp_val);
            test_phone = false;
        }

        temp_val = validate.validat_input(values.email, "email");
        if (temp_val == true) {
            $("#email_error").html("");
            data.email = values.email;
            test_email = true;

        } else {
            $("#email_error").html(temp_val);
            test_email = false;
        }


        if ("image" in values) { // true if "key" doesn't exist in object

            temp_val = validate.validat_input(values.image, "image");
            if (temp_val == true) {
                $("#image_error").html("");
                test_image = true;
            } else {
                $("#image_error").html(temp_val);
                test_image = false;

            }
        }

        callback({ test_name, test_phone, test_email, test_image });
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
        // imagecanvas();
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
                column2 = new column2_director();
                column2.allstudends(respnse);
            });
        },



        getStudent: function(id, but_id) {
            data.id = id;
            let manu = 'get_one';
            let student = new Student(data);
            sendAJAX("GET", ApiUrl, student, function(respnse) {
                column3 = new column3_director();
                column3.get_one_student(respnse);
            });


        },


        deleteStudent: function(but_id) {
            data.id = but_id;
            let student = new Student(data);
            sendAJAX("DELETE", ApiUrl, student, function(respnse) {
                wasDone(respnse);


            });

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
    column3 = new column3_director();
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


// $(document).on('change', '#browse', function() {
//     let student_model = new StudentModelController();
//     let file = $('#browse').prop('files')[0];
//     student_model.checkfile(file);
// });