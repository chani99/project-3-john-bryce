"use strict";

var Column3Director = function() {
    var column3_data = {};
    var courseModel = new CourseModuleController();
    var studentModel = new StudentModelController();
    let column3;


    //loads update student form screen
    function tempNameFunction(details, studentCourses, studen_id, calltype) {
        $.ajax("front/views/new_update_student_temp.html").always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update student: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{saveid}}", studen_id);
            c = c.replace("{{deleteid}}", studen_id);

            let d = document.createElement("div");
            d.innerHTML = c;
            $("#main-scool").html("");
            $("#main-scool").append(d);
            $("#inputphone").val(details.phone);
            $("#inputemail").val(details.mail);
            $("#inputname").val(details.name);

            //add checkbox
            column3 = new Column3Director();;
            column3.addCheckbox(studentCourses);

        });
    }

    //loads update admin form screen
    function temtAdminFunction(details, admin_id, permission) {
        $.ajax("front/views/new_update_admin_temp.html").always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update Admin: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{A_id2}}", admin_id);
            c = c.replace("{{deleteid}}", admin_id);

            let d = document.createElement("div");
            d.innerHTML = c;
            $("#main_admin").html("");
            $("#main_admin").append(d);
            $("#inputphone").val(details.phone);
            $("#inputemail").val(details.mail);
            $("#inputname").val(details.name);
            $("#inputpassword").attr("placeholder", "Update this " + details.role + " password (not required)");

            switch (details.role) {
                case "owner":
                    $("select option[value=5]").attr("selected", "selected");
                    break;
                case "manager":
                    $("select option[value=6]").attr("selected", "selected");
                    if (permission === "manager") {
                        $("#passwordhide").hide();
                    }
                    $("select option[value=5]").attr("disabled", "true");
                    break;
                case "sales":
                    $("select option[value=7]").attr("selected", "selected");
                    $("select option[value=5]").attr("disabled", "true");
                    break;
            }

            if (permission === "manager") {
                $("#inpurole").attr("disabled", "true");
                $("#delete_admin").hide();
            }

        });


    }

    //loads new student form screen
    function newStudenttemp() {
        $.ajax("front/views/new_update_student_temp.html").always(function(updateTemplate) {

            var c = updateTemplate;
            c = c.replace("{{form_name}}", "NEW STUDENT");
            c = c.replace("{{new?}}", "new");
            c = c.replace("{{saveid}}", "new");
            c = c.replace("{{deleteid}}", "");

            let d = document.createElement("div");
            d.innerHTML = c;
            $("#main-scool").html("");
            $("#main-scool").append(d);
            $("#delete_student").hide();
            column3 = new Column3Director();;
            column3.addCheckbox();


        });

    }

    //loads new admin form screen
    function newAdmintemp(permission) {
        $.ajax("front/views/new_update_admin_temp.html").always(function(updateTemplate) {

            var c = updateTemplate;
            c = c.replace("{{form_name}}", "NEW ADMINISTRATOR");
            c = c.replace("{{new?}}", "new");
            c = c.replace("{{A_id2}}", "new");
            c = c.replace("{{deleteid}}", "");

            let d = document.createElement("div");
            d.innerHTML = c;
            $("#main_admin").html("");
            $("#main_admin").append(d);
            $("#delete_admin").hide();
            $("select option[value=5]").attr("disabled", "true");

        });

    }

    //loads new course form screen
    function newCoursetemp() {
        $.ajax("front/views/new_update_course_temp.html").always(function(NewCourseTemplate) {

            var c = NewCourseTemplate;
            c = c.replace("{{form_name}}", "NEW COURSE");
            c = c.replace("{{C_id}}", "new");
            c = c.replace("{{C_id2}}", "new");
            c = c.replace("{{num}}", "");

            let d = document.createElement("div");
            d.innerHTML = c;
            $("#main-scool").html("");
            $("#main-scool").append(d);
            $("#deleteCourse").hide();


        });



    }



    //loads update course form screen
    function couseUpdateTemp(details, courseId) {
        $.ajax("front/views/new_update_course_temp.html").always(function(updateTemplate) {
            var c = updateTemplate;
            c = c.replace("{{form_name}}", "Update Course: " + details.name);
            c = c.replace("{{new?}}", "update");
            c = c.replace("{{C_id}}", courseId);
            c = c.replace("{{C_id2}}", courseId);

            let d = document.createElement("div");
            d.innerHTML = c;
            $("#main-scool").html("");
            $("#main-scool").append(d);

            if (details.studentsSum > 0) { $("#deleteCourse").hide(); }
            $("#inputdetails").val(details.description);
            $("#inputname").val(details.name);
            $("#totalstudents").html("Total students registered in " + details.name + " course is: " + details.studentsSum);

        });
    }




    return {

        //loads main screen
        main_screen: function(callback) {
            $.ajax("front/views/main_screen.html").always(function(main_temp) {
                var c = main_temp;
                $("#main-scool").html("");
                let d = document.createElement("div");
                d.innerHTML = c;
                $("#main-scool").append(d);
            });
            callback();
        },

        //loads main admin screen
        mainScreen2: function(callback) {
            $.ajax("front/views/main_screenAdmins.html").always(function(main_temp) {
                var c = main_temp;
                $("#main_admin").html("");
                let d = document.createElement("div");
                d.innerHTML = c;
                $("#main_admin").append(d);
            });
            callback();
        },



        getOneStudent: function(data) {
            $.ajax("front/views/student_details_temp.html").always(function(student_temp) {
                $("#main-scool").html("");

                var c = student_temp;
                c = c.replace("{{num}}", data[0].id);
                c = c.replace("{{editid}}", data[0].id);
                c = c.replace("{{name}}", data[0].name);
                c = c.replace("{{phone}}", data[0].phone);
                c = c.replace("{{email}}", data[0].email);
                c = c.replace("{{imgsrc}}", "uploads/" + data[0].image);

                let d = document.createElement("div");
                d.innerHTML = c;
                $("#main-scool").append(d);

                courseModel.getCourseForStudent(data[0].id);

            });

        },

        //returns the couses that a student choosen is registerd to
        getinnerJoin: function(data) {
            $.ajax("front/views/course_temp.html").always(function(courseTemplate) {
                $("#main-scool .courselist").html("");
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{singleCourse}}", "singlecourseIJ");
                    c = c.replace("{{course_id}}", data[i].Course_id);
                    c = c.replace("{{descrip}}", "");
                    c = c.replace("{{imgsrc}}", "uploads/" + data[i].Course_image);
                    let d = document.createElement("div");
                    d.innerHTML = c;
                    $("#main-scool .courselist").append(d);
                }

            });
        },

        //returns the students are registerd to a choosen course
        getinnerJoinstudents: function(data) {
            $.ajax("front/views/student_temp_for_list.html").always(function(courseTemplate) {
                $("#studentlistforCourse").html("");

                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{singleStudent}}", "StudentinCourse" + i);
                    c = c.replace("{{studentid}}", data[i].Student_id);
                    c = c.replace("{{name}}", data[i].Student_name);
                    c = c.replace("{{phone}}", data[i].Student_phone);
                    c = c.replace("{{imgsrc}}", "uploads/" + data[i].Student_image);
                    c = c.replace("{{sum}}", data.length);

                    let d = document.createElement("div");
                    d.innerHTML = c;
                    $("#studentlistforCourse").append(d);
                }
            });

        },


        // founction to load the main student update/new window
        updateStudentTemp: function(calltype, studen_id) { //data
            var details = {
                name: $("#student_name").html(),
                phone: $("#student_phone").html(),
                mail: $("#student_email").html(),
            };

            let studentCourses = []; //gets the student courses list DOM
            $(".courselist span h6").each(function(i, sp) {
                studentCourses.push($(sp).attr("id"));
            });

            tempNameFunction(details, studentCourses, studen_id, calltype);
        },


        // founction to load the main student update/new window
        updateAdmins: function(adminId, permission) {

            var details = {
                name: $("#admin_name" + adminId).html().slice(0, -2),
                phone: $("#admin_phone" + adminId).html(),
                mail: $("#admin_mail" + adminId).html(),
                role: $("#admin_role" + adminId).html().trim()
            };

            temtAdminFunction(details, adminId, permission);
        },



        //  create cuorses checkbox list
        addCheckbox: function(studentCourses) {
            if (!studentCourses) {
                studentCourses = false;
            }


            var CoursesArray = []; //gets all courses list from DOM
            $(".allCourses span h6").each(function(i, sp) {
                CoursesArray.push($(sp).attr("id"));
            });

            var Coursesid = []; //gets all courses list from DOM
            $(".allCourses button").each(function(i, sp) {
                Coursesid.push($(sp).data("courseid"));
            });

            for (var i = 0; i < CoursesArray.length; i++) {
                var checkbox = document.createElement("input");
                checkbox.type = "checkbox";
                checkbox.name = "courses";
                checkbox.value = CoursesArray[i];
                checkbox.id = Coursesid[i];

                if (studentCourses !== false) {
                    for (var x = 0; x < studentCourses.length; x++) {
                        if (Coursesid[i] == studentCourses[x]) {
                            checkbox.checked = true;
                        }
                    }
                }

                var label = document.createElement("label")
                label.htmlFor = i + 1;
                label.appendChild(document.createTextNode(CoursesArray[i] + " course"));
                let br = document.createElement("br");

                $("#course-checkbox").append(checkbox);
                $("#course-checkbox").append(label);
                $("#course-checkbox").append(br);
            }
        },


        //shoes course detaills
        getOneCourse: function(data, permission) {

            $.ajax("front/views/course_details_temp.html").always(function(courseTemp) {
                $("#main-scool").html("");
                var c = courseTemp;
                c = c.replace("{{editid}}", data[0].id);
                c = c.replace("{{name}}", data[0].name);
                c = c.replace("{{details}}", data[0].description);
                c = c.replace("{{imgsrc}}", "uploads/" + data[0].image);
                let d = document.createElement("div");
                d.innerHTML = c;
                $("#main-scool").append(d);
                if (permission === "sales") {
                    $("#editCourse").hide();
                }
                studentModel.getStudentForCourse(data[0].id);
            });

        },


        updateCourses: function(courseId) {
            $("input:checkbox[name='courses ']:checked").each(function() { //get courses checked
                courses.push($(this).attr("id"));
            });
            var details = {
                name: $("#course_name").html(),
                description: $("#course_details").html(),
                studentsSum: $("[id^=StudentinCourse]").length
            };

            couseUpdateTemp(details, courseId);
        },


        newCourseScreen: function() {
            newCoursetemp();
        },

        newStudentScreen: function() {
            newStudenttemp();

        },

        newAdminScreen: function(permission) {
            newAdmintemp(permission);
        },

        // sends file to server befor croping
        uploadFile: function(image) {
            let sendForCheck = new Validation();
            sendForCheck.validateInput(image, "image");
            if (sendForCheck) {
                let formData = new FormData();
                formData.append("file", image);
                let myAjax = new SendAJAX();
                myAjax.sendFileToServer(formData, function(resulet) {
                    if (resulet[0] === true) {
                        $("#blah").attr("src", "uploads/" + resulet[1]);
                        $("#blah").data("name", resulet[1]);
                        let imageTop = $("#blah").position().top;
                        let imageLeft = $("#blah").position().left;
                        $("#crop_tool").css("top", imageTop).css("left", imageLeft);
                        $("#crop_tool").resizable({ containmet: "parent" });
                        $("#crop_tool").draggable({ containmet: "parent" });
                    } else {
                        alert(resulet);
                    }

                });
            } else {
                alert(sendForCheck);
            }

        },

        getImageCropSize: function(callback) {
            let image_name = $("#blah").data("name");
            let orgImageTop = $("#blah").position().top;
            let orgImageLeft = $("#blah").position().left;
            let newImageTop = $("#crop_tool").position().top;
            let newImageLeft = $("#crop_tool").position().left;

            orgImageTop.toFixed();
            orgImageLeft.toFixed();
            newImageTop.toFixed();
            newImageLeft.toFixed();

            let cropStartY = newImageLeft - orgImageLeft;
            let cropStartX = newImageTop - orgImageTop;

            let newImageWidth = parseInt($("#crop_tool").width());
            let newImageHeight = parseInt($("#crop_tool").height());

            newImageWidth.toFixed();
            newImageHeight.toFixed();

            let cropSizes = {
                start_x: cropStartY * 3,
                start_y: cropStartX * 3,
                width: newImageWidth * 3,
                heigth: newImageHeight * 3,
                name: image_name
            }
            callback(cropSizes);
        }




    }
}