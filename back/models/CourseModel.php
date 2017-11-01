<?php
    require_once 'model.php';
    
    
    class CourseModel extends Model implements JsonSerializable {
        private $id;
        private $name;
        private $description;
        private $image;

        function __construct($params) {
            $this->tableName ='course';
            $this->tableRows = array("name", "description", "image");
            if (array_key_exists("id", $params)) $this->id = $params["id"];  
            if (array_key_exists("name", $params)) $this->name = $params["name"];
            if (array_key_exists("description", $params)) $this->description = $params["description"];
            if (array_key_exists("image", $params)) $this->image = $params["image"];
         }



        public function getname(){
            return $this->name;
        }
    

        public function getid(){
            return $this->id;
        }

        public function getdescription(){
            return $this->description;
        }

        public function getimage(){
            return $this->image;
        }


        

        public function jsonSerialize() {
            return [
                "Course_id" => $this->id,
                "Course_name" => $this->name,
                "Course_description" => $this->description,
                "Course_image" => $this->image
                            
            ];
        }
    }

?>
