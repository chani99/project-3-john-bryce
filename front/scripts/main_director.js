"use strict";

var main_screen = function() {
    // let column1ApiMethod = 'Student';
    // let ApiUrl = "back/api/api.php";
    // var column1_data = {};


    return {


        loadmaindcreen: function() {

            //get cuorse list & student list
            let column33 = new column3_director();
            column33.main_screen(function() {
                let courseController = new CourseModuleController();
                let studentController = new StudentModelController();

                courseController.GetAllCourse();
                studentController.GetAllStudents();
                $('#screen2').hide();
            });

        },
        loadadminscreen: function() {

            //get cuorse list & student list
            let column33 = new column3_director();
            column33.main_screen(function() {
                let AdminController = new AdminModelController();
                AdminController.GetAllAdmins();
                $('#screen2').hide();
            });

        }





    }
}



// add event for nav bar school
$('#nav_school').click(function() {
    let loadmain = new main_screen();
    loadmain.loadmaindcreen();
});