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
                console.log(id);
                data.id = id;
                let manu = 'get_one';
                sendAJAX("GET", ApiUrl, data, 'get_one', manu);
            }


        }


    }