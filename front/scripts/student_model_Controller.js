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




    return {

        createStudent: function() {
            getFormValues('new', function() {
                sendAJAX("POST", ApiUrl, data, 'create');

            });


        },



        GetAllStudents: function() {
            sendAJAX("GET", ApiUrl, data, 'getallStudents');
        },



        getStudent: function(id, but_id) {
            data.id = id;
            let manu = 'get_one';
            sendAJAX("GET", ApiUrl, data, 'get_one', manu);
            $("#" + but_id).unbind("click", handler);

        },


        deleteStudent: function(but_id) {
            data.id = but_id.substr(14);
            sendAJAX("DELETE", ApiUrl, data, 'delete');
            $("#" + but_id).unbind("click", handler);

        },


        updateStudent: function(but_id) {
            getFormValues(but_id, function() {
                sendAJAX("PUT", ApiUrl, data, 'update');
                $("#" + but_id).unbind("click", handler);
            });
        }


        // get data from form student form


    }


}




// function deleteStudent(but_id) {
//     let student_model = new StudentModelController();
//     student_model.deleteStudent(but_id);
// }

// function updateStudent(but_id) {
//     let student_model = new StudentModelController();
//     student_model.updateStudent(but_id);
// }

// function CreateStudent(id) {
//     let student_model = new StudentModelController();
//     student_model.createCourse();
// }

// function getStudent(id) {
//     let student_model = new StudentModelController();
//     student_model.getStudent(id);
// }

// let student_model = new StudentModelController();
// student_model.getStudent($(this).data('studentid'));


//     editStudentOnclick: function() {
//     let student_model = new StudentModelController();
//     student_model.updateStudent($(this).attr("id"));

// },

// deleteStudentOnclick: function() {
//     let student_model = new StudentModelController();
//     student_model.deleteStudent($(this).attr("id"));


// },