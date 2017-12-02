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
            $prm = $params;
            return $this->controller->CreateAdmins($mypermission);
        }
        

         // Get all Adminss or check if a id exists
        function Read($params, $mypermission) {

            if (array_key_exists("id", $params)) {
                $Admins = $controller->getById();
                return $Admins;
            }

            else {
                switch ($mypermission){
                case 'owner':
                    return [$this->controller->getAllAdmins(), $mypermission];
                     
                break;
                
                case 'manager':
                    return [$this->controller->getAdminsExceptOwner(), $mypermission];
                break;
                
                case 'sales':
                return 'No permission!';
                break;
                }
            }
        } 


        // Update a Admins
        function Update($params, $mypermission) {
            $prm = $params;            
            $Admins =$this->controller->UpdateById($mypermission);
            return $Admins;
            }

            
        //  Delete 1 Admins   
         function Delete($params, $mypermission) {
            $prm = $params;            
            $Admins = $this->controller->DeleteAdminById($mypermission);
            return $Admins;
            
        }

    }
?>
