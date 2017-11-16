<?php
    //namespace Models;
    require_once 'model.php';
    

    class User implements JsonSerializable {
        private $userId;
        private $userName;
        private $userPassword;
        private $permission;
        
 
        function __construct($dataArray) 
        {
            $this->userId = $dataArray[0]['id'];
            $this->userName = $dataArray[0]['name'];
            $this->userPassword = $dataArray[0]['password'];
            $this->permission = $dataArray[0]['role_id'];
        }

        public function getUsername() {
            return $this->userName;
        }

        public function setUserPassword($password) {
            $pw = new PasswordHandler();
            $this->userPassword = $pw->getHash($password);
        }

        public function jsonSerialize() {
            $array = [
                'userId' => $this->userId,
                'userName' => $this->userName,
                'userPassword' => $this->userPassword,
                'permission' =>  $this->permission
            ];
            return $array;
        }
    }


?>