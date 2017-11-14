<?php

class Validation { 

            function validationDirector($params) {
                $errorList = '';

                if (array_key_exists('id', $params)){
                if($this->Notempty($params["id"]) != false){
                    $errorList .= "no id was recived \n";
                }
                if($this->isNumber($params["id"]) != false){
                    $errorList .= "id must be a number \n";
                    }
                }


                if (array_key_exists('name', $params)){
                    if($this->Notempty($params["name"]) != false){
                        $errorList .= "no id was recived \n";
                    }
                    if($this->test_datatype($params["name"]) != false){
                        $errorList .= "name contains ilidal carecters  \n";
                    }    
                }
                
                
                if (array_key_exists('description', $params)){
                    if($this->test_datatype($params["description"]) != false){
                        $errorList .= "name contains iligal carecters \n";
                    }  
                    if($this->Notempty($params["description"]) != false){
                        $errorList .= "no description was recived \n"; 
                    }
                }
                                    
                // if (array_key_exists('image', $params)){
                //     if($this->Notempty($params["image"]) != false){
                //         $errorList .= "no image was recived \n";
                //     }                  
                // }
                                            
                if (array_key_exists('phone', $params)){
                    if($this->validate_phone($params['phone']) !=false){
                        $errorList .= "phone contains iligal carecters \n";
                    }
                    if($this->Notempty($params["phone"]) != false){
                        $errorList .= "no phone was recived \n";
                    }                      
                }


                if (array_key_exists('email', $params)){
                    if($this->validate_email($params['email']) ==false){
                        $errorList .= "email contains iligal carecters \n";
                    }  

                    if($this->Notempty($params["email"]) != false){
                        $errorList .= "no email was recived \n";
                    }
                }
                
                return $errorList;
            }

                                                    


        function Notempty($value) {
         $empty = empty($value);
            return $empty;
        }


        function isNumber($value) {
            $isnunber = (!ctype_digit($value));
            return $isnunber;
            
        }


        function test_datatype($input_value){
                return  preg_match("/a-zA_Zא-ת ,.!?0-9/", $input_value);
        }


        function test_pssword($password){
                return eregi("^0-9a-zA-Z$", $password);
        }


        function validate_email($email) {

            $test22 =  preg_match("/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i", $email);
                return   $test22;           
        }
             
        
        function validate_phone($phone) {
            return preg_match("/[0-9]{9-10}/", $phone);
        }
                
            
        
}

