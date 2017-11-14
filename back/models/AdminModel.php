<?php
    require_once 'model.php';
    
    
    class AdminModel extends Model implements JsonSerializable {
        private $id;
        private $name;
        private $phone;
        private $email;
        private $role_id;
        private $password;
        private $image;

        function __construct($params) {
            $this->tableName ='course';
            $this->tableRows = array("name", "role_id", "phone", "email", "password", "image");
            if (array_key_exists("id", $params)) $this->id = $params["id"];  
            if (array_key_exists("name", $params)) $this->name = $params["name"];
            if (array_key_exists("role", $params)) $this->role_id = $params["role"];
            if (array_key_exists("phone", $params)) $this->phone = $params["phone"];
            if (array_key_exists("email", $params)) $this->email = $params["email"];
            if (array_key_exists("password", $params)) $this->password = $params["password"];
            if (array_key_exists("image", $params)) $this->image = $params["image"];

         }


        public function getname(){
            return $this->name;
        }
    
        public function getid(){
            return $this->id;
        }

        public function getphone(){
            return $this->phone;
        }

        public function getemail(){
            return $this->email;
        }

        public function getpassword(){
            return $this->password;
        }
        public function getrole(){
            return $this->role_id;
        }
        public function getimage(){
            return $this->image;
        }


        

        public function jsonSerialize() {
            return [
                "Admin_id" => $this->id,
                "Admin_name" => $this->name,
                "Admin_phone" => $this->phone,
                "Admin_email" => $this->email,
                "Admin_role" => $this->role_id,
                "Admin_password" => $this->password,
                "Admin_image" => $this->image
                
            ];
        }
    }

?>
