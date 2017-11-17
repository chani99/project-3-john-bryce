<?php
    require_once 'course-api.php';
    require_once 'student-api.php';
    require_once 'admin-api.php';
    require_once '../common/sessionstart.php';
    require_once '../common/validation.php';
    
    

    $method = $_SERVER['REQUEST_METHOD']; 

    if($method==  'PUT' || $method == 'DELETE') {
        parse_str(file_get_contents("php://input"),$post_vars);
        $params = $post_vars['activitiesArray']; 
    }
    else{
    $params = $_REQUEST['activitiesArray'];
    }

    // check if logged in
    if ( $_SESSION['loggedin'] == true) {
        $mypermission = $_SESSION['role'];
        

    //basic input validation
    $validation = new validation;
    $validate_result = $validation->validationDirector($params);
    if ($validate_result == "") {

        switch ($params['ctrl']) {
            case 'Course':
                $capi = new CourseApi($params);
                $result  = $capi->gateway($method, $params, "CourseController");
                echo json_encode($result);
                break;

                case 'Student':
                $capi = new StudentApi($params);
                $result = $capi->gateway($method, $params);
                echo json_encode($result);
                break;

                case 'Admin':
                $capi = new AdminApi($params);
                $result = $capi->gateway($method, $params, $mypermission);
                echo json_encode($result);
                break;
        }

    }else{
        echo json_encode($validate_result);
    }
} else {
    echo "please login";
}
    

?>
