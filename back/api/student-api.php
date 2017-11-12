<?php
    require_once 'abstract-api.php';
    require_once 'api.php';
    require_once '../controllers/StudentController.php';
    require_once '../controllers/Course_Student_Controller.php';
    

    class StudentApi extends Api{
        private $controller;
        private $S_C_Controller;
        
        

        function __construct($params) {
            $this->controller = new StudentController($params);
            $this->S_C_Controller = new S_C_Controller($params);
            
        }


        // Create a new Students
        function Create($params) {
            $this->controller->CreateStudents($params);
            if (array_key_exists('courses', $params)){
            $corses_new_user = $params['courses'];
            $get_new_row =  $this->controller->selectLastId();
            $new_id = $get_new_row[0]['id'];
            $courses = new CourseController($params);
            $new_courses = $courses->addCuorses($corses_new_user, $new_id);            
            }
            return [true, $new_id];
             
            

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
                $courses = new CourseController($params);
                $Stu_old_courses = $courses->getCoursesInnerJoin($params);
                $compare_courses = $courses->compare_courses( $params["id"], $Stu_old_courses, $params["courses"]);
                $Students =$this->controller->UpdateById($params);
            return $Students;
            }

            
        //  Delete 1 Students   
         function Delete($params) {
            $courses = new CourseController($params);
            $Stu_old_courses = $courses->getCoursesInnerJoin($params);
            $deleteCourses = $courses->RemoveCourses($Stu_old_courses, $params["id"]);
            $Students = $this->controller->DeleteCourseById($params);

            return $Students;
            
        }

    }
?>
