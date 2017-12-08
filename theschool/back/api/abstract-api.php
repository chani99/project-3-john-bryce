<?php
    abstract class Api {
        abstract function Create($params, $mypermission);
        abstract function Read($params, $mypermission);
        abstract function Update($params, $mypermission);
        abstract function Delete($params, $mypermission);





                public function gateway($method, $params, $mypermission) {
                    switch ($method) {
                        case "POST":
                            return $this->Create($params, $mypermission);
                        case "GET":
                            return  $this->Read($params, $mypermission);
                        case "PUT":
                            return $this->Update($params, $mypermission);
                        case "DELETE":
                            return $this->Delete($params, $mypermission);
                    }
        
        }
    }
?>