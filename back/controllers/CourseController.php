<?php 
    require_once 'controller.php';
    require_once 'Course_Student_Controller.php';
    require_once '../models/CourseModel.php';
    require_once '../data/bl.php';
    
    

    class CourseController extends Controller {
        private $businessLogic;
        private $model;
        private $validation;        
        private $table_name = "course";
        private $classneame = "CourseController";
        

        function __construct($param) {
            $this->businessLogic = new BL();
            $this->model = new CourseModel($param);

            
        }
        

        // Creates a new line in a table
        function CreateNewRow($param) {
            $rows = $this->model->getRows();
            $sql_data = $this->CreateRow($rows, $this->model);
            $update = $this->businessLogic->create_new_row($this->table_name, $sql_data[0], $sql_data[1],  $sql_data[2]);
            return $this->checkIsWasGood($update);
       
        }



        // Updates a line in directos table
        function ReturnSelect() {
            $List =  $this->businessLogic->SelectAllFromTable($this->table_name, $this->classneame);
            $CourseSelect="<option value='Select a Course'>Select a Course</option>";
                for ($i = 0; $i < count($List); $i++) {
                $CourseSelect .= "<option value=" . $List[$i]["id"] . ">" . $List[$i]["name"] . "</option>";
                }
        
            return $CourseSelect; 
        }
    


        // Selects all from Courses table and returns a object array
        function getAllCourses() {
            $getall = $this->businessLogic->SelectAllFromTable($this->table_name, $this->classneame);
            $allCourses = array();            
            for($i=0; $i<count($getall); $i++) {
                $c = new CourseModel($getall[$i]);
                array_push($allCourses, $c->jsonSerialize());
            }
            return $allCourses;   
        }


         // get one course by id
         function getCourseById($param){
            if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
                $OneCourse =  $this->businessLogic->getLineById($this->table_name, $this->model->getId());
                return  $OneCourse;
            }
        }

        
        // Checks if a id exists
        function checkifidexists($param){
        if($this->model->getId() != 'null' || $this->model->getId() != 'NaN'){
            $check =  $this->businessLogic->Check_if_id_exists($this->table_name, $c->getId());
            return $this->checkIsWasGood($check);
            }else{
                return false;
            }
        }




        // Deletes a line from Courses table
        function DeleteCourseById($param) {
                if($this->model->getId() != false){
                $deleted =  $this->businessLogic->DeleteRow($this->table_name, $this->model->getId());
                return $this->checkIsWasGood($deleted);
                }else{
                    return false;
                }

    
        }



        // Updates a line in directos table
        function UpdateById($param) {
                if($this->model->getId() != false || $this->model->getId() != false){
                    if($this->model->getimage() != "" ) {
                        $updateValues= "name =  '".$this->model->getName()."', description = '" .$this->model->getdescription(). "', image = '". $this->model->getimage()."'";
                    }else{
                        $updateValues= "name =  '".$this->model->getName()."', description = '" .$this->model->getdescription(). "'";
                    }
                $update =  $this->businessLogic->update_table($this->table_name, $this->model->getId(), $updateValues);
                return $this->checkIsWasGood($update);
              
            }

        }


        

        // get the courses for a student by id
        function getCoursesInnerJoin($param) {
            $innerJoinCourses = array();
            $selected_rows = "course.id, course.name, course.image";
            $table2 = 'student';
            $table3 = 'student_course';
            $Column_equal_to = 'course.id = student_course.c_id';
            $Column_equal_to2 = 'student.id = student_course.s_id';
            $where = 'student.id = ' . $param["id"];
            $getall = $this->businessLogic->innerJoin3table($selected_rows, $this->table_name, $table2, $table3, $Column_equal_to, $Column_equal_to2, $where);
            for($i=0; $i<count($getall); $i++) {
                $c = new CourseModel($getall[$i]);
                array_push($innerJoinCourses, $c->jsonSerialize());
            }
            return $innerJoinCourses;   
        }

        
            //select the las course id that was added
        function selectLastId() {
            $new_id = $this->businessLogic->selectlastRow($this->table_name);
            return $new_id;
        }


            //check what couses to change for a student by compering the old courses in businessLogic to the new couses sent from client
        function compare_courses($id, $old_course, $new_courses) {
            $add_courses =[];
            $remove_courses =[];
        if ($old_course == $new_courses) {
                return true;
        } else {

                //check what courses to remove
            for ($i = 0; $i < count($old_course); $i++) {
                $temp = 0;
                        for ($x = 0; $x < count($new_courses); $x++) {
                            if ($old_course[$i]['Course_id'] == $new_courses[$x]) {
                                $temp = 1;
                            }
                        }
                if ($temp == 0) {
                    array_push($remove_courses, $old_course[$i]['Course_id']);
                }
            }
            
                //check what courses to add
            for ($z = 0; $z < count($new_courses); $z++) {
                $temp = 0;
                        for ($y = 0; $y < count($old_course); $y++) {
                            if ($new_courses[$z] == $old_course[$y]['Course_id']) {
                                $temp = 1;
                            }
                        }
                if ($temp == 0) {
                    array_push($add_courses, $new_courses[$z]);
                    }    
            }
            $this->addCuorses($add_courses, $id);
            $this->RemoveCourses($remove_courses, $id);
        }
       
    }


        //send new_courses to businessLogic
        function addCuorses($add_courses, $id)
        {
                for ($c = 0; $c < count($add_courses); $c++) {
                    $param = [
                        "id" => $id,
                        "courses" => $add_courses[$c] 
                    ];
    
                $S_C = new S_C_Controller($param);
                $S_C->CreateNewRow($param);
                }
        }


        //delete courses from businessLogic
        function RemoveCourses($remove_courses, $id){
                for ($c = 0; $c < count($remove_courses); $c++) {
                    $courses;
                    is_array($remove_courses[$c]) ? $courses = $remove_courses[$c]['Course_id'] : $courses = $remove_courses[$c];;
                    $param = [
                        "id" => $id,
                    
                        "courses" => $courses
                        ];
                    
                $S_C = new S_C_Controller($param);
                $S_C->DeleteCourseByRowName($param);
                }
        }
}
        
            
        
