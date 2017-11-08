//student model
function Student(data) {
    this.name = data.name;
    this.phone = data.phone;
    this.email = data.email;
    this.image = data.image;
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
        // let value = $('#' + but_id).val();

        if (but_id != "new") {
            data.id = but_id.substr(8);
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
            getFormValues('new', function() {
                sendAJAX("POST", ApiUrl, data, function(respnse){
                    wasDone(respnse);                    
                });
            });
        },



        GetAllStudents: function() {
            let allStudents = sendAJAX("GET", ApiUrl, data, function(respnse) {
                column2 = new column2_director();
                column2.allstudends(respnse);
            });
        },



        getStudent: function(id, but_id) {
            data.id = id;
            let manu = 'get_one';
            sendAJAX("GET", ApiUrl, data, function(respnse){
            column3 = new column3_director();
            column3.get_one_student(respnse);
            $("#" + but_id).unbind("click", handler);
            });


        },


        deleteStudent: function(but_id) {
            data.id = but_id.substr(14);
            sendAJAX("DELETE", ApiUrl, data, function(respnse){
                wasDone(respnse); 
                $("#" + but_id).unbind("click", handler);
                
                
            });

        },


        updateStudent: function(but_id) {
            getFormValues(but_id, function() {
                sendAJAX("PUT", ApiUrl, data, function(respnse){
                    wasDone(respnse);
                    $("#" + but_id).unbind("click", handler);  
                });
            });
        }


        // get data from form student form


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
    $(document).one('click', '#saveStud', function() {
        let student_model = new StudentModelController();
        student_model.updateStudent($(this).attr("id"));
    });

       //add event to student delete
    $(document).one('click', '#delete_student', function() {
        let student_model = new StudentModelController();
        student_model.deleteStudent($(this).attr("id"));
    });
