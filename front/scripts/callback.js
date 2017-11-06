// "use static";

// Gets results from ajax and sends it to the right method
function callback(response_text, calltype) {

    let respnse = JSON.parse(response_text);
    let column1;
    let column2;
    let column3;


    switch (calltype) {

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

        case 'delete':
            wasDone(respnse, calltype);
            break;

        case 'create':
            wasDone(respnse, calltype);
            break;

        case 'update':
            wasDone(respnse, calltype);
            break;

        default:
            alert('Erorr!');
    }
}




// Gets data from AJAX callback and send's it to html
function wasDone(response_text, calltype) {
    if (response_text == true) {
        alert("your request was " + calltype + " sucssesfuly.");
        let loadmain = new main_screen;
        loadmain.loadmaindcreen();

    } else {
        alert("error");
    }

}

// inserts the select list into the html

// function insertlist(response_text) {
//     $("#select_manu, #select_manufac").html(response_text);
// }


// Handles the result of the check id test
// function idtest(response_text) {
//     var check = response_text;
//     if (check != true) {
//         $("#id_error").html("this id doesn't exsist!");
//         $("#hide").addClass("hide");
//     } else {
//         $("#id_error").html("");
//         $("#hide").removeClass("hide");
//     }
// }