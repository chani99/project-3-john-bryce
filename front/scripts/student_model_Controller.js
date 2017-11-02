    // director module controller get values and call type from director.js
    // and creates a director model and then sends it to ajax
    var StudentModelController = function() {
        let StudebtApiMethod = 'Student';
        let ApiUrl = "back/api/api.php";
        var data = {
            ctrl: StudebtApiMethod
        };
        let send;


        return {

            createCourse: function(name, file_name, manu) {
                data.name = name;
                data.image = file_name;
                data.manu = manu;
                send = Object.create(Phone);
                send.newPhone(data);
                if (send.getname() != false) {
                    sendAJAX("POST", customerApiUrl, data, 'create');

                }
            },



            GetAllStudents: function() {
                sendAJAX("GET", ApiUrl, data, 'getallStudents');
            },

            updatestudent: function(manu, data) {
                alert('hi')
                    // sendAJAX("GET", ApiUrl, data, 'getall', manu);
            },


            getStudent: function(id) {
                data.id = id;
                let manu = 'get_one';
                sendAJAX("GET", ApiUrl, data, 'get_one', manu);
            },

            updateStudent: function(id, name, phone, file_name, email, courses) {
                data.id = id;
                data.name = name;
                data.phone = phone;
                data.image = file_name;
                data.email = email;
                data.courses = courses;
                send = new Student(data);
                sendAJAX("PUT", ApiUrl, data, 'update');

            },


            //get data from form student form 
            getFormValues: function(calltype, but_id) {
                let name;
                let phone;
                let image;
                let file_name;
                let email;
                let courses = [];
                let id = but_id.substr(8);

                let value = $('#' + but_id).val();
                switch (value) {
                    case 'update':
                        name = $('#inputname').val();
                        phone = $('#inputphone').val();
                        email = $('#inputemail').val();
                        image = $('#st_photo').prop('files')[0];
                        $("input:checkbox[name='courses']:checked").each(function() {
                            courses.push($(this).val());
                        });

                        if (image != undefined) {
                            file_name = image.name;
                            let form_data = new FormData();
                            form_data.append('file', image);
                            sendFileToServer(form_data, 'upload');
                        }

                        let student_model = new StudentModelController();
                        student_model.updateStudent(id, name, phone, file_name, email, courses);
                        break;
                }
            }



        }


    }