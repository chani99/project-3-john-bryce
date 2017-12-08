<?php  
    class Controller {

        private $model;


        //  function that chaeks if the sql returnd a true or false resulte
        function checkIsWasGood($update) {
            $isOK = ($update == true ? true : false);
            return $isOK;

        }
        


        // Creates sql command to insert  a line in a  sql table
        function CreateRow($rows, $model){
        $this->model =$model;
        $column="";
        $values="";
        $exicute = array();

            for($i=0; $i<count($rows); $i++) {
                if (count($rows) != $i+1) {
                $column .= $rows[$i] . ", ";
                $values .= ":" .$rows[$i] . ", ";
                $get = 'get' . $rows[$i];
                $putit = $this->model->{$get}();
                $exicute[$rows[$i]] = $putit;
                }
                else {
                $column .= $rows[$i];
                $values .= ":" . $rows[$i];
                $get = 'get' . $rows[$i];
                $putit = $this->model->{$get}();
                $exicute[$rows[$i]] = $putit;
                }
            }
        return [$column, $values, $exicute];
        }
  

     
}



