"use strict";

var column1_director = function() {
    // let column1ApiMethod = 'Student';
    // let ApiUrl = "back/api/api.php";
    var column1_data = {};


    return {

        allcourses: function(data) {
            $('#course').html("");
            $('#Csum').html(data.length);
            $.ajax('front/views/course_temp.html').always(function(courseTemplate) {
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;

                    c = c.replace("{{courseid}}", data[i].Course_id);
                    c = c.replace("{{singleCourse}}", 'singleCourse');
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{descrip}}", data[i].Course_name);
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
                    c = c.replace("{{course_id}}", data[i].Course_name);

                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#course').append(d);

                }
            });
        },

        allAdmins: function(data) {
            $('#Administratos').html("");
            $('#Asum').html(data.length);
            $.ajax('front/views/admin_temp.html').always(function(courseTemplate) {
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;

                    c = c.replace("{{adminid}}", data[i].Admin_id);
                    c = c.replace("{{singleAdmin}}", 'singleAdmin');
                    c = c.replace("{{name}}", data[i].Admin_name);
                    c = c.replace("{{role}}", data[i].Admin_role);
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Admin_image);
                    c = c.replace("{{email}}", data[i].Admin_email);
                    c = c.replace("{{phone}}", data[i].Admin_phone);
                    c = c.replace("{{adnum}}", data[i].Admin_id);
                    c = c.replace("{{adnum2}}", data[i].Admin_id);
                    c = c.replace("{{adnum3}}", data[i].Admin_id);
                    c = c.replace("{{adnum4}}", data[i].Admin_id);


                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#Administratos').append(d);

                }
            });
        }
    }
}