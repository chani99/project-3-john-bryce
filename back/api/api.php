<?php
    require_once 'course-api.php';
    require_once 'student-api.php';
    require_once 'admin-api.php';
    

    $method = $_SERVER['REQUEST_METHOD']; 

    if($method==  'PUT' || $method == 'DELETE') {
        parse_str(file_get_contents("php://input"),$post_vars);
        $params = $post_vars['activitiesArray']; 
    }
    else{
    $params = $_REQUEST['activitiesArray'];
    }
    
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
            $capi = new AdminApi();
            $result = $capi->gateway($method, $params);
            echo json_encode($result);
            break;

    }

?>
