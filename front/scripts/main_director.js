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
                courseController.GetAllCourse(function() {
                    let studentController = new StudentModelController();
                    studentController.GetAllStudents();

                });


            });

        }




    }
}