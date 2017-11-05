    // director module controller get values and call type from director.js
    // and creates a director model and then sends it to ajax
    var CourseModuleController = function() {
        let CourseApiMethod = 'Course';
        let CourseApiUrl = "back/api/api.php";
        var data = {
            ctrl: CourseApiMethod
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



            GetAllCourse: function(callback) {
                sendAJAX("GET", CourseApiUrl, data, 'getall');
                callback();

            },

            GetCourseForStudent: function(id) {
                data.id = id;
                data.inner = true;
                sendAJAX("GET", CourseApiUrl, data, 'getinnerJoin');

            },



        }


    }