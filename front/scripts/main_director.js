var main_screen = function() {
    // let column1ApiMethod = 'Student';
    // let ApiUrl = "back/api/api.php";
    var column1_data = {};


    return {


        loadmaindcreen: function() {

            //get cuorse list & student list
            let column3 = new column3_director();
            column3.main_screen();
            let course_model = new CourseModuleController();
            course_model.GetAllCourse(function() {
                let student_model = new StudentModelController();
                student_model.GetAllStudents();

            });

        }




    }
}