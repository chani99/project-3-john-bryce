<?php
    //namespace Models;
    require_once 'model.php';
    

    class User implements JsonSerializable {
        private $userId;
        private $userName;
        // private $userPassword;
        private $permission;
        private $image;
        
 
        function __construct($dataArray) 
        {
            $this->userId = $dataArray[0]['id'];
            $this->userName = $dataArray[0]['name'];
            // $this->userPassword = $dataArray[0]['password'];
            switch($dataArray[0]['role_id']){
                case '5': $this->permission = 'owner'; break;
                case '6': $this->permission = 'manager'; break;
                case '7': $this->permission = 'sales'; break;
            }
            $this->image = $dataArray[0]['image'];
            
        }

        public function getUsername() {
            return $this->userName;
        }
        public function getpermission() {
            return $this->permission;
        }
        public function setUserPassword($password) {
            $pw = new PasswordHandler();
            $this->userPassword = $pw->getHash($password);
        }

        public function jsonSerialize() {
            $array = [
                'userId' => $this->userId,
                'userName' => $this->userName,
                // 'userPassword' => $this->userPassword,
                'permission' =>  $this->permission,
                'image' => $this->image,
                'status' => true
            ];
            return $array;
        }
    }


?>