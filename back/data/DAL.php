<?php
    
class DAL {

    private $my_Data_Base;

            private $host = '127.0.0.1';
            private $dataBade   = 'school';
            private $user = 'root';
            private $pass = '';
            private $charset = 'utf8';
            private $dsn;
            private $opt = [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
            ];


    function __construct() {
        $this->dsn = "mysql:host=$this->host;dbname=$this->dataBade;charset=$this->charset";
        $this->my_Data_Base = new PDO($this->dsn, $this->user, $this->pass, $this->opt);


    }

function getDB() {
    $my_Data_Base = $this->my_Data_Base;
    return $my_Data_Base;
}

// returns a table from DB as array
function GetAllTable($query, $classname) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute();
    return $mytable = $table->fetchAll();
    //  return $mytable = $table->fetchAll(PDO::FETCH_CLASS, $classname);
    
}

// searches for a id in a table and returns the count of the result
function CheckId($query) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute();
    return $table->rowCount();
}

function getLineById($query) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute();
    return $mytable = $table->fetchAll();
}



function updateSQL($query) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute();
    return true;
}


function insertSQL($query, $exicute) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute($exicute);
    return true;
}


function deleteSQL($query) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute();

    return true;
}


function innerJoion($query) {
    $dataBade = $this->getDB();
    $table = $dataBade->prepare($query);
    $table->execute();

    return $mytable = $table->fetchAll();
}

        



}

// SELECT course.id, course.name, course.image
// FROM course
// INNER JOIN student_course ON course.id = student_course.c_id
// INNER JOIN student ON student.id = student_course.s_id
// WHERE student.id = 5SELECT * FROM `course` WHERE 1

// SELECT student.id, student.name, student.image
// FROM student
// INNER JOIN student_course ON student.id = student_course.s_id
// INNER JOIN course ON course.id = student_course.c_id
// WHERE course.id = 5


