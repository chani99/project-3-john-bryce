<?php 
    require_once 'controller.php';
    require_once '../models/Student_Course_Model.php';
    require_once '../data/bl.php';
    require_once '../common/validation.php';
    
    

    class S_C_Controller extends Controller {
        private $businessLogic;
        private $model;
        private $validation;        
        private $table_name = "student_course";
        private $classneame = "S_C_Controller";
        

        function __construct($param) {
            $this->businessLogic = new BL();
            $this->validation = new validation;       
            $this->model = new Student_CourseModel($param);
          
            
        }
        

        // Creates a new line in a table
        function UpdateTable() {
            $courses = $this->model->getc_id();
            for($i=0; $i<count($courses); $i++) {
            $updateValues= "c_id =  '".$courses[i]."', description = '" .$this->model->getdescription(). "', image = '". $this->model->getimage()."'";
            $update =  $this->businessLogic->update_table($this->table_name, $this->model->getId(), $updateValues);
            return $this->checkIsWasGood($update);
            }
        }
                   
                
        
        // Creates a new line in a table
        function CreateNewRow() {
            $rows = $this->model->getRows();
            $sql_data = $this->CreateRow($rows, $this->model);
            $update = $this->businessLogic->create_new_row($this->table_name, $sql_data[0], $sql_data[1],  $sql_data[2]);
            return $this->checkIsWasGood($update);
       
        }



        // Updates a line in directos table
        function ReturnSelect() {
            $List =  $this->businessLogic->SelectAllFromTable($this->table_name, $this->classneame);
            $CourseSelect="<option value='Select a Course'>Select a Course</option>";
                for ($i = 0; $i < count($List); $i++) {
                $CourseSelect .= "<option value=" . $List[$i]["id"] . ">" . $List[$i]["name"] . "</option>";
                }
        
            return $CourseSelect; 
        }
    


        // Selects all from Courses table and returns a object array
        function getAllCourses() {
            $getall = $this->businessLogic->SelectAllFromTable($this->table_name, $this->classneame);
            $allCourses = array();            
            for($i=0; $i<count($getall); $i++) {
                $c = new CourseModel($getall[$i]);
                array_push($allCourses, $c->jsonSerialize());
            }
            return $allCourses;   
        }



        // Checks if a id exists
         function getCourseById(){
                if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $check =  $this->businessLogic->Check_if_id_exists($this->table_name, $c->getId());
                return $this->checkIsWasGood($check);
                }else{
                    return false;
                }

            }




        // Deletes a line from Courses table
        function DeleteCourseById() {
                if($this->model->getc_id() != false){
                $deleted =  $this->businessLogic->DeleteRow($this->table_name, $c->getc_id());
                return $this->checkIsWasGood($deleted);
                }else{
                    return false;
                }

    
        }
        

        // Deletes a line from Courses table
        function DeleteCourseByRowName() {
            if($this->model->getc_id() != false){
            $deleted =  $this->businessLogic->DeleteRowbyRowName($this->table_name, 'c_id', $this->model->getc_id(), 's_id', $this->model->gets_id());
            return $this->checkIsWasGood($deleted);
            }else{
                return false;
            }


    }


        // Updates a line in directos table
        function UpdateById() {
                if($this->model->getId() != false || $this->model->getId() != false){
                    if($this->model->getName() != false) {
                        $updateValues= "name =  '".$this->model->getName()."', description = '" .$this->model->getdescription(). "', image = '". $this->model->getimage()."'";
                        $update =  $this->businessLogic->update_table($this->table_name, $this->model->getId(), $updateValues);
                    return $this->checkIsWasGood($update);
                }else{
                    return false;
                }
            }

        }


        

 


}



