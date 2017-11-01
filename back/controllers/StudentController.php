<?php 
    require_once 'controller.php';
    require_once '../models/StudentModel.php';
    require_once '../data/bl.php';
    require_once '../common/validation.php';
    
    

    class StudentController extends Controller {
        private $db;
        private $model;
        private $validation;        
        private $table_name = "student";
        private $classneame = "StudentController";
        

        function __construct($param) {
            $this->db = new BL();
            $this->validation = new validation;
            // $validate_result =$this->validation->validations($param);
            // if ($validate_result == true) {
            $this->model = new StudentModel($param);
            // }
            // else (
            //     return $validate_result;
            // )
            
        }
        

        // Creates a new line in a table
        function CreateNewRow($param) {
            $rows = $this->model->getRows();
            $sql_data = $this->CreateRow($rows, $this->model);
            $update = $this->db->create_new_row($this->table_name, $sql_data[0], $sql_data[1],  $sql_data[2]);
            return $this->checkIsWasGood($update);
       
        }



        // Updates a line in directos table
        function ReturnSelect() {
            $List =  $this->db->SelectAllFromTable($this->table_name, $this->classneame);
            $CourseSelect="<option value='Select a Course'>Select a Course</option>";
                for ($i = 0; $i < count($List); $i++) {
                $CourseSelect .= "<option value=" . $List[$i]["id"] . ">" . $List[$i]["name"] . "</option>";
                }
        
            return $CourseSelect; 
        }
        


        function getById($id) {
            if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                
                $OneStudent =  $this->db->getLineById($this->table_name, $this->model->getId());
                return  $OneStudent;
            }
        }


        // Selects all from Courses table and returns a object array
        function getAllStudents(){
            $getall = $this->db->SelectAllFromTable($this->table_name, $this->classneame);
            $allStudents = array();            
            for($i=0; $i<count($getall); $i++) {
                $c = new StudentModel($getall[$i]);
                array_push($allStudents, $c->jsonSerialize());
            }
            return $allStudents;   
        }



        // SELECT course.name, course.image
        // FROM course
        // INNER JOIN student_course ON course.id = student_course.c_id
        // INNER JOIN student ON student.id = student_course.s_id
        

        // Selects all from directors table and returns a object array


        


        // Checks if a id exists
         function getCourseById($param){
                if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $check =  $this->db->Check_if_id_exists($this->table_name, $c->getId());
                return $this->checkIsWasGood($check);
                }else{
                    return false;
                }

            }




        // Deletes a line from Courses table
        function DeleteCourseById($param) {
                if($this->model->getId() != false){
                $deleted =  $this->db->DeleteRow($this->table_name, $c->getId());
                return $this->checkIsWasGood($deleted);
                }else{
                    return false;
                }

    
        }



        // Updates a line in directos table
        function UpdateById($param) {
                if($this->model->getId() != false || $this->model->getId() != false){
                    if($this->model->getName() != false) {
                        $updateValues= "name =  '".$this->model->getName()."', description = '" .$this->model->getdescription(). "', image = '". $this->model->getimage()."'";
                        $update =  $this->db->update_table($this->table_name, $this->model->getId(), $updateValues);
                    return $this->checkIsWasGood($update);
                }else{
                    return false;
                }
            }

        }


        




}