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

        if (but_id != "new") {
            data.id = but_id;
        }
        data.name = $('#inputname').val();
        data.phone = $('#inputphone').val();
        data.email = $('#inputemail').val();

        $("input:checkbox[name='courses']:checked").each(function() { //get courses checked
            courses.push($(this).attr("id"));
        });
        data.courses = courses;

        image = $('#st_photo').prop('files')[0]; //send photo to server
        if (image != undefined) {
            data.image = image.name;
            let form_data = new FormData();
            form_data.append('file', image);
            sendFileToServer(form_data, 'upload');
        }
        callback();
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

        createStudent: function() {
            getFormValues("new", function() {
                let student = new Student(data);
                sendAJAX("POST", ApiUrl, student, function(respnse) {
                    wasDone(respnse);
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


        updateStudent: function(but_id) {
            getFormValues(but_id, function() {
                let student = new Student(data);
                sendAJAX("PUT", ApiUrl, student, function(respnse) {
                    wasDone(respnse);
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