"use strict";

var column3_director = function() {
    var column3_data = {};
    var course_model = new CourseModuleController();
    var student_model = new StudentModelController();
    let column3;



    function tempNameFunction(details, student_courses, studen_id, calltype) {
        $.ajax('front/views/new_update_student_temp.html').always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update student: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{saveid}}", studen_id);
            c = c.replace("{{deleteid}}", studen_id);

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);
            $("#inputphone").val(details.phone);
            $("#inputemail").val(details.mail);
            $("#inputname").val(details.name);

            //add checkbox
            column3 = new column3_director();
            column3.AddCheckbox(student_courses);

        });
    }

    function temtAdminFunction(details, admin_id, permission) {
        $.ajax('front/views/new_update_admin_temp.html').always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update Admin: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{A_id2}}", admin_id);
            c = c.replace("{{deleteid}}", admin_id);

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main_admin').html("");
            $('#main_admin').append(d);
            $("#inputphone").val(details.phone);
            $("#inputemail").val(details.mail);
            $("#inputname").val(details.name);
            switch (details.role) {
                case "owner":
                    $("select option[value=5]").attr("selected", "selected");
                    break;
                case "manager":
                    $("select option[value=6]").attr("selected", "selected");
                    break;
                case "sales":
                    $("select option[value=7]").attr("selected", "selected");
                    break;
            }

            if (permission == "manager") {
                $("#inpurole").attr("disabled", "true");
                $('#delete_admin').hide();
            }

        });


    }


    function NewStudenttemp() {
        $.ajax('front/views/new_update_student_temp.html').always(function(updateTemplate) {

            var c = updateTemplate;
            c = c.replace("{{form_name}}", "NEW STUDENT");
            c = c.replace("{{new?}}", "new");
            c = c.replace("{{saveid}}", 'new');
            c = c.replace("{{deleteid}}", '');

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);
            $('#delete_student').hide();
            column3 = new column3_director();
            column3.AddCheckbox();


        });

    }


    function NewAdmintemp(permission) {
        $.ajax('front/views/new_update_admin_temp.html').always(function(updateTemplate) {

            var c = updateTemplate;
            c = c.replace("{{form_name}}", "NEW ADMINISTRATOR");
            c = c.replace("{{new?}}", "new");
            c = c.replace("{{A_id2}}", "new");
            c = c.replace("{{deleteid}}", '');

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main_admin').html("");
            $('#main_admin').append(d);
            $('#delete_admin').hide();

            if (permission == "manager") {
                $("select option[value=5]").attr("disabled", "true");
            }


        });

    }

    function NewCoursetemp() {
        $.ajax('front/views/new_update_course_temp.html').always(function(NewCourseTemplate) {

            var c = NewCourseTemplate;
            c = c.replace("{{form_name}}", "NEW COURSE");
            c = c.replace("{{C_id}}", "new");
            c = c.replace("{{C_id2}}", 'new');
            c = c.replace("{{num}}", '');

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);
            $('#deleteCourse').hide();


        });



    }




    function CouseUpdateTemp(details, course_id) {
        $.ajax('front/views/new_update_course_temp.html').always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update Course: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{C_id}}", course_id);
            c = c.replace("{{C_id2}}", course_id);

            let d = document.createElement('div');
            d.innerHTML = c;
            $('#main-scool').html("");
            $('#main-scool').append(d);

            if (details.studentsSum > 0) { $('#deleteCourse').hide(); }
            $("#inputdetails").val(details.description);
            $("#inputname").val(details.name);
            $("#totalstudents").html("Total students registered in " + details.name + " course is: " + details.studentsSum);



        });
    }




    return {


        main_screen: function(callback) {
            $.ajax('front/views/main_screen.html').always(function(main_temp) {
                var c = main_temp;
                $('#main-scool').html("");
                let d = document.createElement('div');
                d.innerHTML = c;
                $('#main-scool').append(d);
            });
            callback();
        },

        main_screen2: function(callback) {
            $.ajax('front/views/main_screenAdmins.html').always(function(main_temp) {
                var c = main_temp;
                $('#main_admin').html("");
                let d = document.createElement('div');
                d.innerHTML = c;
                $('#main_admin').append(d);
            });
            callback();
        },



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

            });

        },


        getinnerJoin: function(data) {

            $.ajax('front/views/course_temp.html').always(function(courseTemplate) {
                $('#main-scool .courselist').html("");

                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{singleCourse}}", 'singlecourseIJ');
                    c = c.replace("{{course_id}}", data[i].Course_id);
                    c = c.replace("{{descrip}}", "");
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#main-scool .courselist').append(d);
                }

            });
        },

        getinnerJoinstudents: function(data) {

            $.ajax('front/views/student_temp_for_list.html').always(function(courseTemplate) {
                $('#studentlistforCourse').html("");


                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{singleStudent}}", "StudentinCourse" + i);
                    c = c.replace("{{studentid}}", data[i].Student_id);
                    c = c.replace("{{name}}", data[i].Student_name);
                    c = c.replace("{{phone}}", data[i].Student_phone);
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Student_image);
                    c = c.replace("{{sum}}", data.length);


                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#studentlistforCourse').append(d);
                }
            });

        },

        // founction to load the main student update/new window
        Update_studentTemp: function(calltype, studen_id) { //data

            var details = {
                name: $("#student_name").html(),
                phone: $("#student_phone").html(),
                mail: $("#student_email").html(),
            };

            let student_courses = []; //gets the student courses list DOM
            $(".courselist span h6").each(function(i, sp) {
                student_courses.push($(sp).attr("id"));
            });

            tempNameFunction(details, student_courses, studen_id, calltype);
        },


        // founction to load the main student update/new window
        UpdateAdmins: function(admin_id, permission) {

            var details = {
                name: $("#admin_name" + admin_id).html().slice(0, -2),
                phone: $("#admin_phone" + admin_id).html(),
                mail: $("#admin_mail" + admin_id).html(),
                role: $("#admin_role" + admin_id).html().trim()
            };

            temtAdminFunction(details, admin_id, permission);
        },



        //  create cuorses checkbox list
        AddCheckbox: function(student_courses = false) {
            var CoursesArray = []; //gets all courses list from DOM
            $(".allCourses span h6").each(function(i, sp) {
                CoursesArray.push($(sp).attr("id"));
            });

            var Coursesid = []; //gets all courses list from DOM
            $(".allCourses button").each(function(i, sp) {
                Coursesid.push($(sp).data("courseid"));
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

        get_one_course: function(data, permission) {

            $.ajax('front/views/course_details_temp.html').always(function(course_temp) {
                $('#main-scool').html("");

                var c = course_temp;
                c = c.replace("{{editid}}", data[0].id);
                c = c.replace("{{name}}", data[0].name);
                c = c.replace("{{details}}", data[0].description);
                c = c.replace("{{imgsrc}}", "back/images/" + data[0].image);
                let d = document.createElement('div');
                d.innerHTML = c;
                $('#main-scool').append(d);
                if (permission == "sales") {
                    $("#editCourse").hide();
                }

                student_model.GetStudentForCourse(data[0].id);

            });

        },


        UpdateCourses: function(course_id) {

            $("input:checkbox[name='courses']:checked").each(function() { //get courses checked
                courses.push($(this).attr("id"));
            });

            var details = {
                name: $("#course_name").html(),
                description: $("#course_details").html(),
                studentsSum: $('[id^=StudentinCourse]').length
            };

            CouseUpdateTemp(details, course_id);
        },


        newCourseScreen: function() {
            NewCoursetemp();
        },

        newStudentScreen: function() {
            NewStudenttemp();

        },
        newAdminScreen: function(permission) {
            NewAdmintemp(permission);
        }




    }
}