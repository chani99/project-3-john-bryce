var column2_director = function() {
    // let column1ApiMethod = 'Student';
    // let ApiUrl = "back/api/api.php";
    var column2_data = {};



    return {
        allstudends: function(data) {

            $('#Students').html("");

            $('#Ssum').html(data.length);

            // ajax for STUDENT list
            $.ajax('front/views/student_temp.html').always(function(courseTemplate) {
                for (let i = 0; i < data.length; i++) {
                    var c = courseTemplate;
                    // const num = 'student' + data[i].Student_id; // elemnt id

                    c = c.replace("{{studentid}}", data[i].Student_id);
                    // c = c.replace("{{elementid}}", num);
                    c = c.replace("{{name}}", data[i].Student_name);
                    c = c.replace("{{phone}}", data[i].Student_phone);
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Student_image);

                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#Students').append(d);


// add event to student details
                    // $(document).on('click', '#' + num, function() {
                    //     let student_model = new StudentModelController();
                    //     student_model.getStudent($(this).data('studentid'), $(this).attr('id'));
                    // });



                }

            });



        }


    }
}