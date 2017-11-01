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


     //get data from form - move to????
     function getFormValues(calltype, id) {
         let name;
         let phone;
         let image;
         let file_name;
         let email;
         let courses;
         let value = $('#' + id).val();
         switch (value) {
             case 'update':
                 name = $('#inputname').val();
                 phone = $('#inputphone').val();
                 email = $('#inputemail').val();
                 image = $('#st_photo').prop('files')[0];
                 courses = $('input[name="courses"]:checked').serialize();


                 if (image != undefined) {
                     file_name = image.name;
                     let form_data = new FormData();
                     form_data.append('file', image);
                     sendFileToServer(form_data, 'upload');
                 }

                 student_model.updateStudent(name, phone, file_name, email, coursrs);
                 break;
         }
     }

 });

 //  var myJSON = JSON.stringify(NoteDataArray);
 // localStorage.setItem("Tasks", myJSON);