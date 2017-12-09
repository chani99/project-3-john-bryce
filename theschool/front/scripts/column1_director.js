"use strict";

var column1_director = function() {
    // let column1ApiMethod = "Student";
    // let ApiUrl = "back/api/api.php";
    var column1_data = {};


    return {

        allcourses: function(data, permission) {
            $("#course").html("");
            $("#Csum").html(data.length);
            $.ajax("front/views/course_temp.html").always(function(courseTemplate) {
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;

                    c = c.replace("{{courseid}}", data[i].Course_id);
                    c = c.replace("{{singleCourse}}", "singleCourse");
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{descrip}}", "");
                    c = c.replace("{{imgsrc}}", "uploads/" + data[i].Course_image);
                    c = c.replace("{{course_id}}", data[i].Course_name);
                    c = c.replace("{{permission}}", permission);

                    let d = document.createElement("div");
                    d.innerHTML = c;
                    $("#course").append(d);

                }
            });
        },

        allAdmins: function(data) {
            $("#Administratos").html("");
            $("#Asum").html(data[0].length);
            $.ajax("front/views/admin_temp.html").always(function(courseTemplate) {
                for (let i = 0; i < data[0].length; i++) {
                    var c = courseTemplate;

                    c = c.replace("{{adminid}}", data[0][i].Admin_id);
                    c = c.replace("{{singleAdmin}}", "singleAdmin");
                    c = c.replace("{{name}}", data[0][i].Admin_name);
                    c = c.replace("{{role}}", data[0][i].Admin_role);
                    c = c.replace("{{imgsrc}}", "uploads/" + data[0][i].Admin_image);
                    c = c.replace("{{email}}", data[0][i].Admin_email);
                    c = c.replace("{{phone}}", data[0][i].Admin_phone);
                    c = c.replace("{{adnum}}", data[0][i].Admin_id);
                    c = c.replace("{{adnum2}}", data[0][i].Admin_id);
                    c = c.replace("{{adnum3}}", data[0][i].Admin_id);
                    c = c.replace("{{adnum4}}", data[0][i].Admin_id);
                    c = c.replace("{{permission}}", data[1]);



                    let d = document.createElement("div");
                    d.innerHTML = c;
                    $("#Administratos").append(d);

                }
            });
        }
    }
}