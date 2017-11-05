<?php
    require_once 'abstract-api.php';
    require_once 'api.php';
    require_once '../controllers/CourseController.php';

    class CourseApi extends Api{
        private $controller;
        

        function __construct($param) {
            $this->controller = new CourseController($param);
        }


                // Create a new result
                function Create($params) {
                    return $this->controller->CreateNewRow($params);
                }
                
        
                 // Get all results or check if a id exists
                function Read($params) {
        
                    if (array_key_exists("id", $params)) {
                       if (array_key_exists("inner", $params)) {
                            $result = $this->controller->getCoursesInnerJoin($params);
                            return $result;
                            
                        }else{
                            
                        $result = $this->controller->getCourseById($params);
                        return $result;
                        }
                    }
        
                    else {
                        return $this->controller->getAllCourses();
                    }
                } 
        
        
                // Update a result
                function Update($params) {
                    $result =$this->controller->UpdateById($params);
                    return $result;
                    }
        
                    
                //  Delete 1 result   
                 function Delete($params) {
                    $result = $this->controller->DeleteById($params);
                    return $result;
                    
                }

    }
?>
