<?php
require_once ('DAL.php');

class BL {
private $dataBade;

    function __construct() {
        $this->dataBade = new DAL();
        

    }

    
// selects all from a table in a dataBade and returns it as array
  function SelectAllFromTable($table_name, $classname) {
        $res = $this->dataBade->GetAllTable("SELECT * FROM `".$table_name."`", $classname);
        return $res;

    }
    
// checks if a id exists on a id row in a dataBade and returns true or false
 function Check_if_id_exists($table_name, $idNumw) {
        $res =  $this->dataBade->CheckId("SELECT id FROM ".$table_name." WHERE id='$idNumw'");
        $istrue = ($res > 0 ?  true : false);
        return $istrue;
    }

    // 
 function getLineById($table_name, $idNumw) {
    $res =  $this->dataBade->getLineById("SELECT * FROM ".$table_name." WHERE id=$idNumw");
    return $res;
}



function getUser($table_name,  $name, $password) {
    $res =  $this->dataBade->getLineById("SELECT * FROM ".$table_name." WHERE name ='$name'AND password ='$password'");
    return $res;
}

function getAdminByNameAndpassword($table_name,  $name, $password) {
    $res =  $this->dataBade->getLineById("SELECT * FROM ".$table_name." WHERE name ='$name'AND password ='$password'");
    return $res;
}
 // updates data in a table 
 function update_table($table_name, $idNumw, $updateValues) {
        $update = $this->dataBade->updateSQL("UPDATE ".$table_name." SET ".$updateValues." WHERE id='$idNumw'");
        return $update;

}


 function create_new_row($table_name, $column, $values, $exicute) {
        $query = "INSERT INTO ".$table_name."(".$column.") VALUES (".$values.")";
        $Create = $this->dataBade->insertSQL($query, $exicute);
        return $Create;


}


function selectlastRow($table_name){
    $selcet = $this->dataBade->getLineById("SELECT * FROM ".$table_name." ORDER BY Id DESC LIMIT 1");
    return $selcet;
    
}

 function DeleteRow($table_name, $idNumw) {
        $delete = $this->dataBade->deleteSQL("DELETE FROM ".$table_name." WHERE id =". $idNumw);
        return $delete;

}

function DeleteRowbyRowName($table_name, $rowname, $param1, $rowname2, $param2) {
    $delete = $this->dataBade->deleteSQL("DELETE FROM ".$table_name." WHERE " . $rowname. " = ". $param1. " AND " . $rowname2. " = ". $param2);
    return $delete;

}



function innerJoin($selected_tables, $table1, $table2, $Column_equal_to) {
    $innerJion = $this->dataBade->innerJoion("SELECT ". $selected_tables." FROM ". $table1 ." INNER JOIN " .$table2." ON ". $Column_equal_to);
    return $innerJion;

}

function innerJoinExcept($selected_tables, $table1, $table2, $Column_equal_to, $condition) {
    $innerJion = $this->dataBade->innerJoion("SELECT ". $selected_tables." FROM ". $table1 ." INNER JOIN " .$table2." ON ". $Column_equal_to ." WHERE ". $condition);
    return $innerJion;

}

// inner join 3 tables
function innerJoin3table($selected_rows, $table1, $table2, $table3, $Column_equal_to, $Column_equal_to2, $where) {
    $innerJion3 = $this->dataBade->innerJoion("SELECT ". $selected_rows." FROM ". $table1 ." INNER JOIN " .$table3." ON ". $Column_equal_to ." INNER JOIN " .$table2." ON ". $Column_equal_to2. " WHERE ". $where);
    return $innerJion3;

}

}


        

