<?php
    require_once 'model.php';
    
    
    class Student_CourseModel extends Model implements JsonSerializable {
        private $s_id;
        private $c_id;

        function __construct($params) {
            $this->tableName ='Student_CourseModel';
            $this->tableRows = array("s_id", "c_id");
            if (array_key_exists("id", $params)) $this->s_id = $params["id"];  
            if (array_key_exists("courses", $params)) $this->c_id = $params["courses"];
         }



        public function gets_id(){
            return $this->s_id;
        }
    

        public function getc_id(){
            return $this->c_id;
        }


        

        public function jsonSerialize() {
            return [
                "Course_id" => $this->c_id,
                "Student_id" => $this->s_id,
            ];
        }
    }

?>
