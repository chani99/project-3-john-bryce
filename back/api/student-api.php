<?php
    require_once 'abstract-api.php';
    require_once 'api.php';
    require_once '../controllers/StudentController.php';

    class StudentApi extends Api{
        private $controller;
        

        function __construct($params) {
            $this->controller = new StudentController($params);
        }


        // Create a new Students
        function Create($params) {
            return $this->controller->CreateStudents($params);
        }
        

         // Get all Studentss or check if a id exists
        function Read($params) {

            if (array_key_exists("id", $params)) {
                $Students = $this->controller->getById($params);
                return $Students;
            }

            else {
                return $this->controller->getAllStudents($params);
            }
        } 


        // Update a Students
        function Update($params) {
            if (array_key_exists("courses", $params)) {
                $courses = new CourseController($params);
                $Stu_old_courses = $courses->getCoursesInnerJoin($params);
                $compare_courses = $courses->compare_courses( $params["id"], $Stu_old_courses, $params["courses"]);
            }
                $Students =$this->controller->UpdateById($params);
            return $Students;
            }

            
        //  Delete 1 Students   
         function Delete($params) {
            $Students = $this->controller->DeleteById($params);
            return $Students;
            
        }

    }
?>
