<?php 
    require_once 'controller.php';
    require_once '../models/StudentModel.php';
    require_once '../data/bl.php';
    require_once '../common/validation.php';
    
    

    class StudentController extends Controller {
        private $businessLogic;
        private $model;
        private $validation;        
        private $table_name = "student";
        private $classneame = "StudentController";
        

        function __construct($param) {
            $this->businessLogic = new BL();
            $this->validation = new validation;
            $this->model = new StudentModel($param);
      
            
        }
        

        // Creates a new line in a table
        function CreateStudents() {
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
        

                // get the courses for a student by id
                function getStudentsInnerJoin($param) {
                    $innerJoinstudents = array();
                    $selected_rows = "student.id, student.name, student.phone, student.image";
                    $table2 = 'course';
                    $table3 = 'student_course';
                    $Column_equal_to = 'student.id = student_course.s_id';
                    $Column_equal_to2 = 'course.id = student_course.c_id';
                    $where = 'course.id = ' . $param["id"];
                    $getall = $this->businessLogic->innerJoin3table($selected_rows, $this->table_name, $table2, $table3, $Column_equal_to, $Column_equal_to2, $where);
                    for($i=0; $i<count($getall); $i++) {
                        $sModel = new StudentModel($getall[$i]);
                        array_push($innerJoinstudents, $sModel->jsonSerialize());
                    }
                    return $innerJoinstudents;   
                }
        
    

        function getById() {
            if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                
                $OneStudent =  $this->businessLogic->getLineById($this->table_name, $this->model->getId());
                return  $OneStudent;
            }
        }


        // Selects all from Courses table and returns a object array
        function getAllStudents(){
            $getall = $this->businessLogic->SelectAllFromTable($this->table_name, $this->classneame);
            $allStudents = array();            
            for($i=0; $i<count($getall); $i++) {
                $c = new StudentModel($getall[$i]);
                array_push($allStudents, $c->jsonSerialize());
            }
            return $allStudents;   
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
                if($this->model->getId() != false){
                $deleted =  $this->businessLogic->DeleteRow($this->table_name, $this->model->getId());
                return $this->checkIsWasGood($deleted);
                }else{
                    return false;
                }

    
        }

        function selectLastId() {
            $new_id = $this->businessLogic->selectlastRow($this->table_name);
            return $new_id;
        }


        // Updates a line in directos table
        function UpdateById() {
                if($this->model->getId() != false || $this->model->getId() != false){
                            if($this->model->getimage() != "" ) {
                                $updateValues= "name =  '".$this->model->getName()."', phone = '" .$this->model->getphone(). "', email = '" .$this->model->getemail(). "', image = '". $this->model->getimage()."'";
                            }else{
                                $updateValues= "name =  '".$this->model->getName()."', phone = '" .$this->model->getphone(). "', email = '" .$this->model->getemail(). "'";    
                            }
                    $update =  $this->businessLogic->update_table($this->table_name, $this->model->getId(), $updateValues);
                    return $this->checkIsWasGood($update);
                }else{
                    return false;
                }
        }

        







}