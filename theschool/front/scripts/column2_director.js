"use strict";

var column2_director = function() {
    // let column1ApiMethod = "Student";
    // let ApiUrl = "back/api/api.php";
    var column2_data = {};



    return {
        allstudends: function(data) {

            $("#Students").html("");

            $("#Ssum").html(data.length);

            $.ajax("front/views/student_temp.html").always(function(courseTemplate) {
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    c = c.replace("{{singleStudent}}", "singleStudent");
                    c = c.replace("{{studentid}}", data[i].Student_id);
                    c = c.replace("{{name}}", data[i].Student_name);
                    c = c.replace("{{phone}}", data[i].Student_phone);
                    c = c.replace("{{imgsrc}}", "uploads/" + data[i].Student_image);

                    let d = document.createElement("div");
                    d.innerHTML = c;
                    $("#Students").append(d);



                }

            });



        }


    }
}