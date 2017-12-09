<?php 
    require_once 'controller.php';
    require_once '../models/AdminModel.php';
    require_once '../data/bl.php';
    require_once '../common/validation.php';
    require_once '../common/PasswordHandler.php';
    
    

    class AdminController extends Controller {
        private $businessLogic;
        private $model;
        private $validation;        
        private $table_name = "administratior";
        // private $classneame = "AdminController";
        

        function __construct($params) {
            $this->businessLogic = new BL();
            $this->validation = new validation;
            if (array_key_exists("password", $params)){
                $password = new PasswordHandler();
                $params["password"] = $password->getHash($params["password"]);
            }
            $this->model = new AdminModel($params);
            
        }


        // Creates a new line in a table
        function CreateAdmins($param, $mypermission) {
            if($mypermission != 7) {
                if($this->model->getrole_id() != 5) {
                        $checkIfexists = $this->getAdminByNameAndPassword();
                        if (count($checkIfexists) > 0){
                            return 'This user already exists on the system';
                        } else {
                            
                        $rows = $this->model->getRows();
                        $sql_data = $this->CreateRow($rows, $this->model);
                        $update = $this->businessLogic->create_new_row($this->table_name, $sql_data[0], $sql_data[1],  $sql_data[2]);
                        return $this->checkIsWasGood($update);
                        }
                } else {
                    return "Unable to add owner";
                }
            return "sales coldn't create administrators";
            
        }
       
        }





        // // Selects all from Courses table and returns a object array
        function getAllAdmins() {
            $allAdmins = array();            
            
            $selected_tables = "administratior.id, administratior.name, administratior.phone, administratior.email, administratior.role_id, administratior.image, role.role";
            $table2 = 'role';
            $Column_equal_to = 'administratior.role_id = role.id';

            $getall = $this->businessLogic->innerJoin($selected_tables, $this->table_name, $table2, $Column_equal_to);
            for($i=0; $i<count($getall); $i++) {
                $aModel = new AdminModel($getall[$i]);
                array_push($allAdmins, $aModel->jsonSerialize());
            }
            return $allAdmins;   
        }
        

        function getAdminsExceptOwner() {
            $allAdmins = array();            
            
            $selected_tables = "administratior.id, administratior.name, administratior.phone, administratior.email, administratior.role_id, administratior.image, role.role";
            $table2 = 'role';
            $Column_equal_to = 'administratior.role_id = role.id';
            $condition = ' administratior.role_id != 5';

            $getall = $this->businessLogic->innerJoinExcept($selected_tables, $this->table_name, $table2, $Column_equal_to, $condition);
            for($i=0; $i<count($getall); $i++) {
                $aModel = new AdminModel($getall[$i]);
                array_push($allAdmins, $aModel->jsonSerialize());
            }
            return $allAdmins;   
        }
        
        
        // Checks if a already have this name and phone
        function getAdminByNameAndpassword(){
            $admin =  $this->businessLogic->getAdminByNameAndpassword($this->table_name, $this->model->getName(), $this->model->getpassword());
            return $admin;
        }



        // Checks if a id exists
         function getAdminById(){
                if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $admin =  $this->businessLogic->getLineById($this->table_name, $this->model->getId());
                return $admin;
                }else{
                    return false;
                }

            }






        // Deletes a line from Courses table
        function DeleteAdminById($mypermission) {
            $oldrole = $this->getAdminById();            
            if ($oldrole[0]['role_id'] == 5) {
                return "can't delete the owner";
            }else{

                if($this->model->getId() != false && $mypermission != 'sales'){
                    if($mypermission == 'manager'){
                        $oldrole = $this->getAdminById();
                        if ($oldrole[0]['role_id'] != 7) {
                            return 'No permission';
                        } else {
                            $deleted =  $this->dataBade->DeleteRow($this->table_name, $this->model->getId());
                            return $this->checkIsWasGood($deleted);
                        }
                    }
                $deleted =  $this->businessLogic->DeleteRow($this->table_name, $this->model->getId());
                return $this->checkIsWasGood($deleted);
                }else{
                    return false;
                }
            }

    
        }



        function selectLastId() {
            $newId = $this->businessLogic->selectlastRow($this->table_name);
            return $newId;
        }

     

        // Updates a line in directos table
        function UpdateById($mypermission){ 
            if($this->model->getId()){
                $oldrole = $this->getAdminById();                
                if($mypermission !== 'sales'){
                    if($mypermission === 'manager'){
                        if ($oldrole[0]['role_id'] === 5 || $this->model->getrole_id() === "5") {
                            return 'No permission';
                        } else { 
                            if($this->model->getpassword() !== ""){
                                    if ($this->model->getpassword() && $oldrole[0]['role_id'] != 7) {
                                        return 'No permission to update password';    
                                        
                                    } else {
                                        return $this->sendUpdate();    
                                    }

                            } else {
                                return $this->sendUpdate();
                            }
                        }
                    } else {

                         if($oldrole[0]['role_id'] === 5 && $this->model->getrole_id() !== "5")
                         {       
                                return 'No permission';
                         } else {
                                return $this->sendUpdate();  
                            }                      
                    }
                  

                }  else {
                    return 'No permission';
                    }
    
            } else {
                return 'Missing Values';
            }

        
        }

        
        function sendUpdate(){
            $updateValues ="";
            if($this->model->getname()){$updateValues .= ", name = '" .$this->model->getName();}                  
            if($this->model->getphone()){$updateValues .= "', phone = '" .$this->model->getphone();}
            if($this->model->getemail()){$updateValues .=  "', email = '" .$this->model->getemail();}
            if($this->model->getimage()){$updateValues .= "', image = '". $this->model->getimage();}
            if($this->model->getpassword()){$updateValues .= "', password = '". $this->model->getpassword();}
            if($this->model->getrole_id()){$updateValues .= "', role_id = '". $this->model->getrole_id();}
            $updateValues .="'";
            $updateValues = substr($updateValues, 2);
            $update =  $this->businessLogic->update_table($this->table_name, $this->model->getId(), $updateValues);

            return $this->checkIsWasGood($update);
        }





}