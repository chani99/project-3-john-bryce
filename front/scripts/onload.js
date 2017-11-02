 $(document).ready(function() {
     $("#loginform").hide();


     // Temporary to treat later
     let user = { name: "chani", role: "owner", image: "chani.jpg" };
     login(user);


     //get cuorse list
     let course_model = new CourseModuleController();
     course_model.GetAllCourse();

     //get student list
     let student_model = new StudentModelController();
     student_model.GetAllStudents();





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

 //  var myJSON = JSON.stringify(NoteDataArray);
 // localStorage.setItem("Tasks", myJSON);