<?php
// namespace Api;
require_once '../models/User.php';
require_once '../data/bl.php';
require_once '../common/validation.php';
require_once '../common/PasswordHandler.php';



class LoginController {

    private $controller;
    private $db;
    

    function __construct() {
        $this->db = new BL();
        
    }


    public function checkuser($name, $password) {
        $pw = new PasswordHandler();
        $HashPassword = $pw->getHash($password);
        $User = $this->getUserByNameAndPassword($name, $HashPassword);
        if (count($User) == 1){
            $usr = new User($User);

    return $usr;     
        } else {
            return false;
        }
 
    }

    
    function getUserByNameAndPassword($name, $password) {
            $OneAdmin =  $this->db->getUser('administratior', $name, $password);
            return  $OneAdmin;
        }
    
}