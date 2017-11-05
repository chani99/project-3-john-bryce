// "use static";

// Gets results from ajax and sends it to the right method
function callback(response_text, calltype) {

    let respnse = JSON.parse(response_text);
    let column1;
    let column2;
    let column3;


    switch (calltype) {

        case 'create':
            wasDone(respnse, 'created');
            break;

        case 'getall':
            column1 = new column1_director();
            column1.allcourses(respnse);
            break;

        case 'getallStudents':
            column2 = new column2_director();
            column2.allstudends(respnse);
            break;

        case 'get_one':
            column3 = new column3_director();
            column3.get_one_student(respnse);
            break;


        case 'getcourse':
            column3 = new column3_director();
            column3.get_one_course(respnse);
            break;


        case 'getinnerJoin':
            column3 = new column3_director();
            column3.getinnerJoin(respnse);
            break;

        case 'find_id':
            idtest(respnse);
            break;

        case 'delete':
            column3 = new column3_director();
            column3.UasDone(response_text, calltype);
            break;

        case 'update':
            if (response_text != "true") {

                alert("The " + calltype + " faild, please try again");
            } else {
                alert("The " + calltype + " was successful!");
                //refresh cuorse list & student list

                $.ajax('front/views/main_screen.html').always(function(maintemp) {
                    $('#main-scool').html("");

                    var c = maintemp;
                    let d = document.createElement('div');
                    d.innerHTML = c;
                    $('#main-scool').append(d);
                });


                // let course_model = new CourseModuleController();
                // course_model.GetAllCourse(function() {
                //     let student_model = new StudentModelController();
                //     student_model.GetAllStudents();

                // });
            }

            // wasDone(respnse, 'updated');
            break;

        case 'selectlist':
            insertlist(respnse);
            break;

        case 'upload':
            wasDone(respnse, 'uploaded');
            break;

        default:
            alert('Erorr!');
    }
}




// Gets data from AJAX callback and send's it to html
function wasDone(response_text, calltype) {
    if (response_text == true) {
        $('#result').html("your request was " + calltype + " sucssesfuly.");
    } else {
        $('#result').html("error");
    }

}

// inserts the select list into the html

function insertlist(response_text) {
    $("#select_manu, #select_manufac").html(response_text);
}


// Handles the result of the check id test
function idtest(response_text) {
    var check = response_text;
    if (check != true) {
        $("#id_error").html("this id doesn't exsist!");
        $("#hide").addClass("hide");
    } else {
        $("#id_error").html("");
        $("#hide").removeClass("hide");
    }
}