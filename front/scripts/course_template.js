 function createtemps(data, manu) {


     switch (manu) {
         //  break;        //  case "allstudends":
         //      $('#Students').html("");
         //      $('#Ssum').html(data.length);

         //      // ajax for STUDENT list
         //      $.ajax('front/views/student_temp.html').always(function(courseTemplate) {
         //          for (let i = 0; i < data.length; i++) {
         //              var c = courseTemplate;
         //              const num = 'student' + data[i].Student_id; // elemnt id

         //              c = c.replace("{{studentid}}", data[i].Student_id);
         //              c = c.replace("{{elementid}}", num);
         //              c = c.replace("{{name}}", data[i].Student_name);
         //              c = c.replace("{{phone}}", data[i].Student_phone);
         //              c = c.replace("{{imgsrc}}", "back/images/" + data[i].Student_image);

         //              let d = document.createElement('div');
         //              d.innerHTML = c;
         //              $('#Students').append(d);

         //              $(document).on('click', '#' + num, function() {
         //                  let student_model = new StudentModelController();
         //                  student_model.getStudent($(this).data('studentid'));
         //              });

         //          }

         //      });



         // ajax for CUORSES list
         //  case "allcourses":
         //      $('#course').html("");
         //      $('#Csum').html(data.length);


         //      $.ajax('front/views/course_temp.html').always(function(courseTemplate) {

         //          for (let i = 0; i < data.length; i++) {
         //              var c = courseTemplate;

         //              c = c.replace("{{num}}", i);
         //              c = c.replace("{{name}}", data[i].Course_name);
         //              c = c.replace("{{descrip}}", data[i].Course_name);
         //              c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
         //              c = c.replace("{{course_name}}", data[i].Course_name);



         //              let d = document.createElement('div');
         //              d.innerHTML = c;
         //              $('#course').append(d);



         //          }
         //  //      });
         //  break;


         // ajax for LOGIN and LOGOUT info top-right 
         //  case "login":
         //      $.ajax('front/views/login_temp.html').always(function(logoutemp) {
         //          var c = logoutemp;
         //          c = c.replace("{{name}}", data.name);
         //          c = c.replace("{{role}}", data.role);
         //          c = c.replace("{{imgsrc}}", "back/images/" + data.image);
         //          let d = document.createElement('div');
         //          d.innerHTML = c;
         //          $('#login').append(d);
         //      });
         //      break;


         // ajax for one student information (main window - when click on a student) 
         //  case "get_one":
         //      $.ajax('front/views/student_details_temp.html').always(function(student_temp) {
         //          $('#main-scool').html("");
         //          var c = student_temp;

         //          c = c.replace("{{num}}", data[0].id);
         //          c = c.replace("{{editid}}", data[0].id);
         //          c = c.replace("{{name}}", data[0].name);
         //          c = c.replace("{{phone}}", data[0].phone);
         //          c = c.replace("{{email}}", data[0].email);

         //          c = c.replace("{{imgsrc}}", "back/images/" + data[0].image);
         //          let d = document.createElement('div');
         //          d.innerHTML = c;
         //          $('#main-scool').append(d);

         //          //add event to student edit
         //          const num = 'editStud' + data[0].id; // elemnt id                 
         //          $(document).on('click', '#' + num, function() {
         //              UpdatestudentTemp("edit", $(this).data('editid'));
         //          });

         //          //call a function to det all courses for this student
         //          let course_model = new CourseModuleController();
         //          let courses = course_model.GetCourseForStudent(data[0].id);
         //      });
         //      break;

         // ajax that puts all courses for the student into the main student details window
         //  case "getinnerJoin":
         //      $.ajax('front/views/course_temp.html').always(function(courseTemplate) {
         //          for (let i = 0; i < data.length; i++) {
         //              var c = courseTemplate;
         //              c = c.replace("{{name}}", data[i].Course_name);
         //              c = c.replace("{{course_name}}", data[i].Course_name);
         //              c = c.replace("{{descrip}}", "");
         //              c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
         //              let d = document.createElement('div');
         //              d.innerHTML = c;
         //              $('#main-scool .courselist').append(d);
         //          }

         //      });
         //      break;
     }



     //  // founction to load th main student update/new window
     //  function UpdatestudentTemp(calltype, studen_id, data) {

     //      var details = {
     //          name: $("#student_name").html(),
     //          phone: $("#student_phone").html(),
     //          mail: $("#student_email").html(),
     //      };

     //      let student_courses = [];
     //      $(".courselist span h6").each(function(i, sp) {
     //          //  console.log(sp);
     //          student_courses.push($(sp).attr("id"));
     //      });
     //      //  console.log(student_courses.join(", "));


     //      var CoursesArray = [];
     //      $(".allCourses span h6").each(function(i, sp) {
     //          CoursesArray.push($(sp).attr("id"));
     //      });



     //      $.ajax('front/views/new_update_student_temp.html').always(function(updateTemplate) {
     //          var c = updateTemplate;
     //          if (calltype == "edit") {
     //              c = c.replace("{{form_name}}", "Update student: " + details.name);
     //              c = c.replace("{{new?}}", "update");

     //          } else {
     //              c = c.replace("{{form_name}}", "NEW STUDENT");
     //          }
     //          c = c.replace("{{num}}", studen_id);
     //          let d = document.createElement('div');
     //          d.innerHTML = c;
     //          $('#main-scool').html("");
     //          $('#main-scool').append(d);

     //          //  create cuorses checkbox list


     //          for (var i = 0; i < CoursesArray.length; i++) {
     //              var checkbox = document.createElement('input');
     //              checkbox.type = "checkbox";
     //              checkbox.name = "courses";
     //              checkbox.value = CoursesArray[i];
     //              checkbox.id = i + 1;

     //              for (var x = 0; x < student_courses.length; x++) {
     //                  if (CoursesArray[i] == student_courses[x]) {
     //                      checkbox.checked = true;
     //                  }
     //              }

     //              var label = document.createElement('label')
     //              label.htmlFor = i + 1;
     //              label.appendChild(document.createTextNode(CoursesArray[i] + " course"));
     //              let br = document.createElement("br");

     //              $('#course-checkbox').append(checkbox);
     //              $('#course-checkbox').append(label);
     //              $('#course-checkbox').append(br);

     //          }


     //          $("#inputphone").val(0 + details.phone);
     //          $("#inputemail").val(details.mail);
     //          $("#inputname").val(details.name);

     //          //add event to student save
     //          const num = 'saveStud' + studen_id; // elemnt id                 
     //          $(document).on('click', '#' + num, function() {
     //              getFormValues("getform", $(this).attr("id"));
     //          });

     //      });
     //  }


     //  function getFormValues(calltype, id) {
     //      let name;
     //      let phone;
     //      let image;
     //      let file_name;
     //      let email;
     //      let courses;
     //      let value = $('#' + id).val();
     //      //  let student_model = new StudentModelController();

     //      // gets values and sends them to the controller
     //      switch (value) {
     //          case 'update':
     //              name = $('#inputname').val();
     //              phone = $('#inputphone').val();
     //              email = $('#inputemail').val();
     //              image = $('#st_photo').prop('files')[0];
     //              courses = $('input[name="courses"]:checked').serialize();


     //              if (image != undefined) {
     //                  file_name = image.name;
     //                  let form_data = new FormData();
     //                  form_data.append('file', image);
     //                  sendFileToServer(form_data, 'upload');
     //              }

     //              student_model.updateStudent(name, phone, file_name, email, coursrs);
     //              break;
     //      }
     //  }
 }