// course module
function Course(data) {
    if ('ctrl' in data && data.ctrl != "") this.ctrl = data.ctrl;
    if ('id' in data && data.ctrl != "") this.id = data.id;
    if ('name' in data && data.ctrl != "") this.name = data.name;
    if ('description' in data && data.ctrl != "") this.description = data.description;
    if ('image' in data && data.ctrl != "") this.image = data.image;
    if ('inner' in data && data.inner != "") this.inner = data.inner;

}



// course director
var CourseModuleController = function() {
    let CourseApiMethod = 'Course';
    let CourseApiUrl = "back/api/api.php";
    var data = {
        ctrl: CourseApiMethod
    };


    function getFormValues(but_id, callback) {
        let image;
        if (but_id != "new") {
            data.id = but_id;
        }
        data.name = $('#inputname').val();
        data.description = $('#inputdetails').val();
        image = $('#st_photo').prop('files')[0];

        if (image != undefined) { //send photo to server
            data.image = image.name;
            let form_data = new FormData();
            form_data.append('file', image);
            sendFileToServer(form_data, 'upload');
        }

        callback();
    }


    return {

        createCourse: function(but_id) {
            getFormValues(but_id, function() {
                let course = new Course(data);
                sendAJAX("POST", CourseApiUrl, course, 'create');
            });

        },

        updateCourses: function(but_id) {
            getFormValues(but_id, function() {
                let course = new Course(data);
                sendAJAX("PUT", CourseApiUrl, course, 'update');
            });
        },


        deleteCourse: function(but_id) {
            data.id = but_id;
            let course = new Course(data);
            sendAJAX("DELETE", CourseApiUrl, course, 'delete');
        },


        GetAllCourse: function(callback) {
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, 'getall');
            callback();
        },


        GetCourseForStudent: function(id) {
            data.id = id;
            data.inner = true;
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, 'getinnerJoin');
        },


        getOneCourse: function(id) {
            data.id = id;
            let course = new Course(data);
            sendAJAX("GET", CourseApiUrl, course, 'getcourse');
        }

    }

}



// add event to get course details
$(document).on('click', '#singleCourse', function() {
    let course_model = new CourseModuleController();
    course_model.getOneCourse($(this).data('courseid'));
});


// add event to save/edit course
$(document).on('click', '#saveCourse', function() {
    let calltype = $(this).data("curseid");
    if (calltype == 'new') {
        let course_model = new CourseModuleController();
        course_model.createCourse(calltype);
    } else {
        let course_model = new CourseModuleController();
        course_model.updateCourses(calltype);
    }
});


//  add event to delete course
$(document).on('click', '#deleteCourse', function() {
    let course_model = new CourseModuleController();
    course_model.deleteCourse($(this).data("curseid"));
});


//  add event to course details
$(document).on('click', '#editCourse', function() {
    let column3_model = new column3_director();
    column3_model.UpdateCourses($(this).data("editid"));
});