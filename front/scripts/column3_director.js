var column3_director = function() {
    var column3_data = {};
    var course_model = new CourseModuleController();
    let column3;



    return {

        get_one_student: function(data) {

            $.ajax('front/views/student_details_temp.html').always(function(student_temp) {
                $('#main-scool').html("");

                var c = student_temp;
                c = c.replace("{{num}}", data[0].id);
                c = c.replace("{{editid}}", data[0].id);
                c = c.replace("{{name}}", data[0].name);
                c = c.replace("{{phone}}", data[0].phone);
                c = c.replace("{{email}}", data[0].email);
                c = c.replace("{{imgsrc}}", "back/images/" + data[0].image);

                let d = document.createElement('div');
                d.innerHTML = c;
                $('#main-scool').append(d);
                course_model.GetCourseForStudent(data[0].id);

                //add event to student edit
                const num = 'editStud' + data[0].id; // elemnt id  

                $(document).on('click', '#' + num, function() {
                    column3 = new column3_director();
                    column3.UpdatestudentTemp("edit", $(this).data('editid'));
                });

            });


        },

        getinnerJoin: function(data) {

            $.ajax('front/views/course_temp.html').always(function(courseTemplate) {
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{course_name}}", data[i].Course_name);
                    c = c.replace("{{descrip}}", "");
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#main-scool .courselist').append(d);
                }

            });
        },

        // founction to load th main student update/new window
        UpdatestudentTemp: function(calltype, studen_id, data) {

            var details = {
                name: $("#student_name").html(),
                phone: $("#student_phone").html(),
                mail: $("#student_email").html(),
            };

            let student_courses = []; //gets the student courses list DOM
            $(".courselist span h6").each(function(i, sp) {
                student_courses.push($(sp).attr("id"));
            });


            $.ajax('front/views/new_update_student_temp.html').always(function(updateTemplate) {
                var c = updateTemplate;
                if (calltype == "edit") {
                    c = c.replace("{{form_name}}", "Update student: " + details.name);
                    c = c.replace("{{new?}}", "update");
                    //  to do: add Delete Button

                } else {
                    c = c.replace("{{form_name}}", "NEW STUDENT");
                    //  to do: remove Delete Button
                }


                c = c.replace("{{num}}", studen_id);
                let d = document.createElement('div');
                d.innerHTML = c;
                $('#main-scool').html("");
                $('#main-scool').append(d);
                $("#inputphone").val(0 + details.phone);
                $("#inputemail").val(details.mail);
                $("#inputname").val(details.name);


                column3 = new column3_director();
                column3.AddCheckbox(student_courses);

                //add event to student save
                const num = 'saveStud' + studen_id; // elemnt id                 
                $(document).on('click', '#' + num, function() {
                    getFormValues("getform", $(this).attr("id"));
                });

            });

        },
        //  create cuorses checkbox list
        AddCheckbox: function(student_courses) {



            var CoursesArray = []; //gets all courses list from DOM
            $(".allCourses span h6").each(function(i, sp) {
                CoursesArray.push($(sp).attr("id"));
            });


            for (var i = 0; i < CoursesArray.length; i++) {
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "courses";
                checkbox.value = CoursesArray[i];
                checkbox.id = i + 1;

                for (var x = 0; x < student_courses.length; x++) {
                    if (CoursesArray[i] == student_courses[x]) {
                        checkbox.checked = true;
                    }
                }

                var label = document.createElement('label')
                label.htmlFor = i + 1;
                label.appendChild(document.createTextNode(CoursesArray[i] + " course"));
                let br = document.createElement("br");

                $('#course-checkbox').append(checkbox);
                $('#course-checkbox').append(label);
                $('#course-checkbox').append(br);

            }



        }
    }
}