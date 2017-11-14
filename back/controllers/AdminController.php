<?php 
    require_once 'controller.php';
    require_once '../models/AdminModel.php';
    require_once '../data/bl.php';
    require_once '../common/validation.php';
    
    

    class AdminController extends Controller {
        private $db;
        private $model;
        private $validation;        
        private $table_name = "administratior";
        private $classneame = "AdminController";
        

        function __construct($params) {
            $this->db = new BL();
            $this->validation = new validation;
            if (array_key_exists("password", $params)) $params["password"] = md5($params["password"]);
            $this->model = new AdminModel($params);

        }

        // Creates a new line in a table
        function CreateAdmins($param) {
            $rows = $this->model->getRows();
            $sql_data = $this->CreateRow($rows, $this->model);
            $update = $this->db->create_new_row($this->table_name, $sql_data[0], $sql_data[1],  $sql_data[2]);
            return $this->checkIsWasGood($update);
       
        }


        // Updates a line in directos table
        // function ReturnSelect() {
        //     $List =  $this->db->SelectAllFromTable($this->table_name, $this->classneame);
        //     $CourseSelect="<option value='Select a Course'>Select a Course</option>";
        //         for ($i = 0; $i < count($List); $i++) {
        //         $CourseSelect .= "<option value=" . $List[$i]["id"] . ">" . $List[$i]["name"] . "</option>";
        //         }
        
        //     return $CourseSelect; 
        // }
        

                // get the courses for a student by id
                function getRoleInnerJoin($param) {
                            // to do
                    return $innerJoinRole;   
                }
        
                

        function getById($id) {
            if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $OneAdmin =  $this->db->getLineById($this->table_name, $this->model->getId());
                return  $OneStudent;
            }
        }


        function getRoleByPassword($passwoed) {
//password to do
                return  $OneStudent;
            
        }


        // Selects all from Courses table and returns a object array
        function getAllAdmins(){
            $getall = $this->db->SelectAllFromTable($this->table_name, $this->classneame);
            $allAdmins = array();            
            for($i=0; $i<count($getall); $i++) {
                $c = new AdminModel($getall[$i]);
                array_push($allAdmins, $c->jsonSerialize());
            }
            return $allAdmins;   
        }



        // SELECT course.name, course.image
        // FROM course
        // INNER JOIN student_course ON course.id = student_course.c_id
        // INNER JOIN student ON student.id = student_course.s_id
        

        // Selects all from directors table and returns a object array


        


        // Checks if a id exists
         function getAdminById($param){
                if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $check =  $this->db->Check_if_id_exists($this->table_name, $c->getId());
                return $this->checkIsWasGood($check);
                }else{
                    return false;
                }

            }




        // Deletes a line from Courses table
        function DeleteAdminById($param) {
                if($this->model->getId() != false){
                $deleted =  $this->db->DeleteRow($this->table_name, $this->model->getId());
                return $this->checkIsWasGood($deleted);
                }else{
                    return false;
                }

    
        }

        function selectLastId() {
            $new_id = $this->db->selectlastRow($this->table_name);
            return $new_id;
        }


        // Updates a line in directos table
        function UpdateById($param) {
                if($this->model->getId() != false || $this->model->getId() != false){
                    //to do 
                    // "name", "role_id", "phone", "email", "password", "image"
                            if($this->model->getimage() != "" ) {
                                $updateValues= "name =  '".$this->model->getName()."', phone = '" .$this->model->getphone(). "', email = '" .$this->model->getemail(). "', image = '". $this->model->getimage()."'";
                            }else{
                                $updateValues= "name =  '".$this->model->getName()."', phone = '" .$this->model->getphone(). "', email = '" .$this->model->getemail(). "'";    
                            }
                    $update =  $this->db->update_table($this->table_name, $this->model->getId(), $updateValues);
                    return $this->checkIsWasGood($update);
                }else{
                    return false;
                }
        }

        







}