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
        function Create($params, $mypermission) {
            $mypermission = $mypermission;            
            $this->controller->CreateStudents($params);
            $get_new_row =  $this->controller->selectLastId();
            $new_id = $get_new_row[0]['id'];

            if (array_key_exists('courses', $params)){
            $corses_new_user = $params['courses'];
            $courses = new CourseController($params);
            $courses->addCuorses($corses_new_user, $new_id);            
            }
            return [true, $new_id];
             
            

        }
        
        function selectLastId() {
            $newId = $this->db->selectlastRow($this->table_name);
            return $newId;
        }


         // Get all Studentss or check if a id exists
        function Read($params, $mypermission) {
            $mypermission = $mypermission;            
            
            if (array_key_exists("id", $params)) {

                if (array_key_exists("inner", $params)) {
                    $result = $this->controller->getStudentsInnerJoin($params);
                    return $result;
                    } else {
                    $Students = $this->controller->getById();
                     return $Students;
                    }

            }

            else {
                return $this->controller->getAllStudents();
            }
        } 


        // Update a Students
        function Update($params, $mypermission) {
            $mypermission = $mypermission;            
            
            if (!array_key_exists("courses", $params)) {
                $params['courses'] = [];
            }          
            $courses = new CourseController($params);
            $stuOldCourses = $courses->getCoursesInnerJoin($params);
            $compare_courses = $courses->compare_courses( $params["id"], $stuOldCourses, $params["courses"]);
            $Students =$this->controller->UpdateById();
            return $Students;
        }

            
        //  Delete 1 Students   
         function Delete($params, $mypermission) {
            $mypermission = $mypermission;            
            $courses = new CourseController($params); //get all courses for student and delete them first
            $stuOldCourses = $courses->getCoursesInnerJoin($params);
            $deleteCourses = $courses->RemoveCourses($stuOldCourses, $params["id"]);
                if($deleteCourses){ //delete the student
                    $Students = $this->controller->DeleteStudentById();
                    return $Students;
                }  else {
                    return "there was a problem, please try again";
                }
                
                
            
        }

    }
?>
