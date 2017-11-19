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
        function Create($params, $mypermission) {
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
                    return [$this->controller->getAllAdmins($params), $mypermission];
                     
                break;
                
                case 'manager':
                    return [$this->controller->getAdminsExceptOwner($params), $mypermission];
                break;
                
                case 'sales':
                return 'No permission!';
                break;
                }
            }
        } 


        // Update a Admins
        function Update($params, $mypermission) {
            $Admins =$this->controller->UpdateById($params, $mypermission);
            return $Admins;
            }

            
        //  Delete 1 Admins   
         function Delete($param, $mypermission) {
            $Admins = $this->controller->DeleteAdminById($param, $mypermission);
            return $Admins;
            
        }

    }
?>
