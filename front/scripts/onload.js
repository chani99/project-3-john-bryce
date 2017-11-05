 $(document).ready(function() {
     $("#loginform").hide();



     //get cuorse list & student list
     let course_model = new CourseModuleController();
     course_model.GetAllCourse(function() {
         let student_model = new StudentModelController();
         student_model.GetAllStudents();

     });

     $('#add_new_student').click(function() {
         manu = $("#select_manufac option:selected").val();
         let column3 = new column3_director();
         column3.newStudentScreen();


     });



     // Temporary to treat later
     let user = { name: "chani", role: "owner", image: "chani.jpg" };
     login(user);


     // move to navbar controler
     function login(user) {
         $.ajax('front/views/login_temp.html').always(function(logoutemp) {
             var c = logoutemp;
             c = c.replace("{{name}}", user.name);
             c = c.replace("{{role}}", user.role);
             c = c.replace("{{imgsrc}}", "back/images/" + user.image);
             let d = document.createElement('div');
             d.innerHTML = c;
             $('#login').append(d);
         });
     }



 });