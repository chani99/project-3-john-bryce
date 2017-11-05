    // director module controller get values and call type from director.js
    // and creates a director model and then sends it to ajax
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
            // let student_model = new StudentModelController();
            // student_model.updateStudent(id, name, phone, file_name, email, courses);

        }




        return {

            createCourse: function() {
                getFormValues('new', function() {
                    sendAJAX("POST", ApiUrl, data, 'create');

                });


            },



            GetAllStudents: function() {
                sendAJAX("GET", ApiUrl, data, 'getallStudents');
            },



            getStudent: function(id) {
                data.id = id;
                let manu = 'get_one';
                sendAJAX("GET", ApiUrl, data, 'get_one', manu);
            },


            deleteStudent: function(but_id) {
                data.id = but_id.substr(14);
                sendAJAX("DELETE", ApiUrl, data, 'delete');
            },


            updateStudent: function(but_id) {
                getFormValues(but_id, function() {
                    sendAJAX("PUT", ApiUrl, data, 'update');

                });
            }


            //get data from form student form 


        }


    }