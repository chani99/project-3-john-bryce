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


                    c = c.replace("{{num}}", "course" + data[i].Course_id);
                    c = c.replace("{{courseid}}", data[i].Course_id);
                    c = c.replace("{{name}}", data[i].Course_name);
                    c = c.replace("{{descrip}}", data[i].Course_name);
                    c = c.replace("{{imgsrc}}", "back/images/" + data[i].Course_image);
                    c = c.replace("{{course_id}}", data[i].Course_name);

                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#course').append(d);

                    let num = "course" + data[i].Course_id;

                    $(document).on('click', '#' + num, function() {
                        let course_model = new CourseModuleController();
                        course_model.getOneCourse($(this).data('courseid'), $(this).attr('id'));
                    });

                }
            });
        }
    }
}