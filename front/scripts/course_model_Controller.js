    // director module controller get values and call type from director.js
    // and creates a director model and then sends it to ajax
    var CourseModuleController = function() {
        let CourseApiMethod = 'Course';
        let CourseApiUrl = "back/api/api.php";
        var data = {
            ctrl: CourseApiMethod
        };
        let send;


        function getFormValues(but_id, callback) {
            let image;
            if (but_id != "new") {
                data.id = but_id.substr(10);
            }
            data.name = $('#inputname').val();
            data.description = $('#inputdetails').val();

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

            updateCourses: function(but_id) {
                getFormValues(but_id, function() {
                    sendAJAX("PUT", CourseApiUrl, data, 'update');
                    $("#" + but_id).unbind("click", handler);
                });
            },

            deleteCourse: function(but_id) {
                data.id = but_id.substr(12);
                sendAJAX("DELETE", CourseApiUrl, data, 'delete');
                $("#" + but_id).unbind("click", handler);

            },


            GetAllCourse: function(callback) {
                sendAJAX("GET", CourseApiUrl, data, 'getall');
                callback();

            },

            GetCourseForStudent: function(id) {
                data.id = id;
                data.inner = true;
                sendAJAX("GET", CourseApiUrl, data, 'getinnerJoin');

            },

            getOneCourse: function(id, but_id) {
                data.id = id;
                sendAJAX("GET", CourseApiUrl, data, 'getcourse');
                $("#" + but_id).unbind("click", handler);


            }




        }


    }