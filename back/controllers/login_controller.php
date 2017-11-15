<?php
// namespace Api;
require_once '../models/User.php';
require_once '../data/bl.php';
require_once '../common/validation.php';


class LoginController {

    private $controller;
    

    // function __construct($params) {
    //     $this->controller = new AdminController($params);
    // }


    public function checkuser($name, $password) {
        $pw = new PasswordHandler();
        $HashPassword = $pw->getHash($password);
        $User = $this->getUserByNameAndPassword($name, $HashPassword);
        if (count($User) == 1){
            $usr = new User($User);
        $_SESSION['user'] = $usr;
        $_SESSION['user']->getUsername();

    return json_encode($usr, JSON_PRETTY_PRINT);     
        } else {
            return false;
        }
 
    }

    
    function getUserByNameAndPassword($name, $password) {
            $OneAdmin =  $this->db->getUser('administratior', $name, $password);
            return  $OneStudent;
        }
    
}