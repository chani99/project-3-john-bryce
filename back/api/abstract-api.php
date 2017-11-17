<?php
    abstract class Api {
        abstract function Create($params);
        abstract function Read($params, $mypermission);
        abstract function Update($params);
        abstract function Delete($params);





                public function gateway($method, $params, $mypermission) {
                    switch ($method) {
                        case "POST":
                            return $this->Create($params);
                        case "GET":
                            return  $this->Read($params, $mypermission);
                        case "PUT":
                            return $this->Update($params);
                        case "DELETE":
                            return $this->Delete($params);
                    }
        
        }
    }
?>