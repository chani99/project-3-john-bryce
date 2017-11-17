<?php
    require_once 'abstract-api.php';
    require_once 'api.php';
    require_once '../controllers/AdminController.php';

    class AdminApi extends Api{
        private $controller;
        

        function __construct($params) {
            $this->controller = new AdminController($params);
        }


        // Create a new Admins
        function Create($params) {
            return $this->controller->CreateAdmins($params);
        }
        

         // Get all Adminss or check if a id exists
        function Read($params, $mypermission) {

            if (array_key_exists("id", $params)) {
                $Admins = $c->getById($params);
                return $Admins;
            }

            else {
                switch ($mypermission){
                case 'owner':
                    return $this->controller->getAllAdmins($params);
                break;
                
                case 'manager':
                    return $this->controller->getAdminsExceptOwner($params);
                break;
                
                case 'sales':
                return 'No permission!';
                break;
                }
            }
        } 


        // Update a Admins
        function Update($params) {
            $Admins =$this->controller->UpdateById($params);
            return $Admins;
            }

            
        //  Delete 1 Admins   
         function Delete($params) {
            $Admins = $this->controller->DeleteAdminById($params);
            return $Admins;
            
        }

    }
?>
