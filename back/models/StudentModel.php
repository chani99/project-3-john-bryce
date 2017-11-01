<?php
    require_once 'model.php';
    
    
    class StudentModel extends Model implements JsonSerializable {
        private $id;
        private $name;
        private $phone;
        private $email;        
        private $image;

        function __construct($params) {
            $this->tableName ='course';
            $this->tableRows = array("name", "phone", "email","image");
            if (array_key_exists("id", $params)) $this->id = $params["id"];  
            if (array_key_exists("name", $params)) $this->name = $params["name"];
            if (array_key_exists("phone", $params)) $this->phone = $params["phone"];
            if (array_key_exists("email", $params)) $this->email = $params["email"];
            if (array_key_exists("image", $params)) $this->image = $params["image"];
         }



        public function getname(){
            return $this->name;
        }
    

        public function getid(){
            return $this->id;
        }

        public function phone(){
            return $this->phone;
        }

        public function email(){
            return $this->email;
        }

        public function getimage(){
            return $this->image;
        }


        

        public function jsonSerialize() {
            return [
                "Student_id" => $this->id,
                "Student_name" => $this->name,
                "Student_phone" => $this->phone,
                "Student_email" => $this->email,
                "Student_image" => $this->image
                
            ];
        }
    }

?>
