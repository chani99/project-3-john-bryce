<?php
     require_once '../controllers/login_controller.php';
     
     session_start();

    $loginParams = $_REQUEST['activitiesArray'];


    if (!isset($loginParams['user']) || !isset($loginParams['password'])) {
        echo "please insert user name and password";
    } else {    
        $name = $loginParams['user'];
        $pass = $loginParams['password'];
        $login = new LoginController();
        $CheckUser = $login->checkuser($name, $pass);
        if($CheckUser == false) {
            echo "user name or password are not correct.";
            $_SESSION['loggedin'] = false;
            
        }else{
            $_SESSION['loggedin'] = true;
            echo $CheckUser;

        }
        
    }
    


?>
