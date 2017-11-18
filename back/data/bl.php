<?php
require_once ('DAL.php');

class BL {
private $DB;

    function __construct() {
        $this->DB = new DAL();
        

    }

    
// selects all from a table in a DB and returns it as array
  function SelectAllFromTable($table_name, $classname) {
        $res = $this->DB->GetAllTable("SELECT * FROM `".$table_name."`", $classname);
        return $res;

    }
    
// checks if a id exists on a id row in a DB and returns true or false
 function Check_if_id_exists($table_name, $id) {
        $res =  $this->DB->CheckId("SELECT id FROM ".$table_name." WHERE id='$id'");
        $istrue = ($res > 0 ?  true : false);
        return $istrue;
    }

    // 
 function getLineById($table_name, $id) {
    $res =  $this->DB->getLineById("SELECT * FROM ".$table_name." WHERE id=$id");
    return $res;
}
// SELECT * FROM `administratior` WHERE name = 'Hadar' AND password = '81dc9bdb52d04dc20036dbd8313ed055'

function getUser($table_name,  $name, $password) {
    $res =  $this->DB->getLineById("SELECT * FROM ".$table_name." WHERE name ='$name'AND password ='$password'");
    return $res;
}

 // updates data in a table 
 function update_table($table_name, $id, $updateValues) {
        $update = $this->DB->updateSQL("UPDATE ".$table_name." SET ".$updateValues." WHERE id='$id'");
        return $update;

}


 function create_new_row($table_name, $column, $values, $exicute) {
        $query = "INSERT INTO ".$table_name."(".$column.") VALUES (".$values.")";
        $Create = $this->DB->insertSQL($query, $exicute);
        return $Create;


}


function selectlastRow($table_name){
    $selcet = $this->DB->getLineById("SELECT * FROM ".$table_name." ORDER BY Id DESC LIMIT 1");
    return $selcet;
    
}

 function DeleteRow($table_name, $id) {
        $delete = $this->DB->deleteSQL("DELETE FROM ".$table_name." WHERE id =". $id);
        return $delete;

}

function DeleteRowbyRowName($table_name, $rowname, $param1, $rowname2, $param2) {
    $delete = $this->DB->deleteSQL("DELETE FROM ".$table_name." WHERE " . $rowname. " = ". $param1. " AND " . $rowname2. " = ". $param2);
    return $delete;

}



function innerJoin($selected_tables, $table1, $table2, $Column_equal_to) {
    $innerJion = $this->DB->innerJoion("SELECT ". $selected_tables." FROM ". $table1 ." INNER JOIN " .$table2." ON ". $Column_equal_to);
    return $innerJion;

}

function innerJoinExcept($selected_tables, $table1, $table2, $Column_equal_to, $condition) {
    $innerJion = $this->DB->innerJoion("SELECT ". $selected_tables." FROM ". $table1 ." INNER JOIN " .$table2." ON ". $Column_equal_to ." WHERE ". $condition);
    return $innerJion;

}

// inner join 3 tables
function innerJoin3table($selected_rows, $table1, $table2, $table3, $Column_equal_to, $Column_equal_to2, $where) {
    $innerJion3 = $this->DB->innerJoion("SELECT ". $selected_rows." FROM ". $table1 ." INNER JOIN " .$table3." ON ". $Column_equal_to ." INNER JOIN " .$table2." ON ". $Column_equal_to2. " WHERE ". $where);
    return $innerJion3;

}

}

    // SELECT course.name, course.image
        // FROM course
        // INNER JOIN student_course ON course.id = student_course.c_id
        // INNER JOIN student ON student.id = student_course.s_id




        

        // Selects all from directors table and returns a object array
        // function getCoursesInnerJoin() {
        //     $innerJoinCourses = array();

        // $selected_rows = "course.name, course.image";
        // $table2 = 'student';
        // $table3 = 'student_course';
        // $Column_equal_to = 'course.id = student_course.c_id';
        // $Column_equal_to2 = 'student_course.id = ' . $param["id"];
        

        //     $getall = $this->db->innerJoin3table($selected_rows, $this->table_name, $table2, $table3 $Column_equal_to, $Column_equal_to2), ;
        //     for($i=0; $i<count($getall); $i++) {
        //         $c = new CourseModel($getall[$i]);
        //         array_push($innerJoinCourses, $this->model->jsonSerialize());
        //     }
        //     return $allMovies;   
        // }
        
