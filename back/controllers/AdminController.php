<?php 
    require_once 'controller.php';
    require_once '../models/AdminModel.php';
    require_once '../data/bl.php';
    require_once '../common/validation.php';
    require_once '../common/PasswordHandler.php';
    
    

    class AdminController extends Controller {
        private $db;
        private $model;
        private $validation;        
        private $table_name = "administratior";
        private $classneame = "AdminController";
        

        function __construct($params) {
            $this->db = new BL();
            $this->validation = new validation;
            if (array_key_exists("password", $params)){
                $pw = new PasswordHandler();
                $params["password"] = $pw->getHash($params["password"]);
            }
            $this->model = new AdminModel($params);
            
        }


        // Creates a new line in a table
        function CreateAdmins($param) {
            $rows = $this->model->getRows();
            $sql_data = $this->CreateRow($rows, $this->model);
            $update = $this->db->create_new_row($this->table_name, $sql_data[0], $sql_data[1],  $sql_data[2]);
            return $this->checkIsWasGood($update);
       
        }





        // // Selects all from Courses table and returns a object array
        function getAllAdmins() {
            $allAdmins = array();            
            
            $selected_tables = "administratior.id, administratior.name, administratior.phone, administratior.email, administratior.role_id, administratior.image, role.role";
            $table2 = 'role';
            $Column_equal_to = 'administratior.role_id = role.id';

            $getall = $this->db->innerJoin($selected_tables, $this->table_name, $table2, $Column_equal_to);
            for($i=0; $i<count($getall); $i++) {
                $c = new AdminModel($getall[$i]);
                array_push($allAdmins, $c->jsonSerialize());
            }
            return $allAdmins;   
        }
        

        function getAdminsExceptOwner() {
            $allAdmins = array();            
            
            $selected_tables = "administratior.id, administratior.name, administratior.phone, administratior.email, administratior.role_id, administratior.image, role.role";
            $table2 = 'role';
            $Column_equal_to = 'administratior.role_id = role.id';
            $condition = ' administratior.role_id != 5';

            $getall = $this->db->innerJoinExcept($selected_tables, $this->table_name, $table2, $Column_equal_to, $condition);
            for($i=0; $i<count($getall); $i++) {
                $c = new AdminModel($getall[$i]);
                array_push($allAdmins, $c->jsonSerialize());
            }
            return $allAdmins;   
        }
        
        


        // Checks if a id exists
         function getAdminById(){
                if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $admin =  $this->db->getLineById($this->table_name, $this->model->getId());
                return $admin;
                }else{
                    return false;
                }

            }




        // Deletes a line from Courses table
        function DeleteAdminById($param, $mypermission) {
                if($this->model->getId() != false && $mypermission != 'sales'){
                    if($mypermission == 'manager'){
                        $oldrole = $this->getAdminById();
                        if ($oldrole[0]['role_id'] != 7) {
                            return 'No permission';
                        } else {
                            $deleted =  $this->db->DeleteRow($this->table_name, $this->model->getId());
                            return $this->checkIsWasGood($deleted);
                        }
                    }
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
        function UpdateById($param, $mypermission){ 
            if($this->model->getId() != false || $this->model->getId() != false){
                if($mypermission != 'sales'){
                        if($mypermission == 'manager'){
                                $oldrole = $this->getAdminById();
                                if ($oldrole[0]['role_id'] == 5) {
                                    return 'No permission';
                                } else {
                                     return $this->sendUpdate($mypermission);
                                }
                        } else {
                         return $this->sendUpdate($mypermission);
                        }
                } else {
                return 'No permission';
                }
                
            } else {
                return 'Missing Values';
            }

        
        }

        
        function sendUpdate($mypermission){
            $updateValues ="";
            if($this->model->getname() != "" ){$updateValues .= ", name = '" .$this->model->getName();}                  
            if($this->model->getphone() != "" ){$updateValues .= "', phone = '" .$this->model->getphone();}
            if($this->model->getemail() != ""){$updateValues .=  "', email = '" .$this->model->getemail();}
            if($this->model->getimage() != ""){$updateValues .= "', image = '". $this->model->getimage();}
            if($this->model->getpassword() != ""){$updateValues .= "', password = '". $this->model->getpassword();}
            if($mypermission == 'owner'){
                if($this->model->getrole_id() != ""){$updateValues .= "', role_id = '". $this->model->getrole_id();}
            }
            $updateValues .="'";
            $updateValues = substr($updateValues, 2);
            $update =  $this->db->update_table($this->table_name, $this->model->getId(), $updateValues);

            return $this->checkIsWasGood($update);
        }





}