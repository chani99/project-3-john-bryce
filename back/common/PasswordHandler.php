<?php
    // namespace Common;

    class PasswordHandler {
        private $salt;

        function __construct()
        {
            $this->salt = "myApp##";
        }
        public function getHash($plainPassword) {
            $newPW = MD5($this->salt . $plainPassword);
            return $newPW;
        }
    }