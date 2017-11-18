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
                    $insert = $this->controller->CreateNewRow($params);
                    $get_new_row =  $this->controller->selectLastId();
                    $new_id = $get_new_row[0]['id'];
                    return [$insert, $new_id];
        
                }
                

                function selectLastId() {
                    $new_id = $this->controller->selectlastRow($this->table_name);
                    return $new_id;
              
                }
        
        
                 // Get all results or check if a id exists
                function Read($params, $mypermission) {
                                if (array_key_exists("id", $params)) {

                                        if (array_key_exists("inner", $params)) {
                                            $result = $this->controller->getCoursesInnerJoin($params);
                                            return $result;
                                            } else {
                                            $result = $this->controller->getCourseById($params);
                                            return $result;
                                            }
                                } else {
                                    return $this->controller->getAllCourses();
                                }
                
                }
        
        
                // Update a result
                function Update($params, $mypermission){
                            $result =$this->controller->UpdateById($params);
                            return $result;
            
                }
        
                    
                //  Delete 1 result   
                 function Delete($param, $mypermission) {
                            $result = $this->controller->DeleteCourseById($params);
                            return $result;
                }

    }

?>
