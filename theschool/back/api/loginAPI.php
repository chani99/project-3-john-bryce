<?php
     require_once '../controllers/login_controller.php';
     require_once '../common/sessionstart.php';
     
    
    $loginParams = $_REQUEST['Loginarray'];


    if (!isset($loginParams['user']) || !isset($loginParams['password'])) {
        echo "please insert user name and password";
    } else {    
        $name = $loginParams['user'];
        $pass = $loginParams['password'];
        $login = new LoginController();
        $CheckUser = $login->checkuser($name, $pass);
        if($CheckUser == false) {
            echo json_encode("Username or password is incorrect.");
            $_SESSION['loggedin'] = false;
            
        }else{
            $_SESSION['loggedin'] = true;
            $_SESSION['role'] = $CheckUser->getpermission();
            echo json_encode($CheckUser);

        }
        
    }
    


?>
