var column3_director = function() {
    var column3_data = {};
    var course_model = new CourseModuleController();
    let column3;



    function tempNameFunction(details, student_courses, studen_id, calltype, callback) {
        $.ajax('front/views/new_update_student_temp.html').always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update student: " + details.name);
            c = c.replace("{{new?}}", "update");
            //  to do: add Delete Button


            c = c.replace("{{num}}", studen_id);
            c = c.replace("{{num2}}", studen_id);

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);
            $("#inputphone").val(details.phone);
            $("#inputemail").val(details.mail);
            $("#inputname").val(details.name);

            //add event to student save
            column3 = new column3_director();
            column3.AddCheckbox(student_courses);

            callback();
        });
    }



    function NewStudenttemp(callback) {
        $.ajax('front/views/new_update_student_temp.html').always(function(updateTemplate) {

            var c = updateTemplate;
            c = c.replace("{{form_name}}", "NEW STUDENT");
            c = c.replace("{{new?}}", "new");
            c = c.replace("{{num2}}", 'new');
            c = c.replace("{{num}}", '');

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);
            $('#delete_student').hide();

            column3 = new column3_director();
            column3.AddCheckbox();

            callback();

        });

    }

    function CouseUpdateTemp(details, course_id, calltype, callback) {
        $.ajax('front/views/new_update_course_temp.html').always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update Course: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{num}}", course_id);
            c = c.replace("{{num2}}", course_id);

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);
            $("#inputdetails").val(details.description);
            $("#inputname").val(details.name);

            callback();
        });
    }


    function UpdatesCourseTemp(calltype, course_id) {

        var details = {
            name: $("#course_name").html(),
            description: $("#course_details").html(),
        };


        CouseUpdateTemp(details, course_id, calltype, function() {

            const edit_id = 'saveCourse' + course_id;
            const delete_id = 'deleteCourse' + course_id;
            let course_model = new CourseModuleController();

            $(document).one('click', '#' + course_id, function() {
                course_model.updateCourses($(this).attr("id"));
            });

            $(document).one('click', '#' + delete_id, function() {
                course_model.deleteCourse($(this).attr("id"));
            });
        });


    }


    // function main_screen(callback) {
    //     $.ajax('front/views/main_screen.html').always(function(maintemp) {
    //         $('#main-scool').html("");

    //         var c = maintemp;
    //         let d = document.createElement('div');
    //         d.innerHTML = c;
    //         $('#main-scool').append(d);
    //         callback();

    //     });

    // }


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

        get_one_course: function(data) {

            $.ajax('front/views/course_details_temp.html').always(function(course_temp) {
                $('#main-scool').html("");

                var c = course_temp;
                c = c.replace("{{num}}", data[0].id);
                c = c.replace("{{editid}}", data[0].id);
                c = c.replace("{{name}}", data[0].name);
                c = c.replace("{{details}}", data[0].description);
                c = c.replace("{{imgsrc}}", "back/images/" + data[0].image);
                let d = document.createElement('div');
                d.innerHTML = c;
                $('#main-scool').append(d);

                //add event to student edit
                const num = 'editCourse' + data[0].id; // elemnt id  

                $(document).on('click', '#' + num, function() {
                    UpdatesCourseTemp("edit", $(this).data('editid'));
                });

            });


        },

        getinnerJoin: function(data) {

            $.ajax('front/views/course_temp.html').always(function(courseTemplate) {
                $('#main-scool .courselist').html("");

                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{course_id}}", data[i].Course_id);
                    c = c.replace("{{descrip}}", "");
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#main-scool .courselist').append(d);
                }

            });
        },


        // founction to load the main student update/new window
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

            tempNameFunction(details, student_courses, studen_id, calltype, function() {

                const edit_id = 'saveStud' + studen_id; // elemnt id   
                const delete_id = 'delete_student' + studen_id; // elemnt id  
                let student_model = new StudentModelController();

                $(document).one('click', '#' + edit_id, function() {

                    student_model.updateStudent($(this).attr("id"));
                });

                $(document).on('click', '#' + delete_id, function() {
                    student_model.deleteStudent($(this).attr("id"));
                });
            });





        },

        //  create cuorses checkbox list
        AddCheckbox: function(student_courses = false) {
            var CoursesArray = []; //gets all courses list from DOM
            $(".allCourses span h6").each(function(i, sp) {
                CoursesArray.push($(sp).attr("id"));
            });

            var Coursesid = []; //gets all courses list from DOM
            $(".allCourses button").each(function(i, sp) {
                Coursesid.push($(sp).attr("courseid"));
            });

            for (var i = 0; i < CoursesArray.length; i++) {
                var checkbox = document.createElement('input');
                checkbox.type = "checkbox";
                checkbox.name = "courses";
                checkbox.value = CoursesArray[i];
                checkbox.id = Coursesid[i];

                if (student_courses != false) {
                    for (var x = 0; x < student_courses.length; x++) {
                        if (Coursesid[i] == student_courses[x]) {
                            checkbox.checked = true;
                        }
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


        },


        newStudentScreen: function() {

            NewStudenttemp(function() {
                $(document).on('click', '#saveStudnew', function() {
                    let student_model = new StudentModelController();
                    student_model.createCourse($(this).attr("id"));
                });
            });


        }




    }
}